import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: "",
    user: ""
};

const authSlice = createSlice({
    name: 'auth',
    initialState, // Corrected typo here
    reducers: {
        userRegistration: (state, action) => {
            state.token = action.payload.token;
        },
        userLogin: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        userLoggedOut: (state) => {
            state.token = "";
            state.user = "";
        }
    }
});

export const { userRegistration, userLogin, userLoggedOut } = authSlice.actions;

export default authSlice.reducer;
