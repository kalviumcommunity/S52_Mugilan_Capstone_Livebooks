import { fileURLToPath } from "url";
import path from "path";
import express from "express";
import UserModel from "../models/user.js";
import ErrorHandler from "../middlewar/ErrorHandler.js";
import jwt from "jsonwebtoken";
import ejs from "ejs";
import sendMail from "../utils/sendMail.js";
import bcrypt from "bcryptjs";
import cloudinary from "cloudinary";
import { CatchAsyncError } from "../middlewar/catchAsynErrors.js";
import {
  accessTokenOption,
  refreshTokenOption,
  sendToken,
} from "../utils/jwt.js";
import { authorizeRole, isAutheticated } from "../middlewar/auth.js";
import { redis } from "../utils/redis.js";
import {
  getAllUserService,
  getUserById,
  updateUserRoleService,
} from "../service/user.service.js";
import { Error } from "mongoose";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();
import { freeCourse } from "../models/course.js";
import { paidCourse } from "../models/course.js";
import reviewModel from "../models/review.js";
import contactModel from "../models/contactus.js";

// getting all users for -- admin only

router.get(
  "/get-all-users",
  isAutheticated,
  authorizeRole("admin"),
  CatchAsyncError(async (req, res, next) => {
    try {
      getAllUserService(res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Contact us info of user
router.post(
  "/contact-us",
  CatchAsyncError(async (req, res, next) => {
    const { name, mobileno, message } = req.body;

    if (!name || !mobileno || !message) {
      return next(new ErrorHandler("All input fields are required", 400));
    }

    if (mobileno.toString().length !== 10) {
      return next(new ErrorHandler("Mobile number must be 10 digits", 400));
    }

    if (message.trim().length === 0) {
      return next(new ErrorHandler("Message field cannot be empty", 400));
    }

    await contactModel.create({ name, mobileno, message });

    res.status(200).json({
      success: true,
      message: "Contact information submitted successfully",
    });
  })
);

// updating user role only for admin to change the user to admin

router.put(
  "/update-user-role",
  isAutheticated,
  authorizeRole("admin"),
  CatchAsyncError(async (req, res, next) => {
    try {
      const { id, role } = req.body;
      updateUserRoleService(res, id, role);
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

//  registering user

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
        path.join(__dirname, "../mails/activation-mail.ejs"),

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
        return next(new ErrorHandler(err, 400));
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// creating activation token

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
      console.log(error);
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// login the paid users
router.post(
  "/loginuser",
  CatchAsyncError(async (req, res, next) => {
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
    // find the length of the courses


    if (user.courses.length == 0) {
      return next(new ErrorHandler("Please purchase course to access the resourses"), 400);
    }
    for (var i = 0; i < user.courses.length; i++) {
      const paidCourses = await paidCourse.findOne({ _id: user.courses[i]._id });
      console.log(paidCourses,"we");
      if (!paidCourses || paidCourses == null) {
        return next(new ErrorHandler("Please purchase course to access the resourses"), 400);
      }
    }
    sendToken(user, 200, res);
  })
);

// login the user

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
      console.log(user.email, user.password);
      const isPasswordVerify = await bcrypt.compare(password, user.password);
      console.log(isPasswordVerify);
      if (!isPasswordVerify) {
        return next(new ErrorHandler("Invalid password"), 400);
      }
      sendToken(user, 200, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// logout the user

router.get(
  "/logout",
  isAutheticated,
  CatchAsyncError(async (req, res, next) => {
    try {
      res.cookie("access_Token", "", { maxAge: 0 });
      res.cookie("refresh_Token", "", { maxAge: 0 });
      const userID = req.user._id; // Access user ID from req.user
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

// generating token

router.get(
  "/refresh",
  CatchAsyncError(async (req, res, next) => {
    try {
      const refresh_token = req.cookies.refresh_Token;
      const decode = jwt.verify(refresh_token, process.env.REFRESH_TOKEN);
      const message = "could not refresh the token";
      if (!decode) {
        return next(new ErrorHandler(message, 400));
      }
      const session = await redis.get(decode.id);

      if (!session) {
        return next(
          new ErrorHandler("Please login to access the resource", 400)
        );
      }

      const user = JSON.parse(session);

      const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, {
        expiresIn: "5m",
      });

      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN,
        {
          expiresIn: "3d",
        }
      );
      req.user = user;

      res.cookie("access_Token", accessToken, accessTokenOption);
      res.cookie("refresh_Token", refreshToken, refreshTokenOption);

      await redis.set(user._id, JSON.stringify(user), "EX", 604800);
      res.status(200).json({
        success: true,
        accessToken,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// taking the logined user info

router.get(
  "/me",
  isAutheticated,
  CatchAsyncError(async (req, res, next) => {
    try {
      const userId = req.user._id;
      getUserById(userId, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Social athentication

router.get(
  "/social_auth",
  CatchAsyncError(async (req, res, next) => {
    try {
      const { email, name, avatar } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user) {
        const newUser = await UserModel.create({ email, name, avatar });
        sendToken(newUser, 200, res);
      } else {
        sendToken(user, 200, res);
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// update the user info

router.put(
  "/update_user_info",
  isAutheticated,
  CatchAsyncError(async (req, res, next) => {
    try {
      const { email, name } = req.body;
      const userId = req.user._id;
      const user = await UserModel.findById(userId);
      if (email && user) {
        const isEmailExist = await UserModel.findOne({ email });
        if (isEmailExist) {
          return next(new ErrorHandler("email already exist ", 400));
        }
        user.email = email;

        if (name && user) {
          user.name = name;
        }
        await user.save();

        await redis.set(userId, JSON.stringify(user));

        res.status(201).json({
          success: true,
          user,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

router.put(
  "/update_user_password",
  isAutheticated,
  CatchAsyncError(async (req, res, next) => {
    try {
      const { oldPassword, newPassword } = req.body;
      if (!oldPassword || !newPassword) {
        return next(new ErrorHandler("Enter old and new password", 400));
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const userId = req.user;
      const user = await UserModel.findById(userId);
      if (user.password === "undefined") {
        return next(new ErrorHandler("Invalid user", 400));
      }
      const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid old password", 400));
      }

      user.password = hashedPassword;
      user.save();
      await redis.set(userId, JSON.stringify(user));

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

router.put(
  "/update_user_avatar",
  isAutheticated,
  CatchAsyncError(async (req, res, next) => {
    try {
      const { avatar } = req.body;
      const userId = req.user._id;
      const user = await UserModel.findById(userId);

      if (avatar && user) {
        let myCloud; // Declare myCloud variable outside the if-else block

        if (user.avatar && user.avatar.public_id) {
          await cloudinary.v2.uploader.destroy(user.avatar.public_id);
        }

        myCloud = await cloudinary.v2.uploader.upload(avatar, {
          folder: "avatars",
          width: 150,
          height: 150,
        });

        user.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url, // Check the actual property name in the myCloud object
        };
      }

      await user.save();
      await redis.set(userId, JSON.stringify(user));

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// delete a user -- or admin only

router.delete(
  "/delete-user/:id",
  isAutheticated,
  authorizeRole("admin"),
  CatchAsyncError(async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await UserModel.findById(id);

      if (!user) {
        return next(new ErrorHandler("Invalid user Id", 400));
      }
      await user.deleteOne({ id });
      await redis.del(id);

      res.status(201).json({
        success: true,
        message: "User deleted Successf ully",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// getting review from the user
router.post(
  "/user-review",
  isAutheticated,
  CatchAsyncError(async (req, res, next) => {
    try {
      const { review } = req.body;
      const user = req.user;
      await reviewModel.create({
        review,
        user,
      });
      res.status(201).json({
        review,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

export default router;
