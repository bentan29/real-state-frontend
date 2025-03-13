import { BreadcrumbAndSort } from "@/components/common/BreadcrumbAndSort"
import { PaginationDemo } from "@/components/property/pagination/Pagination"
import { PropertyCard } from "@/components/property/property-card/PropertyCard"
import { UploadPropertyDialog } from "@/components/seller/uploadDialog/UploadPropertyDialog"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import useLoadSellerFilters from "@/hooks/useLoadSellerFilters"
import { setOpenPropertyDialog } from "@/store/auth/openDialog-slice"
import { setPage } from "@/store/paginationSort-Slice"
import { setCurrentPage, setOpenFilters } from "@/store/sideBarSlice"
import { Grid2x2, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export const SellerPage = () => {
    // const [open, setOpen] = useState(false)
    const [refresh, setRefresh] = useState(false); // Estado para refrescar

    const dispatch = useDispatch()
    const { propertysSellerList, totalSellerPropertys, limit, isLoading } = useSelector((state) => state.sellerPropertys); //- propiedades cargadas de los filtros
    const { filterType, filterOperation, filterSearch, filterProvince, filterCity } = useSelector((state) => state.filters);
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(setCurrentPage('sellerPage'))
        dispatch(setOpenFilters(true)); //- Abrimos los filtros de busqueda
        return () => {
            dispatch(setCurrentPage(''))
        }
    }, [dispatch]) 

    //-- Reseteamos la página cuando cambian los filtros
    useEffect(() => {
        dispatch(setPage(1));
    }, [dispatch, filterType, filterOperation, filterSearch, filterProvince, filterCity]);
    
    //--- Cargamos nuestras propiedades
    useLoadSellerFilters(user?._id, refresh)

    //*- Abrimos dialogo de cargar propiedad
    const handleOpenDialog = () => {
        dispatch(setOpenPropertyDialog(true));
    }

    // Función para refrescar las propiedades, cada vez que cargamos una nueva
    const refreshProperties = () => {
        setRefresh(prev => !prev); // Cambia el estado para disparar el useEffect qeu carga las propiedades
    };

    return (
        <div className="bg-blue-50">
            <BreadcrumbAndSort/>

            <div className="flex items-center justify-between px-4 py-2 bg-gray-100 shadow ">
                <div className="flex items-center gap-1">
                    <Grid2x2 size={18}/>
                    <h2>Mis Propiedades</h2>
                </div>
                <Button onClick={handleOpenDialog}>
                    <Plus/> 
                    <span className="hidden md:flex">Cargar Nueva</span> 
                </Button>
            </div>

            {/* --- Dialog para Editar o Subir nueva propiedad ---*/}
            <UploadPropertyDialog
                refreshProperties={refreshProperties}
            />

            <section>

            {
                isLoading 
                ?
                    <div className="flex flex-col space-y-3">
                        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                    </div>
                :
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4 pt-2 pb-4">
                        {
                            propertysSellerList?.length ? propertysSellerList.map((item) => 
                                <PropertyCard
                                    key={item._id}
                                    property={item}
                                    refreshProperties={refreshProperties}
                                />
                            ) : <h1 className="col-span-full text-center text-gray-600 text-xl flex justify-center items-center h-40">
                                    No se encontraron propiedades con esos filtros
                                </h1>
                        }
                    </div>
            }

            <PaginationDemo 
                limit={limit} 
                total={totalSellerPropertys} 
            /> 

            </section>

        </div>
    )
}
