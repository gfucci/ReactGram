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

//get user details (profile)
export const profile = createAsyncThunk(
    "user/profile",
    async (user, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token

        const data = await userService.profile(user, token)

        return data
    }
)

//update profile
export const updateProfile = createAsyncThunk(
    "user/update",
    async (user, thunkAPI) => {

        const token = thunkAPI.getState().auth.user.token

        const data = await userService.updateProfile(user, token)

        //check if exist errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        }

        return data
    }
)

//get user detail generic
export const getUserDetails = createAsyncThunk(
    "user/get",
    async (id, thunkAPI) => {
      const token = thunkAPI.getState().auth.user.token;
  
      const data = await userService.getUserDetails(id, token);
  
      console.log(data);
  
      return data;
    }
  );

// create slice
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      resetMessage: (state) => {
        state.message = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(profile.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(profile.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.error = null;
          state.user = action.payload;
        })
        .addCase(updateProfile.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateProfile.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.error = null;
          state.user = action.payload;
          state.message = "Usuário atualizado com sucesso!";
        })
        .addCase(updateProfile.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.user = null;
        })
        .addCase(getUserDetails.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getUserDetails.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.error = null;
          state.user = action.payload;
        });
    },
  });

export const { resetMessage } = userSlice.actions
export default userSlice.reducer