import ErrorHandler from "./ErrorHandler.js";

const ErrorMiddleware = async (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "INTERNAL SERVER ERROR";

  // wrong mongoose id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong JWT token error
  if (err.name === "jsonWebTokenError") {
    const message = "Json web token is invalid, try again";
    err = new ErrorHandler(message, 400);
  }

  // JWT expired error
  if (err.message === "TokenExpiredError") {
    const message = "Json web token is expired, try again";
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default ErrorMiddleware;
