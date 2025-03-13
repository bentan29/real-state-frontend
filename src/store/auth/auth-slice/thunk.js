import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//- Registrar
export const registerUser = createAsyncThunk(
    'auth/register',
    async(formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                'http://localhost:8080/api/auth/register',
                formData,
                // {
                //     withCredentials: true // ✅ Permite enviar y recibir cookies con la solicitud
                // }
            );
            return response?.data;
        }catch(error){
            return rejectWithValue(error.response?.data || "Error al registrar usuario")
        }

    }
)

//- Editar Usuario
export const updateUser = createAsyncThunk(
    'auth/editUser',
    async({id, formData}, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `http://localhost:8080/api/auth/editUser/${id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            return response?.data;
        }catch(error){
            return rejectWithValue(error.response?.data || error.message || "Algo salió mal");
        }
    }
)

//- Login
export const loginUser = createAsyncThunk(
    'auth/login',
    async(formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                'http://localhost:8080/api/auth/login',
                formData,
                {
                    withCredentials: true // ✅ Permite enviar y recibir cookies con la solicitud
                }
            );
            return response?.data;
        } catch(error){
            return rejectWithValue(error.response?.data || "Error al iniciar sesión")
        }
    }
)

//- Cerrar Sesion, logout
export const logoutUser = createAsyncThunk(
    "auth/logout",
    async(_, {rejectWithValue}) => {
        try {
            await axios.post(
                'http://localhost:8080/api/auth/logout',
                {},
                { withCredentials: true}
            );
            return true;
        }catch(error) {
            return rejectWithValue(error.response?.data || "Error al cerrar sesión")
        }
    }
)

//- Cargar Imagen perfil
export const uploadImage = createAsyncThunk(
    "auth/upload-image",
    async(data, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                'http://localhost:8080/api/auth/upload-image',
                data
            )
            return response?.data;
        }catch(error) {
            return rejectWithValue(error.response?.data || "Error al cargar imagen")
        }
    }
)

//- Comprobar si hay usuario autenticado
export const checkAuth = createAsyncThunk(
    "auth/check-session",
    async(_, {rejectWithValue}) => {
        try {
            const response = await axios.get(
                'http://localhost:8080/api/auth/check-session',
                { withCredentials: true }
            );
            return response?.data
        } catch(error) {
            return rejectWithValue(error.response?.data || "Error al verificar sesión")
        }
    }
)
