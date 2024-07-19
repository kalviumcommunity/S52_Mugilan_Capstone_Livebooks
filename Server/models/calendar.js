import mongoose from "mongoose";

const CalendarSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    meetLink: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    }
  });
  

const calenderscheduleModel = new mongoose.model("CalenderEvent", CalendarSchema)

export default calenderscheduleModel