import mongoose from "mongoose";

export const reviewSchema = new mongoose.Schema({
    review : {
        type: String,
        require : true
    },
    user : [Object]

}, {timestamps: true})

const reviewModel = mongoose.model("Reviews",reviewSchema )
export default reviewModel