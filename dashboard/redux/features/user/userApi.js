import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateAvatar:builder.mutation({
            query:(avatar) => ({
                url:"update_user_avatar",
                method:"POST",
                body:{avatar},
                credentials:"include"
            })
        }),
        updateUserInfo: builder.mutation({
            query:(name, email) => ({
                url:"update_user_info",
                method:"POST",
                body:{name, email},
                credentials:"include"
            })
        }),
        updateUserPassword: builder.mutation({
            query:(password) => ({
                url:"update_user_password",
                method:"POST",
                body:{password},
                credentials:"include"
            })
        }),
        getAlluser: builder.query({
            query:() => ({
                url:"get-all-users",
                method:"GET",
                credentials:"include",
            })
        })
    })
})

export const {useGetAlluserQuery} = userApi