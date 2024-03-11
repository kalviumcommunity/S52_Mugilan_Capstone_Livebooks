import { fileURLToPath } from "url";
import path from "path";
import express from "express";
import UserModel from "./models/user.js";
import ErrorHandler from "./middlewar/ErrorHandler.js";
import jwt from "jsonwebtoken";
import ejs from "ejs";
import sendMail from "./utils/sendMail.js";
import { CatchAsyncError } from "./middlewar/catchAsynErrors.js";
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
      const user = {
        name,
        email,
        password,
      };

      const activationKey = createActivationToken(user);

      const activationCode = activationKey.activationCode;

      const data = { user: { name: user.name }, activationCode };
      console.log(__dirname);
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
      console.log("kani");
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
      expiresIn: "1m",
    }
  );

  return { token, activationCode };
};

router.post(
  "/activate-user",
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
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

export default router;
