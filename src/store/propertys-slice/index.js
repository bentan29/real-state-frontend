import { createSlice } from "@reduxjs/toolkit"
import { fetchAllFilteredPropertys, getPropertyDetails } from "./thunk";

const initialState = {
    isLoading: false,
    propertysList: [],
    totalPropertys: [],
    limit: [],
    propertyDetails: null, //-propiedad a la que entramos
    errors: []
}

const propertysSlice = createSlice({
    name: 'propertysSlice',
    initialState,
    reducers: {
        resetPropertysSlice: () => initialState,
        resetPropertyDetails: (state) => {
            state.propertyDetails = null;
        }
    },

    extraReducers: (builder) => {
        builder
        //* --- Tomamos todas las propiedades y con filtros si los hay
        .addCase(fetchAllFilteredPropertys.pending, (state) => {
            state.isLoading = true
        })
        .addCase(fetchAllFilteredPropertys.fulfilled, (state, action) => {
            state.isLoading = false
            state.propertysList = action.payload.data
            state.totalPropertys = action.payload.totalPropertys
            state.limit = action.payload.limit
        })
        .addCase(fetchAllFilteredPropertys.rejected, (state) => {
            state.isLoading = false
        })
        //* --- Detalles de cada propiedad
        .addCase(getPropertyDetails.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getPropertyDetails.fulfilled, (state, action) => {
            state.isLoading = false
            state.propertyDetails = action.payload.data
        })
        .addCase(getPropertyDetails.rejected, (state) => {
            state.isLoading = false
        })
    }

})


export default propertysSlice.reducer;
export const { resetPropertysSlice, resetPropertyDetails } = propertysSlice.actions