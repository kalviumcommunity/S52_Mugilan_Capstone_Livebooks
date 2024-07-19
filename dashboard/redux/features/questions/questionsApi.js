import { apiSlice } from "../api/apiSlice";

export const QuestionAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createQuestion: builder.mutation({
      query: (question) => ({
        url: "questions-in-course",
        method: "POST",
        body: question,
        credentials: "include",
      }),
    }),
    getAllQuestionsuser: builder.query({
      query: () => ({
        url: "get-all-user-questions",
        method: "GET",
        credentials: "include",
      }),
    }),
    getAllQuestionsAdmin: builder.query({
      query: () => ({
        url: "get-all-question-admin",
        method: "GET",
        credentials: "include",
      }),
    }),
    addAnswer: builder.mutation({
      query: (answer) => ({
        url: "add-answer",
        method: "PUT",
        body: answer,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateQuestionMutation,
  useGetAllQuestionsuserQuery,
  useGetAllQuestionsAdminQuery,
  useAddAnswerMutation,
} = QuestionAPI;
