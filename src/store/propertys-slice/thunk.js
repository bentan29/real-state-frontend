import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllFilteredPropertys = createAsyncThunk(
    "properties/fetchPropertys",
    async ({ 
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
                page,
                sortParam: sortParamString, // Enviamos el string concatenado
                search,
                province,
                type,
                operation,
                city,
            });

            //- Convertimos a queryParams los valores de min y max
            const appendRangeFilter = (key, filter) => {
                if (filter?.min !== null || filter?.max !== null) {
                    queryParams.append(key, `${filter.min || ""},${filter.max || ""}`);
                }
            };
            
            appendRangeFilter("priceFilter", priceFilter);
            appendRangeFilter("bedroomsFilter", bedroomsFilter);
            appendRangeFilter("bathroomsFilter", bathroomsFilter);
            appendRangeFilter("areaTotalFilter", areaTotalFilter);
            appendRangeFilter("builtAreaFilter", builtAreaFilter);
            
            console.log("Query Params Enviados:", queryParams.toString());
            
            const response = await axios.get(`http://localhost:8080/api/propertys/get?${queryParams.toString()}`);
            return response?.data;

        } catch (error) {
            console.error("Error en fetchAllFilteredPropertys:", error.message);
            return rejectWithValue(error.message);
        }
    }
);


export const getPropertyDetails = createAsyncThunk(
    "properties/getPropertyDetails",
    async(id) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/propertys/getPropertyDetails/${id}`);
            return response?.data;
        }catch(error){
            console.error("Error en getPropertyDetails:", error.message);
        }
    }
)