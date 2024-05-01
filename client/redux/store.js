import { configureStore } from "@reduxjs/toolkit";

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

