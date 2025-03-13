import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    openFilters: false,
    currentPage: ''
}

const sideBarSlice = createSlice({
    name: 'sideBarSlice',
    initialState,

    reducers: {
        setOpenFilters: (state, action) => {
            state.openFilters = action.payload
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        }
    }
})

export const {setOpenFilters, setCurrentPage} = sideBarSlice.actions;
export default sideBarSlice.reducer;