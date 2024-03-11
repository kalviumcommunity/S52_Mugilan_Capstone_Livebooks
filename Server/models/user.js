import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const emailRegExpattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your e-mail"],
      unique: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          return emailRegExpattern.test(value);
        },
        message: "Please enter a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [6, "Password must be at least 6 characters long"],
      maxlength: [15, "Password cannot exceed 15 characters"],
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"], // Specify allowed values for the role field
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    courses: [
      {
        courseId: String,
      },
    ],
  },
  { timestamps: true }// Automatically add createdAt and updatedAt fields
); 

const UserModel = mongoose.model("users", userSchema);

export default UserModel;

