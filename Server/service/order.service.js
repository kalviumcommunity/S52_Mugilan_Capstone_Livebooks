// create new order
import { CatchAsyncError } from "../middlewar/catchAsynErrors.js";
import orderModel from "../models/order.js";

export const newOrder = CatchAsyncError(async (data) => {
  const order = await orderModel.create(data);
  return order;
});

export const getAllOrderService = async(res) => {
    const order = await orderModel.find().sort({createdAt: -1})
    res.status(201).json({
        success : true,
        order
    })
}