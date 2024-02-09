import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    account: 0,
};

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
