import { createSlice } from "@reduxjs/toolkit";

export const server = createSlice({
    name: 'server',
    initialState: {
        be: import.meta.env.VITE_BE || 'http://localhost:3001'
    },
    reducers: {
        setBe: (state, action) => {
            state.be = action.payload
        }
    }
})

export const { setBe } = server.actions
export default server.reducer
