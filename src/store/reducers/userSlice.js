import { createSlice } from "@reduxjs/toolkit";
import {toast} from 'react-toastify'

import {
  registerNewUser,
  existingUserLogin,
  updateUserProfile,
} from "../serverActions/userThunks";


const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    errorMessage: "",
  },
  reducers: {
    upDateUserLS: (state, action) => {
      state.user = action.payload;
    },
    removeUserLS: (state, action) => {
      state.user = action.payload;
    },
    onCloseError: (state, action) => {
      state.errorMessage = action.payload;
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerNewUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.errorMessage = '';
      })
      .addCase(registerNewUser.rejected, (state, action) => {
        state.errorMessage = action.payload || "my unknown error";
        
      })
      .addCase(existingUserLogin.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.errorMessage = '';
      })
      .addCase(existingUserLogin.rejected, (state, action) => {
        state.errorMessage = action.payload || "my unknown error";
        
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.errorMessage = '';
       
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.errorMessage = action.payload || "my unknown error";
        toast.error(`The user's profile has not been updated. The username is already in use`)
      });
  },
});
export const { upDateUserLS, removeUserLS, onCloseError } = userSlice.actions;
export default userSlice.reducer;