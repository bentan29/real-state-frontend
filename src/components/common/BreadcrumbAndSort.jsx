import { ChevronRight } from "lucide-react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb"
import { Sort } from "../property/sort/Sort"
import { useSelector } from "react-redux"

export const BreadcrumbAndSort = () => {

    const { filterType, filterOperation } = useSelector((state) => state.filters)

    return (
        <header className="flex border-b bg-gray-50 h-12 px-5 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-10">
            <div className="flex items-center w-full gap-2">
                {/* Filtros Breadcrumb */}
                <p className="text-xs font-semibold text-muted-foreground">Filtros</p>
                <ChevronRight size={13} />

                <div className="flex justify-between w-full items-center">

                    {/* Breadcrumb - Índice de rutas */}
                    <Breadcrumb className="flex">
                        <BreadcrumbList>

                            {   
                                filterOperation.length > 0 && ( //-- Si filtramos por operaciones mostramos cuales
                                    <>
                                        <BreadcrumbItem className="hidden md:block">
                                            <BreadcrumbPage className="capitalize">{filterOperation.join(", ")}</BreadcrumbPage>
                                        </BreadcrumbItem>
                                        <BreadcrumbSeparator className="hidden md:block" />
                                    </>
                                )
                            }

                            {   //-- Si filtramos por tipo de propiedades mostramos cuales
                                filterType.length > 0 && (
                                    <BreadcrumbItem>
                                        <BreadcrumbPage className="capitalize">{filterType.join(", ")}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                )
                            }

                        </BreadcrumbList>
                    </Breadcrumb>
                    
                    {/* Ordenamiento */}
                    <Sort/>
                </div>
            </div>
        </header>
    )
}
