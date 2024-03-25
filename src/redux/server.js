import { createSlice } from "@reduxjs/toolkit";

export const server = createSlice({
    name: 'server',
    initialState: {
        be: 'https://4679-47-89-133-238.ngrok-free.app'
    },
    reducers: {
        setBe: (state, action) => {
            state.be = action.payload
        }
    }
})

export const { setBe } = server.actions
export default server.reducer
