import mongoose from "mongoose";

const orderSchema  = new mongoose.Schema({
    courseId : {
        type:String,
        require : true
    },
    userId : {
        type:String,
        require : true
    },
    payment_info : {
        type : Object,
        // require: true
    },
},{timestamps: true})

const orderModel = mongoose.model("order", orderSchema)

export default orderModel;