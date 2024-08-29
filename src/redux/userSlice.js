import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "User",
    userID: null,
    userType: 1,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserID: (state, action) => {
            state.userID = action.payload;
        },
        clearUserID: (state) => {
            state.userID = null;
        },
        setUserType: (state, action) => {
            state.userType = action.payload;
        }
    },
});

export const { setUserID, clearUserID, setUserType } = userSlice.actions;

export default userSlice.reducer;