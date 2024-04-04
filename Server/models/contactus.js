import mongoose, { Schema } from "mongoose";

const contactSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    mobileno : {
        type : Number,
        require : true
    },
    message : {
        type : String,
        require : true
    }

})

const contactModel = new mongoose.model("Contactus", contactSchema)

export default contactModel