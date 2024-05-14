import UserModel from "../models/user.js";
import { redis } from "../utils/redis.js";


// gettinf loggind user in redis and sending as responce
export const getUserById = async (id, res) => {
  const userJson = await redis.get(id);
  if (userJson) {
    const user = JSON.parse(userJson);

    res.status(201).json({
      success: true,
      user,
    });
  }else{
    const user = await UserModel.findById(id);

    res.status(201).json({
      success: true,
      user,
    });
  }
};

// get all user
export const getAllUserService = async (res) => {
  const users = await UserModel.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    users,
  });
};

// update user role
export const updateUserRoleService = async (res, id, role) => {
  const user = await UserModel.findByIdAndUpdate(id, {role}, {new:  true})
  res.status(201).json({
    success:true,
    user,
  })
}