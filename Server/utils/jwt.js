import dotenv from "dotenv";
import { redis } from "./redis.js";
dotenv.config()
// Read expiration times from environment variables
const accessTokenExpire = parseInt(
  process.env.ACCESS_TOKEN_EXPIRE || "300",
  10
);
const refreshTokenExpire = parseInt(
  process.env.REFRESH_TOKEN_EXPIRE || "1200",
  10
);

// Configure options for access token cookie
export const accessTokenOption = {
  expires: new Date(Date.now() + accessTokenExpire * 60 * 60 * 1000),
  maxAge: accessTokenExpire * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};

// Configure options for refresh token cookie
export const refreshTokenOption = {
  expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
  maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};

export const sendToken = (user, statusCode, res) => {
  const accessToken = user.SignAccessToken();
  const refreshToken = user.SignRefreshToken();

  // Upload user data to Redis
  redis.set(user._id, JSON.stringify(user));

  // Set secure option for cookies in production
  if (process.env.NODE_ENV === "production") {
    accessTokenOption.secure = true;
    refreshTokenOption.secure = true;
  }

  // Set cookies with options
  res.cookie("access_Token", accessToken, accessTokenOption);
  res.cookie("refresh_Token", refreshToken, refreshTokenOption);

  // Send response

  res.status(statusCode).json({
    success: true,
    user,
  });
};
