import { createSlice } from "@reduxjs/toolkit";
import { createProperty, fetchAllFilteredSellerPropertys } from "./thunk"

const initialState = {
    isLoading: false,
    propertysSellerList: [],
    totalSellerPropertys: [],
    limit: [],
    //propertyDetails: null, // Detalles de la propiedad que entramos
    propertyToEdit: null,
    error: []
}

const propertysSellerSlice = createSlice({
    name: 'propertysSellerSlice',
    initialState,
    reducers: {
        //-Reseteamos todo el Slice
        resetPropertysSellerSlice: () => initialState,

        //-Propiedad a Editar
        setPropertyToEdit: (state, action) => {
            state.propertyToEdit = action.payload
        },

        //-Quitamos la propiedad que tendriamos seleccionada
        // resetPropertyDetails: (state) => {
        //     state.propertyDetails = null;
        // }
    },

    extraReducers: (builder) => {
        builder
        //- Cargar todas
        .addCase(fetchAllFilteredSellerPropertys.pending, (state) => {
            state.isLoading = true
        })
        .addCase(fetchAllFilteredSellerPropertys.fulfilled, (state, action) => {
            state.isLoading = false
            state.propertysSellerList = action.payload.data
            state.totalSellerPropertys = action.payload.totalSellerPropertys
            state.limit = action.payload.limit
        })
        .addCase(fetchAllFilteredSellerPropertys.rejected, (state, action) => {
            state.isLoading = false
            state.propertysSellerList = []
            state.totalSellerPropertys = []
            state.limit = []
            state.propertyDetails = null
            state.error = action.payload
        })
        //- Agregar nueva propiedad
        .addCase(createProperty.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createProperty.fulfilled, (state, action) => {
            state.isLoading = false
        })
        .addCase(createProperty.rejected, (state, action) => {
            state.isLoading = false
            state.propertysSellerList = []
            state.totalSellerPropertys = []
            state.limit = []
            state.propertyDetails = null
            state.error = action.payload
        })
    }
})

export default propertysSellerSlice.reducer
export const {
    resetPropertysSellerSlice, 
    setPropertyToEdit
} = propertysSellerSlice.actions
