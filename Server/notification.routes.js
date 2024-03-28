import notificationModel from "./models/notification.js";
import { CatchAsyncError } from "./middlewar/catchAsynErrors.js";
import ErrorHandler from "./middlewar/ErrorHandler.js";
import express from "express";
import { authorizeRole, isAutheticated } from "./middlewar/auth.js";
const notificationRoutes = express.Router();
import cron from "node-cron";
// getting all notification for admin
notificationRoutes.get(
  "/get-all-notification",
  isAutheticated,
  authorizeRole("admin"),
  CatchAsyncError(async (req, res, next) => {
    try {
      const notifications = await notificationModel
        .find()
        .sort({ createdAt: -1 });
      res.status(201).json({
        success: true,
        notifications,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

notificationRoutes.get("/mugilankkani", (req, res) => {
  res.send("kani");
});

export default notificationRoutes;

// update notification -- admin

notificationRoutes.put(
  "/update-notification/:id",
  isAutheticated,
  authorizeRole("admin"),
  CatchAsyncError(async (req, res, next) => {
    try {
      const notification = await notificationModel.findById(req.params.id);
      if (!notification) {
        return next(new ErrorHandler("Notification not found", 404));
      } else {
        notification.status
          ? (notification.status = "read")
          : notification.status;
      }
      await notification.save();

      const notifications = await notificationModel
        .find()
        .sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        notifications,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// deleting notification after one month

cron.schedule("0 0 0 * * *", async () => {
  const thirtyDays = new Date(Date.now() - 30 * 24 * 60 * 60 *1000);
  await notificationModel.deleteMany({status:"read", createdAt:{$lt : thirtyDays}})
  console.log("Notifications deleted")
});
