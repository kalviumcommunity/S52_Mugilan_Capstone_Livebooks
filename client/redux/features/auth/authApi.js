import { apiSlice } from "../api/apiSlice";
import { userLogin, userRegistration } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        // endpoints
        register : builder.mutation({
            query:(data) => ({
                url:"register",
                method:"POST",
                body:data,
                Credential:'include',
            }),
            async onQueryStarted(arg,{ queryFulfilled, dispatch }){
                try{
                    const result = await queryFulfilled;
                    const token = result.data.activationKey
                    dispatch(
                        userRegistration({
                            token
                        })
                    )
                }catch(error){
                    console.log(error)
                }
            }
        }),
        activation :builder.mutation({
            query:({activation_token, activation_code}) => ({
                url:'activate_user',
                method:'POST',
                body:{activation_token,activation_code},
            }),
        }),
        login:builder.mutation({
            query:({email,password}) => ({
                url:'login',
                method:'POST',
                body:{email,password},
                credentials :"include"
            }),
            async onQueryStarted(arg,{ queryFulfilled, dispatch }){
                try{
                    const result = await queryFulfilled;
                    const token = result.data.activationKey
                    const user = result.data.user
                    dispatch(
                        userLogin({
                            token,
                            user
                        })
                    )
                }catch(error){
                    console.log(error)
                }
            }
            
        })
    }),
})

export const {useRegisterMutation, useActivationMutation, useLoginMutation} = authApi