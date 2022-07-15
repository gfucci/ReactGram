import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService";

const initialState = {
    user: {},
    loading: false,
    error: false,
    success: false,
    message: null
}

//get user details
export const profile = createAsyncThunk(
    "user/profile",
    async (user, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token

        const data = await userService.profile(user, token)

        return data
    }
)

// create slice
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(profile.pending, (state) => {
                state.loading = true
                state.error = false
            })
            .addCase(profile.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success = true
                state.user = action.payload
            })
    }  
})

export const { resetMessage } = userSlice.actions
export default userSlice.reducer