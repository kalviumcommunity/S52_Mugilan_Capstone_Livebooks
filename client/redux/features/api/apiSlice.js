import {createApi , fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { userLogin } from "../auth/authSlice";


export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery : fetchBaseQuery({
        baseUrl : import.meta.env.VITE_NEXT_PUBLIC_SERVER_URI
    }),
    endpoints: (builder) => ({
        refreshToken:builder.query({
            query:() => ({
                url:"refresh",
                method:"GET",
                credentials:"include"
            }),
            async onQueryStarted(arg,{ queryFulfilled, dispatch }){
                try{
                    const result = await queryFulfilled;
                    const token = result.data.accessToken
                    dispatch(
                        userLogin({
                            token
                        })
                    )
                }catch(error){
                    console.log(error)
                }
            },
        
        }),
        loadUser:builder.query({
            query:() => ({
                url:"me",
                method:"GET",
                credentials:"include"
            }),
            async onQueryStarted(arg,{ queryFulfilled, dispatch }){
                try{
                    const result = await queryFulfilled;
                    const token = result.data.accessToken
                    const user = result.data.user
                    dispatch(
                        userLogin({
                            ...token,
                            user
                        })
                    )
                }catch(error){
                    console.log(error)
                }
            },
        
        }),


        
    })
})


export const {useRefreshTokenQuery, useLoadUserQuery} = apiSlice