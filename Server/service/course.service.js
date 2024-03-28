import { CatchAsyncError } from "../middlewar/catchAsynErrors.js";
import {freeCourse, paidCourse, staticCourse} from "../models/course.js"

const createPaidCourse = CatchAsyncError(async(data, res) => {
    const course = await paidCourse.create(data)
    res.status(201).json({
        success :true,
        course
    })
})

const createFreeCourse = CatchAsyncError(async(data, res) => {
    const course = await freeCourse.create(data)
    res.status(201).json({
        success :true,
        course
    })
})
const createStaticCourse = CatchAsyncError(async(data, res) => {
    const course = await staticCourse.create(data)
    res.status(201).json({
        success :true,
        course
    })
})

export const getAllStaticCoursesService = async(res) => {
    const course = await staticCourse.find().sort({createdAt : -1})
    res.status(201).json({
        success : true,
        course
    })
}
export const getAllPaidCoursesService = async(res) => {
    const course = await paidCourse.find().sort({createdAt : -1})
    res.status(201).json({
        success : true,
        course
    })
}
export const getAllFreeCoursesService = async(res) => {
    const course = await freeCourse.find().sort({createdAt : -1})
    res.status(201).json({
        success : true,
        course
    })
}

export {createStaticCourse, createFreeCourse, createPaidCourse} 