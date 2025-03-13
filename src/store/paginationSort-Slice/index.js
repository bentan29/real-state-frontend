import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    page: 1,
    sort: {sort:'price', order:'desc'}
}

const paginationSortSlice = createSlice({
    name: 'paginationSort',
    initialState,
    reducers: {

        setPage: (state, action) => {
            state.page = action.payload
        },

        setSort: (state, action) => {  // ✅ Nueva acción para actualizar el ordenamiento
            state.sort = action.payload;
        }

    }

})

export default paginationSortSlice.reducer;
export const { setPage, setSort } = paginationSortSlice.actions;