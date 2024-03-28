import UserModel from "../models/user.js";
import { redis } from "../utils/redis.js";

export const getUserById = async (id, res) => {
  const userJson = await redis.get(id);
  if (userJson) {
    const user = JSON.parse(userJson);
    res.status(201).json({
      success: true,
      user,
    });
  }
};

export const getAllUserService = async (res) => {
  const users = await UserModel.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    users,
  });
};
