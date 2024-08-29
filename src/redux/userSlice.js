import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "User",
    userID: null
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
        }
    },
});

export const { setUserID, clearUserID } = userSlice.actions;

export default userSlice.reducer;