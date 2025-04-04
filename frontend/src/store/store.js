import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import authSlice from "./authSlice"

const store = configureStore({
    reducer:{
        user: userSlice,
        auth: authSlice
    },
})

export default store