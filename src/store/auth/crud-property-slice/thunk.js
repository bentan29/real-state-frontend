import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//- Crear Propiedad
export const createProperty = createAsyncThunk(
    'propertys/seller/create',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                'http://localhost:8080/api/propertys/seller/create',
                formData,
                {withCredentials: true}
            )
            return response?.data;
        }catch(error){
            return rejectWithValue(error.response?.data || "Error al registrar usuario")
        }
    }
)

//- Actualizar
export const updateProperty = createAsyncThunk(
    'propertys/seller/edit',
    async({id, formData}, {rejectWithValue}) => {
        try {
            const response = await axios.put(
                `http://localhost:8080/api/propertys/seller/edit/${id}`,
                formData,
                {withCredentials: true}
            )
            console.log('datsss',formData);
            return response?.data
            
        }catch(error) {
            return rejectWithValue(error.response?.data || "Error al actualizar propiedad")
        }
    }
)

//- Eliminar
export const deleteProperty = createAsyncThunk(
    '/propertys/getPropertyDetails',
    async (id, {rejectWithValue}) => {
        try {
            const response = await axios.delete(
                `http://localhost:8080/api/propertys/seller/delete/${id}`,
                {withCredentials: true}
            );
            return response?.data;
        } catch(error){
            return rejectWithValue(error.response?.data || "Error al eliminar propiedad")
        }
    }
)

//- Subir imagenes de propiedades
export const uploadPropertyImages = createAsyncThunk(
    'propertys/seller/upload-images',
    async (formData, {rejectWithValue}) => {
        try {
            const response = await axios.post(
                'http://localhost:8080/api/propertys/seller/upload-images',
                formData
            )
            return response?.data
        }catch(error) {
            return rejectWithValue(error.response?.data || "Error al subir imagenes de la propiedad")
        }
    }
)

//- Traemos solo todas nuestras las propiedades que submimos
export const fetchAllFilteredSellerPropertys = createAsyncThunk(
    "properties/fetchPropertys",
    async ({
        idUser,
        page = 1, 
        sortParam = {sort: 'createdAt', order: 'desc'}, 
        type = [], 
        search = "", 
        operation = [],
        province = '',
        city = '',
        priceFilter = null,
        bedroomsFilter = null,
        bathroomsFilter = null,
        areaTotalFilter = null,
        builtAreaFilter = null,
    }, { rejectWithValue }) => {

        try {
            // Convertimos el objeto sortParam en un string "field,order"
            const sortParamString = `${sortParam.sort},${sortParam.order}`;

            const queryParams = new URLSearchParams({
                idUser,
                page,
                sortParam: sortParamString, // Enviamos el string concatenado
                search,
                province,
                type,
                operation,
                city
            });

            //- Convertimos a queryParams los valores de min y max
            const appendRangeFilter = (key, filter) => {
                if(filter?.min !== null || filter?.max !== null) {
                    queryParams.append(key, `${filter.min || ""},${filter.max || ""}`);
                }
            }

            appendRangeFilter("priceFilter", priceFilter);
            appendRangeFilter("bedroomsFilter", bedroomsFilter);
            appendRangeFilter("bathroomsFilter", bathroomsFilter);
            appendRangeFilter("areaTotalFilter", areaTotalFilter);
            appendRangeFilter("builtAreaFilter", builtAreaFilter);
            
            const response = await axios.get(`http://localhost:8080/api/propertys/seller/get?${queryParams.toString()}`);
            return response?.data;

        } catch (error) {
            console.error("Error en fetchAllFilteredPropertys:", error.message);
            return rejectWithValue(error.message);
        }
    }
);
