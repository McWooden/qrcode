import { createSlice } from "@reduxjs/toolkit";

const password = import.meta.env.VITE_CAM_PASSWORD
const newDate = new Date()
const date = newDate.getDate()
const month = newDate.getMonth() + 1


export const slice = createSlice({
    name: 'source',
    initialState: {
        isCamPermission: false,
        camPassword: date + month + password
    },
    reducers: {
        setCamPermission: (state, action) => {
            state.camPassword === action.payload ? state.isCamPermission = true : state.isCamPermission = false
        }
    }
})

export const {setCamPermission} = slice.actions
export default slice.reducer