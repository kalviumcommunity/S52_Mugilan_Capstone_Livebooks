import mongoose from "mongoose";

const contentHelp = new mongoose.Schema({
    type : {
        type:String,
        require : true
    },
    typeOf      : String,
    image       : String,
    describtion : String,
    credits     : String,
    text        : String,
})

const cheetSheetSchema = new mongoose.Schema({
    heading: String,
    subHeading : String,
    content : [contentHelp]

},{timestamps: true})

const cheetSheetModel = new mongoose.model('CheetSheet', cheetSheetSchema)

export default cheetSheetModel