import { resetPropertysSlice } from "@/store/propertys-slice";
import { fetchAllFilteredPropertys } from "@/store/propertys-slice/thunk";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useLoadFilters = () => {

    const dispatch = useDispatch();

    //-- Tomamos los filtros que vamos estableciendo en el store
    const { 
        filterType,  
        filterOperation,  
        filterSearch,
        locationFilter,
        priceFilter,
        bedroomsFilter,
        bathroomsFilter,
        areaTotalFilter,
        builtAreaFilter,
    } = useSelector((state) => state.filters);
     
    const { page, sort } = useSelector((state) => state.paginationSort);
    
    //-Cargamos las propiedades con filtro o sin filtros
    useEffect(() => {
        // dispatch(resetPropertysSlice());
        
        dispatch(fetchAllFilteredPropertys({
            type: filterType, 
            operation: filterOperation,
            search: filterSearch,
            province: locationFilter.province,
            city: locationFilter.city,
            priceFilter,
            bedroomsFilter,
            bathroomsFilter,
            areaTotalFilter,
            builtAreaFilter,
            page,
            sortParam: sort
        }))
        return () => {
            dispatch(resetPropertysSlice());
        }
    }, [dispatch, filterType, filterOperation, filterSearch, locationFilter, priceFilter, 
        bedroomsFilter, bathroomsFilter, areaTotalFilter,builtAreaFilter, page, sort
    ])
    
    return {}
}