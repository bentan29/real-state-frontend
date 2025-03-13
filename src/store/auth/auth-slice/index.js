import { createSlice } from "@reduxjs/toolkit";
import { checkAuth, loginUser, logoutUser, registerUser, updateUser } from "./thunk";

const initialState = {
    isLoading: true,
    isAuthenticated: false,
    user: null,
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // checkAuth: (state, action) => {
        //     state.isAuthenticated = action.payload.isAuthenticated;
        //     state.user = action.payload.user;
        //     state.isLoading = false
        // }
    },

    extraReducers: (builder) => {
        builder
        //* --- Registrar
        .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = null;
            state.error = null;
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null,
            // state.error = action.error.message;
            state.error = action.payload;
        })
        //* --- Update
        // .addCase(updateUser.pending, (state) => {
        //     state.isLoading = true;
        // })
        // .addCase(updateUser.fulfilled, (state, action) => {
        //     state.isLoading = false;
        //     state.isAuthenticated = true;
        //     // state.user = action.payload.data;
        //     state.error = null;
        // })
        // .addCase(updateUser.rejected, (state, action) => {
        //     state.isLoading = false;
        //     state.isAuthenticated = false;
        //     state.user = null,
        //     // state.error = action.error.message;
        //     state.error = action.payload;
        // })
        //* --- Login
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            //state.user = action.payload
            state.error = null;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null,
            state.error = action.payload;
            // state.error = action.error.message;
        })
        //* --- CheckAuth
        .addCase(checkAuth.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(checkAuth.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user
            state.error = null;
        })
        .addCase(checkAuth.rejected, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null,
            state.error = action.payload;
            // state.error = action.error.message;
        })
        //* --- Logout
        .addCase(logoutUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(logoutUser.fulfilled, (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.isLoading = false;
            state.error = null;
          });
    }
})

export default authSlice.reducer;
// export const { checkAuth } = authSlice.actions;