import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateAvatar:builder.mutation({
            query:(avatar) => ({
                url:"update_user_avatar",
                method:"PUT",
                body:{avatar},
                credentials:"include"
            })
        }),
        updateUserInfo: builder.mutation({
            query: ({ name, email }) => ({
              url: "update_user_info",
              method: "PUT",
              body: { name, email },
              credentials: "include",
            }),
          }),
        updateUserPassword: builder.mutation({
            query:({oldPassword, newPassword}) => ({
                url:"update_user_password",
                method:"PUT",
                body:{oldPassword, newPassword},
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

export const { useUpdateUserPasswordMutation,  useUpdateAvatarMutation, useGetAlluserQuery, useUpdateUserInfoMutation} = userApi