import { configureStore } from '@reduxjs/toolkit'
import account from './account'
import server from './server'

export const store = configureStore({
    reducer: {
        account: account,
        server: server
    },
})