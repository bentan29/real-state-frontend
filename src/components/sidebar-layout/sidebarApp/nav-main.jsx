import { House, Handshake, Map, PieChart, Settings2 } from "lucide-react"; // Agrega más según necesites

// Mapeo de nombres de iconos a componentes de Lucide
const iconMap = {
  House: House,
  Handshake: Handshake,
  Map: Map,
  PieChart: PieChart,
  Settings2: Settings2,
};


import { ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Checkbox } from "@/components/ui/checkbox";
import { useTipoOperacionPropiedad } from "@/config/useTipoOperacionPropiedad";
import { useDispatch, useSelector } from "react-redux";
import { setFilterOperation, setFilterType } from "@/store/filters-slice";

export function NavMain() {

  const dispatch = useDispatch();
  const {filterType, filterOperation} = useSelector((state) => state.filters);//-filtros que vamos almacenando
  //- Tipos de propiedad, y Tipo de operacion (alquilar,comprar, etc)
  const { typeOptions, operationOptions } = useTipoOperacionPropiedad() //*Cargamos los valores filtros
  const filters = [typeOptions, operationOptions]


  const handleFilters = (filter, value) => {
    if (filter === "tipo_propiedad") {
      const newFilterType = filterType.includes(value)
        ? filterType.filter((v) => v !== value) // Quita si ya está
        : [...filterType, value]; // Agrega si no está
      dispatch(setFilterType(newFilterType)); // Agregamos un filtro de tipo de propiedad
    } else if (filter === "operation") {
      const newFilterOperation = filterOperation.includes(value)
        ? filterOperation.filter((v) => v !== value)
        : [...filterOperation, value];
        dispatch(setFilterOperation(newFilterOperation)); // Agregamos un filtro de operacion 
    }
  };


  return (
    <SidebarGroup>


      <SidebarMenu>
      
        {
          filters.map((filter) => {

            const IconComponent = iconMap[filter.icon];

            return (
              <Collapsible key={filter.id} asChild className="group/collapsible">
                <SidebarMenuItem key={filter.id}>

                  {/* Contenedor de cada Titulo principal*/}
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={filter.title}>
                      {IconComponent && <IconComponent className="mr-2" />}
                      <span>{filter.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    {/* Lista de opciones dentro de cada */}
                    <SidebarMenuSub>
                      {
                        filter.values.length > 0 ? (
                          filter.values.map((value) => (
                            <SidebarMenuSubItem key={value.id}>
                              <SidebarMenuSubButton>
                                
                                <Checkbox 
                                  checked={filter.id === "tipo_propiedad" ? filterType.includes(value.id) : filterOperation.includes(value.id)}
                                  onCheckedChange={()=>{handleFilters(filter.id, value.id)}} // (tipo_propiedad, casa)
                                />
                                {value.title}

                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))
                        ) : (
                          <p className="text-center text-gray-500 p-2">No hay opciones</p>
                        )
                      }
                    </SidebarMenuSub>
                  </CollapsibleContent>
                  
                </SidebarMenuItem>
              </Collapsible>
            );
          })
        }
      </SidebarMenu>
      
    </SidebarGroup>
  );
}
