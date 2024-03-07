import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log(`Database connected with ${mongoose.connection.host}`);
  } catch (err) {
    console.error("Error connecting to database:", err.message);
  }
};

export default connectDb;
