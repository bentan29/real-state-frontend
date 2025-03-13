import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const saveFavourite = createAsyncThunk(
    'favourites/save',
    async({userId, propertyId}, {rejectWithValue}) => {
        try {
            const response = await axios.post(
                'http://localhost:8080/api/favourites/save',
                { userId, propertyId },
                { withCredentials: true }
            );
            return response?.data;
        }catch(error){
            return rejectWithValue(error.response?.data || "Error agregar o borrar de favoritos")
        }
    }
)

export const fetchMyFavourites = createAsyncThunk(
    'favourites/fetchMyFavourites',
    async(userId, {rejectWithValue}) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/favourites/fetchAll/${userId}`,
                { withCredentials: true }
            );
            return response?.data;
        } catch(error) {
            return rejectWithValue(error.response?.data || "Error al cargar los favoritos")
        }
    }
)