import { SidebarInput } from "@/components/ui/sidebar"
import { setFilterSearch } from "@/store/filters-slice";
import { Search } from "lucide-react"
import { useDispatch } from "react-redux"

export function SearchSidebar () {

    const dispatch = useDispatch();

    return (
        <div className="relative mx-2 bg-white mt-0.5">
            
            {/* icono */}
            <Search 
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                size={18} 
            />
            
            {/* input buscador */}
            <SidebarInput 
                className="w-full pr-10 placeholder:text-gray-400 border border-gray-800 rounded-none bg-black"
                placeholder="Buscar.."
                icon={<Search />}
                onChange={(e) => dispatch(setFilterSearch(e.target.value))}
            />

        </div>
    
  )
}

