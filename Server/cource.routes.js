import { fileURLToPath } from "url";
import path from "path";
import express, { Router } from "express";
import UserModel from "./models/user.js";
import ErrorHandler from "./middlewar/ErrorHandler.js";
import jwt from "jsonwebtoken";
import ejs from "ejs";
import sendMail from "./utils/sendMail.js";
import bcrypt from "bcryptjs";
import cloudinary from "cloudinary";
import { CatchAsyncError } from "./middlewar/catchAsynErrors.js";
import {
  accessTokenOption,
  refreshTokenOption,
  sendToken,
} from "./utils/jwt.js";
import { authorizeRole, isAutheticated } from "./middlewar/auth.js";
import { redis } from "./utils/redis.js";
import { getUserById } from "./service/user.service.js";
import { Error } from "mongoose";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const routes = express.Router();
import { freeCourse, staticCourse } from "./models/course.js";
import { paidCourse } from "./models/course.js";
import {
  createFreeCourse,
  createPaidCourse,
  createStaticCourse,
} from "./service/course.service.js";

// creating paid course
routes.get("/mugilan", async (req, res, next) => {
  res.send("course page working");
});
routes.post(
  "/paid_course",
  isAutheticated,
  authorizeRole("admin"),
  CatchAsyncError(async (req, res, next) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;
      if (thumbnail) {
        const myCloud = cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });
        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      createPaidCourse(data, res, next);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// editing paid course
routes.put(
  "/edit_paid_course/:id",
  isAutheticated,
  authorizeRole("admin"),
  CatchAsyncError(async (req, res, next) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;

      if (thumbnail) {
        await cloudinary.v2.uploader.destroy(thumbnail.public_id);

        const myCloud = cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });
        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      const courseId = req.params.id;
      const course = await paidCourse.findByIdAndUpdate(
        courseId,
        { $set: data },
        { new: true }
      );
      res.status(201).json({
        success: true,
        course,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

routes.post(
  "/free_course",
  CatchAsyncError(async (req, res, next) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;
      if (thumbnail) {
        const myCloud = cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });
        data.thumbnail = {
          public_id: (await myCloud).public_id,
          url: (await myCloud).secure_url,
        };
      }
      createFreeCourse(data, res, next);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// edit the free course

routes.put(
    "/edit_free_course/:id",
    isAutheticated,
    authorizeRole("admin"),
    CatchAsyncError(async (req, res, next) => {
      try {
        const data = req.body;
        const thumbnail = data.thumbnail || undefined;
  
        if (thumbnail) {
          await cloudinary.v2.uploader.destroy(thumbnail.public_id);
          const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
            folder: "courses",
          });
          data.thumbnail = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        }
        const courseId = req.params.id;
        const course = await freeCourse.findByIdAndUpdate(
          courseId,
          { $set: data },
          { new: true }
        );
        res.status(201).json({
          success: true,
          course,
        });
      } catch (error) {
        console.log(error);
        return next(new ErrorHandler(error.message, 500));
      }
    })
  );
// creating the course for the static page

routes.post(
  "/static_course",
  CatchAsyncError(async (req, res, next) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;
      if (thumbnail) {
        const myCloud = cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });
        data.thumbnail = {
          public_id: (await myCloud).public_id,
          url: (await myCloud).secure_url,
        };
      }
      createStaticCourse(data, res, next);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// editing the static course

routes.put(
  "/edit_static_course/:id",
  isAutheticated,
  authorizeRole("admin"),
  CatchAsyncError(async (req, res, next) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail || undefined;

      if (thumbnail) {
        await cloudinary.v2.uploader.destroy(thumbnail.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });
        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      const courseId = req.params.id;
      const course = await staticCourse.findByIdAndUpdate(
        courseId,
        { $set: data },
        { new: true }
      );
      res.status(201).json({
        success: true,
        course,
      });
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

export default routes;
