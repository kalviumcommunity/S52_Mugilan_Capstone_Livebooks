import ErrorHandler from "../middlewar/ErrorHandler.js";
import { authorizeRole, isAutheticated } from "../middlewar/auth.js";
import { CatchAsyncError } from "../middlewar/catchAsynErrors.js";
import express from "express";
import { generateLast12MonthsData } from "../utils/analytics.generator.js";
import UserModel from "../models/user.js";
import { paidCourse } from "../models/course.js";
import orderModel from "../models/order.js";
const analyticsRoutes = express.Router();

// getting all the user analytics

analyticsRoutes.get(
  "/get-User-Analytics",
  isAutheticated,
  authorizeRole("admin"),
  CatchAsyncError(async (req, res, next) => {
    try {
      const user = await generateLast12MonthsData(UserModel);

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// getting all the paid course analytics

analyticsRoutes.get(
  "/get-paid-Course-Analytics",
  isAutheticated,
  authorizeRole("admin"),
  CatchAsyncError(async (req, res, next) => {
    try {
      const course = await generateLast12MonthsData(paidCourse);

      res.status(201).json({
        success: true,
        course,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// getting all the order analytics

analyticsRoutes.get(
  "/get-order-Analytics",
  isAutheticated,
  authorizeRole("admin"),
  CatchAsyncError(async (req, res, next) => {
    try {
      const order = await generateLast12MonthsData(orderModel);

      res.status(201).json({
        success: true,
        order,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

export default analyticsRoutes;
