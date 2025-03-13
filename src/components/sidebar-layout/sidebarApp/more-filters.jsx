import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { SidebarGroup,  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem } from "@/components/ui/sidebar"
import { useCantidadFiltros } from "@/config/useCantidadFiltros"
import { setRangeFilter } from "@/store/filters-slice"
import { BedDouble, ChevronRight, DollarSign, ImageUpscale, Plus, Scaling, Toilet } from "lucide-react"
import { useDispatch } from "react-redux"

// Mapeo de nombres de iconos a componentes de Lucide
const iconMap = {
    Toilet: Toilet,
    BedDouble: BedDouble,
    Scaling: Scaling,
    ImageUpscale: ImageUpscale,
    DollarSign: DollarSign,
  };

export const MoreFilters = () => {

    const dispatch = useDispatch()
    const { featuresQuantityFilter } = useCantidadFiltros()

    const handleInputChange = (filterName, key, value) => {
        dispatch(
            setRangeFilter({
                filterName,
                key, // "min" o "max"
                value: value ? Number(value) : null
            })
        )
    }

    return (
        <SidebarGroup>
        
            <SidebarGroupLabel>Otros Filtros</SidebarGroupLabel>

            <SidebarMenu>
                <Collapsible>
                    <SidebarMenuItem>
                        
                        <CollapsibleTrigger asChild>
                            <SidebarMenuButton tooltip="Filtros">
                                <Plus className="mr-2" />
                                <span>Mas Filtros..</span>
                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                        </CollapsibleTrigger>
                    

                        <CollapsibleContent>
                            <SidebarMenuSub>
                                <SidebarMenuSubItem className="space-y-0.5">
                                    {
                                        featuresQuantityFilter.map((item) => {
                                            const IconComponent = iconMap[item.icon];
                                            return (
                                                <SidebarMenuButton key={item.id} className="h-fit border-gray-800 ">
                                                    <div className="flex flex-col gap-2">
                                                        <Separator className="w-5 bg-yellow-400"/>

                                                        <div className="flex text-start gap-2">
                                                            <IconComponent size={15} className="text-yellow-500"/>
                                                            <p className="text-xs">{item.name}</p>
                                                        </div>

                                                        <div className="flex items-center gap-2 w-full">
                                                            <Input 
                                                                placeholder="min"
                                                                type="number"
                                                                min={item.min}
                                                                max={item.max}
                                                                className="h-7 w-full text-center border border-gray-600 rounded-md"
                                                                onChange={(e) => handleInputChange(item.id, "min", e.target.value)}
                                                            />
                                                            <span className="text-gray-500">-</span>
                                                            <Input 
                                                                placeholder="max"
                                                                type="number"
                                                                min={item.min}
                                                                max={item.max}
                                                                className="h-7 w-full text-center border border-gray-600 rounded-md"
                                                                onChange={(e) => handleInputChange(item.id, "max", e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                </SidebarMenuButton>
                                            )
                                        })
                                    }
                                </SidebarMenuSubItem>
                            </SidebarMenuSub>
                        </CollapsibleContent>

                    </SidebarMenuItem>
                </Collapsible>
            </SidebarMenu>
        </SidebarGroup>
    )
}
