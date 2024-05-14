import { useParams } from "react-router-dom";
import { apiSlice } from "../api/apiSlice";


export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getFreeCourses:builder.query({
            query:() => ({
                url:"get-all-free-course",
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
    }),

})

export const { useGetFreeCoursesQuery,useGetsingleFreeCoursesQuery } = userApi;