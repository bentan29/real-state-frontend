import { resetRelatorSlice } from "@/store/relator-slice";
import { fetchAllRelatorPropertys } from "@/store/relator-slice/thunk";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

export const useRelatorFilters = (idUser, limit) => {

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
        if(idUser) {
            dispatch(fetchAllRelatorPropertys({
                idUser,
                limit,
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
        }

        return () => {
            dispatch(resetRelatorSlice());
        }

    }, [dispatch, filterType, filterOperation, filterSearch, locationFilter,  priceFilter,
        bedroomsFilter, bathroomsFilter, areaTotalFilter, builtAreaFilter, page, sort,
        idUser, limit 
    ])
        
    return {}
}

export default useRelatorFilters
