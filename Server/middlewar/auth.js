import jwt from "jsonwebtoken";
import ErrorHandler from "./ErrorHandler.js";
import { CatchAsyncError } from "./catchAsynErrors.js";
import { redis } from "../utils/redis.js";

// authentication user
export const isAutheticated = CatchAsyncError(async (req, res, next) => {
  const access_token = req.cookies.access_Token;

  if (!access_token) {
    return next(new ErrorHandler("please login to access this resource", 404));
  }
  const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN);

  if (!decoded) {
    return next(new ErrorHandler("access token is not valid", 404));
  }
  const user = await redis.get(decoded.id);

  if (!user) {
    return next(new ErrorHandler("user not found", 400));
  }

  req.user = JSON.parse(user);
  next();
});

export const authorizeRole = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403));
      }
      next();
    };
  };
  





































  