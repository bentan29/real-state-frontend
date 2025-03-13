import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    filterType: [], // tipo de propiedad
    filterOperation: [], //- operacion vender comparar alquilar etc
    filterSearch: '',
    locationFilter: {
        province: '',
        city: '',
    },
    priceFilter: {
        min: null,
        max: null
    },
    bedroomsFilter: {
        min: null,
        max: null
    },
    bathroomsFilter: {
        min: null,
        max: null
    },
    areaTotalFilter: {
        min: null,
        max: null
    },
    builtAreaFilter: {
        min: null,
        max: null
    }

}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {

        setFilterType: (state, action) => { 
            state.filterType = action.payload 
        },

        setFilterOperation: (state, action) => {
            state.filterOperation = action.payload
        },

        setFilterSearch: (state, action) => {
            state.filterSearch = action.payload
        },

        // 📌 Ubicacion
        setFilterProvince: (state, action) => {
            state.locationFilter.province = action.payload
        },
        setFilterCity: (state, action) => {
            state.locationFilter.city = action.payload
        },

        // 🟢 Nueva acción optimizada para actualizar cualquier filtro de rango
        setRangeFilter: (state, action) => {
            const { filterName, key, value } = action.payload;
            if (state[filterName] && (key === "min" || key === "max")) {
                state[filterName][key] = value;
            }
        },

        //* -- Reseteamos la localizacion para buscar en todos
        resetLocationFilters : (state) => {
            state.locationFilter = initialState.locationFilter
        },
        //* -- Reseteamos todos los filtros
        resetFilters: () => initialState

    }
})

export default filterSlice.reducer;
export const {
    setFilterType, 
    setFilterOperation, 
    setFilterSearch,
    setFilterProvince,
    setFilterCity,
    setRangeFilter,
    resetFilters,
    resetLocationFilters,
} = filterSlice.actions;