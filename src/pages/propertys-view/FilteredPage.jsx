import { BreadcrumbAndSort } from "@/components/common/BreadcrumbAndSort";
import { PaginationDemo } from "@/components/property/pagination/Pagination";
import { PropertyCard } from "@/components/property/property-card/PropertyCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useLoadFilters } from "@/hooks/useLoadFilters";
import { setPage } from "@/store/paginationSort-Slice";
import { setOpenFilters } from "@/store/sideBarSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

export const FilteredPage = () => {

    const dispatch = useDispatch()
    const { propertysList, totalPropertys, limit, isLoading } = useSelector((state) => state.propertys); //- propiedades cargadas de los filtros
    const { filterType, filterOperation, filterSearch, locationFilter} = useSelector((state) => state.filters);

    //-- Reseteamos la página cuando cambian los filtros
    useEffect(() => {
        dispatch(setPage(1));
    }, [dispatch, filterType, filterOperation, filterSearch, locationFilter]);

    useEffect(() => {
        dispatch(setOpenFilters(true)); //- Abrimos los filtros de busqueda
    }, [dispatch])

    //- Cargamos las propiedades
    useLoadFilters() //-hook de carga de filtros
        
    
    return (
        <div>

            <BreadcrumbAndSort/>

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
                    // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2 py-4 justify-items-center"> 
                    <div className="justify-items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                        {
                            propertysList?.length ? propertysList.map((item) => 
                                <PropertyCard 
                                    key={item._id}
                                    property={item}
                                />
                            ) : <h1 className="col-span-full text-center text-gray-600 text-xl flex justify-center items-center h-40">
                                    No se encontraron propiedades con esos filtros
                                </h1>
                        }
                    </div>
                }
                
                <PaginationDemo 
                    limit={limit} 
                    total={totalPropertys} 
                /> 

            </section>
        </div>
             

               
    )
}
