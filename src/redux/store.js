import { configureStore } from '@reduxjs/toolkit'
import account from './account'

export const store = configureStore({
    reducer: {
        account: account
    },
})