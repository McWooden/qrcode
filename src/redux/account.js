import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    account: null,
};

export const counterSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setAccount: (state, action) => {
            state.account = action.payload
        },
    },
});

// Action creators are generated for each case reducer function
export const { setAccount } = counterSlice.actions;

export default counterSlice.reducer;
