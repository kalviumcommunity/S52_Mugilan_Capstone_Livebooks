import { fileURLToPath } from "url";
import path from "path";
import express from "express";
import UserModel from "./models/user.js";
import ErrorHandler from "./middlewar/ErrorHandler.js";
import jwt from "jsonwebtoken";
import ejs from "ejs";
import sendMail from "./utils/sendMail.js";
import bcrypt from "bcryptjs";
import { CatchAsyncError } from "./middlewar/catchAsynErrors.js";
import {
  accessTokenOption,
  refreshTokenOption,
  sendToken,
} from "./utils/jwt.js";
import { isAutheticated } from "./middlewar/auth.js";
import { redis } from "./utils/redis.js";
import { Console } from "console";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

router.post(
  "/register",
  CatchAsyncError(async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const isEmailExist = await UserModel.findOne({ email });
      if (isEmailExist) {
        return next(new ErrorHandler("Email Already Exist", 400));
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = {
        name,
        email,
        password: hashedPassword,
      };

      const activationKey = createActivationToken(user);

      const activationCode = activationKey.activationCode;

      const data = { user: { name: user.name }, activationCode };

      const html = await ejs.renderFile(
        path.join(__dirname, "./mails/activation-mail.ejs"),
        data
      );

      try {
        await sendMail({
          email: user.email,
          subject: "Activate your account",
          template: "activation-mail.ejs",
          data,
        });
        res.status(201).json({
          success: true,
          message: `Please check your email: ${user.email} to activate your account`,
          activationKey: activationKey.token,
        });
      } catch (err) {
        console.log(err);
        return next(new ErrorHandler(err.message, 400));
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

export const createActivationToken = (user) => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    process.env.ACTIVATION_SECRET,
    {
      expiresIn: "5m",
    }
  );

  return { token, activationCode };
};

// For activating the account viva otp

router.post(
  "/activate_user",
  CatchAsyncError(async (req, res, next) => {
    try {
      const { activation_token, activation_code } = req.body;

      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (newUser.activationCode !== activation_code) {
        return next(new ErrorHandler("Activation code was wrong", 400));
      }

      const { name, email, password } = newUser.user;

      const existUser = await UserModel.findOne({ email });

      if (existUser) {
        return next(new ErrorHandler("email already exist", 400));
      }

      const user = await UserModel.create({
        name,
        email,
        password,
      });
      res.status(200).json({
        success: true,
        message: "email registration successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// login

router.post(
  "/login",
  CatchAsyncError(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Please enter email and Password", 400));
      }
      const user = await UserModel.findOne({ email });

      if (!user) {
        return next(new ErrorHandler("Invalid user Email"), 400);
      }

      const isPasswordVerify = await bcrypt.compare(password, user.password);

      if (!isPasswordVerify) {
        return next(new ErrorHandler("Invalid password"), 400);
      }
      sendToken(user, 200, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

router.get(
  "/logout",
  isAutheticated,
  CatchAsyncError(async (req, res, next) => {
    try {
      res.cookie("access_Token", "", { maxAge: 0 });
      res.cookie("refresh_Token", "", { maxAge: 0 });
      const userID = req.user._id; // Access user ID from req.user
      console.log(userID);
      await redis.del(userID); // Delete user data from Redis

      res.status(200).json({
        success: true,
        message: "Logout successful",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

router.get(
  "/refresh",
  CatchAsyncError(async (req, res, next) => { // Corrected order of parameters

    try {
      const refresh_token = req.cookies.refresh_Token; // Accessing cookies from the request object (req)
      console.log(refresh_token)
      const decode = await jwt.verify(refresh_token, process.env.REFRESH_TOKEN)
      const message = "could not refresh the token";
      if (!decode) {
        return next(new ErrorHandler(message, 400));
      }
      const session = await redis.get(decode.id);

      if (!session) {
        return next(new ErrorHandler(message, 400));
      }

      const user = JSON.parse(session);

      const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, {
        expiresIn: "5m",
      });

      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN,
        {
          expiresIn: "3d",
        }
      );

      res.cookie("access_Token", accessToken, accessTokenOption);
      res.cookie("refresh_Token", refreshToken, refreshTokenOption);
      res.status(200).json({
        success: true,
        accessToken,
      });
    } catch (error) {
      console.log(error.message)
      return next(new ErrorHandler(error.message, 400));
    }
  })
);


export default router;
