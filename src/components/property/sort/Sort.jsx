import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { setSort } from "@/store/paginationSort-Slice"
import { ArrowDown01, ArrowDown10, ArrowUpDownIcon, ClockArrowDown, ClockArrowUp } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"

export const Sort = () => {
    const dispatch = useDispatch()
    const { sort } = useSelector((state) => state.paginationSort); // Extraemos el orden actual


     // Función para cambiar el orden
     const handleSortChange = (value) => {
        let newSort = { sort: "createdAt", order: "desc" };
        switch (value) {
            case "priceAsc":
                newSort = { sort: "price", order: "asc" };
                break;
            case "priceDesc":
                newSort = { sort: "price", order: "desc" };
                break;
            case "newest":
                newSort = { sort: "createdAt", order: "desc" };
                break;
            case "oldest":
                newSort = { sort: "createdAt", order: "asc" };
                break;
            default:
                break;
        }

        dispatch(setSort(newSort)); // Actualizamos el estado en Redux
    };

    

    return (

            <DropdownMenu>

                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-1 py-1 px-2 rounded-lg" size="xs">
                        <ArrowUpDownIcon className="h-4 w-4"/> 
                        <span className="hidden md:flex">Orden</span>
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuRadioGroup value={sort.sort + sort.order} onValueChange={handleSortChange}>
                        <DropdownMenuRadioItem className="px-2 gap-2" value="priceAsc"><ArrowDown01 /> Precio: Menor a Mayor</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem className="px-2 gap-2" value="priceDesc"><ArrowDown10 /> Precio: Mayor a Menor</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem className="px-2 gap-2" value="newest"><ClockArrowDown /> Más nuevos</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem className="px-2 gap-2" value="oldest"><ClockArrowUp /> Más viejos</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>

                </DropdownMenuContent>

            </DropdownMenu>
        
        //</div>
    )
}