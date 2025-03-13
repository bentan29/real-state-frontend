import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenuButton, SidebarRail,useSidebar,} from "@/components/ui/sidebar"
import { SearchSidebar } from "./search-sidebar"
import { LocationFilter } from "./location-filter"
import { MoreFilters } from "./more-filters"
import { useDispatch, useSelector } from "react-redux"

import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { resetFilters } from "@/store/filters-slice"
import { SideBarRelatorPropertys } from "../sideBar-property-details/SideBarRelatorPropertys"

export function AppSidebar() {

  const sidebar = useSidebar()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { propertyDetails } = useSelector((state) => state.propertys);
  const { openFilters, currentPage } = useSelector((state) => state.sideBarOptions);

  //-quitamos todos los filtros y al hacerlo navegamos a home
  const handleClearFilters = () => {
    dispatch(resetFilters())
    navigate('/')
  }

  return (
    <Sidebar collapsible="icon" className="border-none shadow-md shadow-black">

      {/* Header del sideBar */}
      <SidebarHeader className="bg-black/20 h-14  flex items-center justify-center">
        <SidebarMenuButton
          variant="ghost"
          onClick={handleClearFilters}
          className="text-lg font-semibold transition-colors border rounded-none border-none text-yellow-400 hover:bg-yellow-300/50"
       >
          <Home/>
          <h1 className="text-lg font-semibold">Inmobiliaria</h1>
        </SidebarMenuButton>

      </SidebarHeader>

      <SidebarHeader>
        <NavUser/>
      </SidebarHeader>

      {/* Contenido del sideBar */}
      <SidebarContent>

        {
          !openFilters //-si los filtros estan cerrados
            ?
            <>
              <div className={`text-center text-white py-2 bg-black/10 transition-all ${sidebar.open ? "px-2" : "px-0.5"}`}>
                { //- Esto lo mostramos solo cuando el sideBar esta abierto
                  sidebar.open && 
                    <>
                      {currentPage === 'propertyDetails' && 
                          <p className="text-sm text-start text-gray-300">
                            Publicada por
                          </p>
                      }
                    </>
                }
                
                { //-Detalles del vendedor se muestra solo con el sidebar abierto
                  propertyDetails?.owner &&
                  <div className="max-w-14 flex items-center gap-4">
                    <img src={propertyDetails?.owner.profileImage} className="my-2"/>
                    <div className="text-start">
                      <h2 className="text-md font-bold capitalize text-blue-400">{propertyDetails?.owner.name}</h2>
                      <p className="text-xs">{propertyDetails?.owner.contact.phone}</p>
                      <p className="text-xs">{propertyDetails?.owner.contact.email}</p>
                    </div>
                  </div>
                }

                {sidebar.open && propertyDetails?.owner.contact.address &&
                    <div className="text-start text-sm flex gap-2">
                      <p className="text-gray-400">Direcion :</p>
                      <p>{propertyDetails?.owner.contact.address}</p>
                    </div>
                }
              </div>

                {
                  sidebar.open &&
                    <div>
                      <SideBarRelatorPropertys/> {/* Lista de propiedades del vendedor */}
                    </div>
                }
            </>
              
            : 
              <>
                {/* Filtros de busqueda */}
                <SearchSidebar/> {/*//* Buscador Search*/}
                {/* { sidebar.open &&  <SidebarMenuButton className="mx-2"> <ChevronRight />Ver Todas</SidebarMenuButton> } */}
                <NavMain /> {/*//* Filtros principales */}
                <LocationFilter/> {/*//* Filtros ubicacion */}  
                <MoreFilters/> {/*//* Filtros extras, (cantdidad habitaciones,baños,m2) */}
              </>
        }

        

        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>

      {/* Pie del sidebar */}
      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
      
      <SidebarRail />

    </Sidebar>
  )
}
