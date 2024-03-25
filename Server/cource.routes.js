import { fileURLToPath } from "url";
import path from "path";
import express, { Router, json } from "express";
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

// geting single course without perchasing in static page

routes.get(
  "/get-single-course-static/:id",
  CatchAsyncError(async (req, res, next) => {
    try {
      const courseId = req.params.req;

      const isCastExist = await redis.get(courseId);

      if (isCastExist) {
        const course = JSON.parse(isCastExist);
        console.log("redis");
        res.status(201).json({
          success: true,
          course,
        });
      } else {
        const course = await staticCourse.findById(req.params.id);
        await redis.set(courseId, JSON.stringify(course));
        console.log("mongoos");

        res.status(201).json({
          success: true,
          course,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// geting all course in static page without purchasing

routes.get(
  "/get-all-courses-static",
  CatchAsyncError(async (req, res, next) => {
    try {
      const courseId = req.params.id;

      const isCastExist = await redis.get("allCourseInStatic");
      if (isCastExist) {
        const course = JSON.parse(isCastExist);
        res.status(201).json({
          success: true,
          course,
        });
      } else {
        const course = await staticCourse.find();

        await redis.set("allCourseInStatic", JSON.stringify(course));
        res.status(201).json({
          success: true,
          course,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// geting all course in paid page with purchasing

routes.get(
  "/get-all-paid-courses",
  CatchAsyncError(async (req, res, next) => {
    try {
      const isCastExist = await redis.get("allPaidCourse");
      if (isCastExist) {
        const course = await redis.get(isCastExist);
        res.status(201).json({
          success: true,
          course,
        });
      } else {
        const course = await paidCourse.find();

        await redis.set("allPaidCourse", JSON.stringify(course));

        res.status(201).json({
          success: true,
          course,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// geting all course in free page with purchasing

routes.get(
  "/get-all-free-courses",
  CatchAsyncError(async (req, res, next) => {
    try {
      const isCastExist = await redis.get("allFreeCourse");

      if (isCastExist) {
        const course = JSON.parse(isCastExist);

        res.status(201).json({
          success: true,
          course,
        });
      } else {
        const course = await freeCourse.find();

        await redis.set("allFreeCourse", JSON.stringify(course));

        res.status(201).json({
          success: true,
          course,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

routes.get(
  "/get-single-free-course/:id",
  CatchAsyncError(async (req, res, next) => {
    try {
      const courseId = req.params.id;

      const isCastExist = await redis.get(courseId);

      if (isCastExist) {
        const course = JSON.parse(isCastExist);
        res.status(201).json({
          success: true,
          course,
        });
      } else {
        const course = await freeCourse.findById(req.params.id);
        await redis.set(courseId, JSON.stringify(course));
        res.status(201).json({
          success: true,
          course,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// getting single courses in paid courses
routes.get(
  "/get-single-paid-course/:id",
  CatchAsyncError(async (req, res, next) => {
    try {
      const courseId = req.params.id;

      const isCastExist = await redis.get(courseId);

      if (isCastExist) {
        const course = JSON.parse(isCastExist);
        res.status(201).json({
          success: true,
          course,
        });
      } else {
        const course = await paidCourse.findById(req.params.id);
        await redis.set(courseId, JSON.stringify(course));
        res.status(201).json({
          success: true,
          course,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// which course was purchased by the user
routes.get("/users-course-contents", (req, res) => {
  res.send("working");
});
routes.get(
  "/users-course-content/:id",
  isAutheticated,
  CatchAsyncError(async (req, res, next) => {
    try {
      const userCoursesList = req.user.courses;

      const courseId = req.params.id;

      const courseExist = userCoursesList.find(
        (course) => course._id.toString() === courseId

      );

      if (!courseExist) {
        return next(
          new ErrorHandler("You are not Eligible to Access this resourse", 404)
        );
      }
      const course = await paidCourse.findById(courseId);
      const content = course.course;
      console.log(content)

      res.status(201).json({
        success: true,
        content,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 404));
    }
  })
);

export default routes;
