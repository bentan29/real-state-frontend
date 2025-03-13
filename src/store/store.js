import { configureStore } from "@reduxjs/toolkit";

import propertysSlice from "./propertys-slice"
import filtersSlice from  "./filters-slice"
import paginationSortSlice from "./paginationSort-Slice"
import openDialogSlice from "./auth/openDialog-slice"
import authSlice from "./auth/auth-slice"
import sellerSlice from "./auth/crud-property-slice"
import sideBarSlice from "./sideBarSlice"
import favouritesSlice from "./auth/favourite-slice"
import relatorSlice from "./relator-slice"

export const store = configureStore({
    reducer: {
        propertys: propertysSlice,
        filters: filtersSlice,
        paginationSort: paginationSortSlice,
        openDialogSlice: openDialogSlice,
        auth: authSlice,
        sellerPropertys: sellerSlice,
        sideBarOptions: sideBarSlice,
        myFavourites: favouritesSlice,
        relator: relatorSlice
    }
})