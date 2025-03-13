import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    openRegisterDialog: false, //-- Dialog de register y login 
    openPropertyDialog: false // -- Dialog de crear y editar propiedad
};

const openDialogSlice = createSlice({
    name: "openDialog",
    initialState,
    reducers: {

        setOpenLoginDialog: (state, action) => {
            state.openRegisterDialog = action.payload;
        },

        setOpenPropertyDialog: (state, action) => {
            state.openPropertyDialog = action.payload;
        }
    }
});

export const { setOpenLoginDialog, setOpenPropertyDialog } = openDialogSlice.actions;
export default openDialogSlice.reducer;
