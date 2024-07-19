import { apiSlice } from "../api/apiSlice";

export const CalenderApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      createEvent: builder.mutation({
        query: (event) => ({
          url: "calenders/event",
          method: "POST",
          body: event,
          credentials: "include",
        }),
      }),
      getcurrentEvent: builder.query({
        query: () => ({
          url: "get-current-date-events",
          method: "GET",
          credentials: "include",
        }),
      }),
    }),
  });
  
  export const {
    useCreateEventMutation,
    useGetcurrentEventQuery
  } = CalenderApi;