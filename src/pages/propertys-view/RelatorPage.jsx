import { BreadcrumbAndSort } from "@/components/common/BreadcrumbAndSort"
import { PaginationDemo } from "@/components/property/pagination/Pagination"
import { PropertyCard } from "@/components/property/property-card/PropertyCard"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import useRelatorFilters from "@/hooks/useRelatorPropertys"
import { resetFilters } from "@/store/filters-slice"
import { setCurrentPage, setOpenFilters } from "@/store/sideBarSlice"
import { ChevronRight, ChevronsRight, Mail, MapPin, Phone } from "lucide-react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

export const RelatorPage = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const {relatorPropertysList, relatorData, isLoading, limit, totalPropertys} = useSelector((state) => state.relator)

    useRelatorFilters(id)

    useEffect(() => { //- Quitamos los filtos por si habia alguno
        dispatch(resetFilters())
    }, [dispatch])

    useEffect(() => {
        dispatch(setCurrentPage('relatorPage'))
    },[dispatch])

    useEffect(() => {
        dispatch(setOpenFilters(true)); //- Cerramos los filtros de busqueda
    }, [dispatch])

    console.log(relatorPropertysList);
    

    return (
        <div className="">

            <BreadcrumbAndSort/>

            {/* ------ Datos del Relator ------ */}
            <div className="p-2 space-y-2">
                <div className="flex items-center gap-2">
                    <ChevronsRight size={32} className="text-blue-500"/>
                    <h1 className="text-3xl font-bold">{relatorData?.name}</h1>
                    <ChevronRight size={32} className="text-blue-500 font-bold"/>
                    <h1 className="text-2xl capitalize text-muted-foreground">{relatorData?.listedBy}</h1>
                </div>

                <Card className="bg-blue-100 border-blue-300 rounded-md flex">
                    <CardContent className="p-5">
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Imagen de perfil del relator */}
                            {relatorData?.profileImage && 
                                <img src={relatorData?.profileImage} alt="profileImage" className="h-28"></img>
                            }

                            {/* Contacto */}
                            <div className="flex-col my-auto">
                                <h1 className="text-2xl flex items-center gap-2">
                                    <span className="text-muted-foreground"><Mail /></span>
                                    {relatorData?.contact?.email ? relatorData?.contact?.email : '-'}
                                </h1>
                                <h1 className="text-2xl flex items-center gap-2">
                                    <span className="text-muted-foreground"><Phone /></span>
                                    {relatorData?.contact?.phone ? relatorData?.contact?.phone : '-'}
                                </h1>
                                <h1 className="text-2xl flex items-center gap-2">
                                    <span className="text-muted-foreground"><MapPin /></span>
                                    {relatorData?.contact?.address ? relatorData?.contact?.address : '-'}
                                </h1>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

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
                            relatorPropertysList?.length ? relatorPropertysList.map((item) => 
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
            </section>

            <PaginationDemo 
                limit={limit} 
                total={totalPropertys} 
            /> 

        </div>
    )
}
