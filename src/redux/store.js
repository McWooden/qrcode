import { configureStore } from '@reduxjs/toolkit'
import server from './server'
import accountSlice from './accountSlice'
import source from './source'

// import { createSlice } from "@reduxjs/toolkit";
// import { getDecryptObjectLocalStorage, setEncryptObjectLocalStorage } from "../utils";

// const initialState = {
//     data: getDecryptObjectLocalStorage('account') || null,
// };

// export const accountSlice = createSlice({
//     name: "account",
//     initialState,
//     reducers: {
//         setAccount: (state, action) => {
//             const data = {...action.payload, timestamp: +new Date()}
//             setEncryptObjectLocalStorage('account', data)
//             state.data = data
//         },
//         logout: (state) => {
//             localStorage.removeItem('account')
//             state.data = null
//         },
//     },
// });

// // Action creators are generated for each case reducer function
// export const { setAccount, logout } = accountSlice.actions;

export const store = configureStore({
    reducer: {
        account: accountSlice || null,
        server: server || null,
        source: source || null
    },
})