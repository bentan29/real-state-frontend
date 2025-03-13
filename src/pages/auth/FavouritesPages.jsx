import { PropertyCard } from "@/components/property/property-card/PropertyCard";
import { fetchMyFavourites } from "@/store/auth/favourite-slice/thunk";
import { setCurrentPage, setOpenFilters } from "@/store/sideBarSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

export const FavouritesPages = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { myFavourites } = useSelector((state) => state.myFavourites);

    useEffect(() => {
        dispatch(setOpenFilters(false)); //- Cerramos los filtros de busqueda
        dispatch(setCurrentPage('favoritos'))
        return() => {
            dispatch(setCurrentPage(''))
        }
    }, [dispatch])

    useEffect(() => {
        if (user?._id) {
            dispatch(fetchMyFavourites(user._id));
        }
    }, [dispatch, user]);
    

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4 pt-2 pb-4">
            {
                myFavourites && myFavourites.items?.length > 0 ? (
                    myFavourites.items.map((item) => (
                        <PropertyCard 
                            key={item._id} 
                            property={item.propertyId} 
                        />
                    ))
                ) : <h2 className="col-span-full text-center">No hay Favoritos aún</h2>
            }

        </div>
      
    )
}


// myFavourites.map((favourite) => (
//     favourite.items.length > 0 ? (
//         favourite.items.map((item) => (
//             <PropertyCard
//                 key={item._id}
//                 property={item.propertyId}
//             />
//         ))
//     ) : (
//         <div key={favourite._id} className="col-span-full text-center">
//             No hay propiedades en favoritos
//         </div>
//     )
// ))