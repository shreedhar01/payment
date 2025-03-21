import { createSlice } from "@reduxjs/toolkit"

const initialState = { userData : null }

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        store:(state, action) => {
            state.userData = action.payload.userData
        },
        remove:(state)=>{
            state.userData = null
        }
    }
})

export const {store, remove} = userSlice.actions

export default userSlice.reducer