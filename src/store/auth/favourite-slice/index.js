import { createSlice } from "@reduxjs/toolkit"
import { fetchMyFavourites } from "./thunk"

const initialState = {
    isLoading: false,
    myFavourites: []
}

const myFavouritesSlice = createSlice({
    name: 'myFavourites',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
        .addCase(fetchMyFavourites.pending, (state) => {
            state.isLoading = true
        })
        .addCase(fetchMyFavourites.fulfilled, (state, action) => {
            state.isLoading = false
            state.myFavourites = action.payload.data
        })
        .addCase(fetchMyFavourites.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
    }
})

export default myFavouritesSlice.reducer