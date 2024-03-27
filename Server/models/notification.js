import mongoose, { Schema } from "mongoose";

const notificationSchema = new mongoose.Schema({
    title : {
        type : String,
        require : true
    },
    message : {
        type :String,
        require : true
    },
    status  :{
        type: String,
        require : true,
        default: "unread"
    }
}, {timestamps : true})

const notificationModel = mongoose.model("notification", notificationSchema)
// mugilan
export default notificationModel