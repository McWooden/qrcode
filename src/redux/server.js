import { createSlice } from "@reduxjs/toolkit";

export const server = createSlice({
    name: 'server',
    initialState: {
        be: 'https://a000-115-178-236-185.ngrok-free.app/'
    },
    reducers: {
        setBe: (state, action) => {
            state.be = action.payload
        }
    }
})

export const { setBe } = server.actions
export default server.reducer
