import { createSlice } from "@reduxjs/toolkit"
import { fetchAllRelatorPropertys } from "./thunk"

const initialState = {
    isLoading: false,
    relatorPropertysList: [],
    relatorData: '',
    totalPropertys: [],
    limit: [],
    errors: []
}

const relatorSlice = createSlice({
    name: 'relatorSlice',
    initialState,
    reducers: {
        //-Reseteamos todo el Slice
        resetRelatorSlice: () => initialState,
    },
    
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllRelatorPropertys.pending, (state) => {
            state.isLoading = true
        })
        .addCase(fetchAllRelatorPropertys.fulfilled, (state, action) =>{
            state.isLoading = false
            state.relatorPropertysList = action.payload.data
            state.relatorData = action.payload.relator
            state.totalPropertys = action.payload.totalPropertys
            state.limit = action.payload.limit
        })
        .addCase(fetchAllRelatorPropertys.rejected, (state, action) => {
            state.isLoading = false
            state.errors = action.payload
            state.relatorPropertysList = []
            state.totalPropertys = []
        })
    }
})

export default relatorSlice.reducer;
export const { resetRelatorSlice } = relatorSlice.actions