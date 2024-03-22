import mongoose, { mongo } from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: Object,
  rating: {
    type: Number,
    default: 0,
  },
  comment: String,
});

const linkSchema = new mongoose.Schema({
  title: String,
  url: String,
});

const commentSchema = new mongoose.Schema({
  user: Object,
  comment: String,
  commentReplays: [Object],
});

const courseDataSchema = new mongoose.Schema({
  videoUrl: String,
  videoThumbnail: Object,
  title: String,
  videoSelection: String,
  videoDescribtion: String,
  videoLength : Number,
  videoPlayer : String,
  links : [linkSchema],
  suggestions : String,
  questions : [commentSchema]

});

const landingPageCourses = new mongoose.Schema({
    thumbnail : {
        public_id : {
        
            type: String
        },
        url :{
            type:String,
      
        }
    },
    name : {
        type:String,
        require:true,
    },
    phase : {
        require : true,
        type :[Object]},
    price : {
        type:Number,
        require : true,
    },
    estimatedPrice:  {
        type:Number,
        require : true,
    },
    language:  {
        type:String,
        require : true,
    },
    tags: {
        require : true,
        type :[Object]
    },
    benifits: {
        require : true,
        type :[Object]
    },
    preRequirement: {
        type:String,
        require : true,
    },
    review: {
        require : true,
        type :[reviewSchema]
    },
    rating :{
        type:Number,
        default:0
    },
    purchaces : {
        type : Number,
        default : 0
    },
    level: {
        type:String,
        require : true,
    },
    type : {
        type: String,

    }

});



const livebooksPaidCourse = new mongoose.Schema({

    name : {
        type:String,
        require:true,
    },
    describtion: {
        type:String,
        require : true,
    },
    thumbnail : {
        public_id : {
            require : true,
            type: String
        },
        url :{
            type:String,
            require:true
        }
    },
    tag :{
        type :String,
        require :true
    },
    level : {
        type :String,
        require:true
        
    },
    course : [courseDataSchema],
})


const livebooksFreeCourse = new mongoose.Schema({

    name : {
        type:String,
        require:true,
    },
    describtion: {
        type:String,
        require : true,
    },
    thumbnail : {
        public_id : {
            type: String
        },
        url :{
            type:String,
        }
    },
    tag :{
        type :String,
        require :true
    },
    level : {
        type :String,
        require:true
        
    },
    course : [courseDataSchema],

})

const freeCourse = mongoose.model('freecourses', livebooksFreeCourse)
const paidCourse = mongoose.model('paidcourses', livebooksPaidCourse)
const staticCourse = mongoose.model('staticources', landingPageCourses)


export {freeCourse, paidCourse, staticCourse}