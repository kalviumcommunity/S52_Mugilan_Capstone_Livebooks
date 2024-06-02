import mongoose, { mongo } from "mongoose";
import jwt  from "jsonwebtoken";
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
      minlength: [6, "Password must be at least 6 characters long"],
      // maxlength: [20, "Password cannot exceed 20 characters"],
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      default: "student",
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

const questionSchema= new mongoose.Schema({
  user : Object,
  courseName: { type: String},
  moduleName: { type: String},

  question : {
    type : String,
    require : true
  },
  questionReplays:Array
  
})
userSchema.methods.SignAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN || "", {
    expiresIn: '5m'
  });
};

userSchema.methods.SignRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN|| '', {
    expiresIn: '3d'
  });
};

const UserModel = mongoose.model("users", userSchema);
const QuestionModel = mongoose.model("questions", questionSchema);
export  {UserModel, QuestionModel};

