import { apiSlice } from "../api/apiSlice";


export const CourseAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getFreeCourses:builder.query({
            query:() => ({
                url:"get-all-free-courses",
                method:"GET",
                credentials:"include"
            })
        }),
        getsingleFreeCourses:builder.query({
            query:(id) => ({
                url:`get-single-free-course/${id}`,
                method:"GET",
                credentials:"include"
            })
        }),
        getPaidCourses:builder.query({
            query:(id) => ({
                url:`get-single-paid-course/${id}`,
                method:"GET",
                credentials:"include"
            })
        }),
        getAllPaidCourses:builder.query({
            query:() => ({
                url:`get-all-paid-course`,
                method:"GET",
                credentials:"include"
            })
        }),
    }),

})

export const { useGetFreeCoursesQuery,useGetsingleFreeCoursesQuery , useLazyGetPaidCoursesQuery, useGetAllPaidCoursesQuery} = CourseAPI;