import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLogin } from "../auth/authSlice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_NEXT_PUBLIC_SERVER_URI,
  }),
  endpoints: (builder) => ({
    refreshToken: builder.query({
      query: () => ({ url: "refresh", method: "GET", credentials: "include" }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const token = result.data.accessToken;
          dispatch(userLogin({ token }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    loadUser: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchBaseQuery) {
        try {
          const result = await fetchBaseQuery({
            url: "me",
            method: "GET",
            credentials: "include",
          });

          if (result.error) {
            throw new Error(result.error.data.message);
          }

          const { accessToken, user } = result.data;
          _queryApi.dispatch(userLogin({ accessToken, user }));

          return { data: { user } };
        } catch (error) {
          console.error("Error loading user:", error);
          throw error;
        }
      },
    }),
  }),
});

export const { useRefreshTokenQuery, useLoadUserQuery } = apiSlice;
