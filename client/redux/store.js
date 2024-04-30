import { configureStore } from "@reduxjs/toolkit";
<<<<<<< HEAD
import { apiSlice } from "./features/api/apiSlice";
import authReducer from "./features/auth/authSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
    },
    devTools: false,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});
=======
import {apiSlice} from "./features/api/apiSlice"



export const store = configureStore({
    reducer : {
        [apiSlice.reducerPath]:apiSlice.reducer,
    },
    devTools : false,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})
>>>>>>> f661e90b4b1a9eea1c492fc42f6a217a1cd2a06c
