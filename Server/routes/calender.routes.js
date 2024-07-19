import ErrorHandler from "../middlewar/ErrorHandler.js";
import { authorizeRole, isAutheticated } from "../middlewar/auth.js";
import { CatchAsyncError } from "../middlewar/catchAsynErrors.js";
import express from "express";
import calenderscheduleModel from "../models/calendar.js";
const calenderEventRoute = express.Router();

calenderEventRoute.post(
  "/calenders/event",
  isAutheticated,
  authorizeRole("admin"),
  async (req, res, next) => {
    try{
        const { title, description,meetLink, date, time } = req.body;
        const event = await calenderscheduleModel.create({
            title, 
            description,
            meetLink,
            date,
            time

        });
        res.status(201).json({ success: true, event });
    }
    catch(error){
        return next(new ErrorHandler(error.message,400))
    }
}
);



calenderEventRoute.get(
  "/get-current-date-events",
  isAutheticated,
  async (req, res, next) => {
    try {
      // Get the current date
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); // Set time to beginning of the day

      // Find events for the current date
      const events = await calenderscheduleModel.find({
        date: {
          $gte: currentDate,
          $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000) // Next day
        }
      });

      res.status(200).json({ success: true, events });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export default calenderEventRoute;