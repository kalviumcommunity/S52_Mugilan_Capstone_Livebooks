import { apiSlice } from "../api/apiSlice";
import { userLoggedOut, userLogin } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // endpointt

    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "loginuser",
        method: "POST",
        body: { email, password },
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const token = result.data.activationKey;
          const user = result.data.user;
          dispatch(
            userLogin({
              token,
              user,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    logout: builder.query({
      query: () => ({
        url: "logout",
        method: "GET",
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
            await queryFulfilled;
            dispatch(userLoggedOut());
        } catch (error) {
            console.log("mmm",error);
        }
    }    
    }),
  }),
});

export const { useLoginMutation, useLazyLogoutQuery } = authApi;
