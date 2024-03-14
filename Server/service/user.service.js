import UserModel from "../models/user.js"

export const getUserById = async (id, res) => {
    const user = await UserModel.findById(id)
    res.status(201).json({
        success : true,
        user
    })
}