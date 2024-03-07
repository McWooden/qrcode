import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: "account",
    initialState: {data: null},
    reducers: {
        setAccount: (state, action) => {
            state.data = action.payload
        },
        logout: (state) => {
            console.log('logout');
            localStorage.removeItem('account')
            state.data = null
        },
    },
});

// Action creators are generated for each case reducer function
export const { setAccount, logout } = counterSlice.actions;

export default counterSlice.reducer;
