import { configureStore } from '@reduxjs/toolkit'
import account from './account'
import server from './api.js'

// console.log(account, server)

export const store = configureStore({
    reducer: {
        account: account.reducer,
        server: server.reducer
    },
})

console.log(store.getState());