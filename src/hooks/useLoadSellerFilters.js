import { resetPropertysSellerSlice } from "@/store/auth/crud-property-slice";
import { fetchAllFilteredSellerPropertys } from "@/store/auth/crud-property-slice/thunk";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

export const useLoadSellerFilters = (idUser, refresh) => {

    const dispatch = useDispatch();

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

    useEffect(() => {
        // dispatch(resetPropertysSellerSlice());
        dispatch(fetchAllFilteredSellerPropertys({
            idUser,
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
            dispatch(resetPropertysSellerSlice());
        }
    }, [dispatch, filterType, filterOperation, filterSearch, locationFilter,  priceFilter,
        bedroomsFilter, bathroomsFilter, areaTotalFilter, builtAreaFilter, page, sort,
        idUser, refresh, 
    ])
        
    return {}
}

export default useLoadSellerFilters
