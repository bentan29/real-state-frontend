import { AppSidebar } from "./sidebarApp/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"
import { RegisterLoginDialog } from "../account/RegisterLoginDialog"
import { NavBarComponent } from "../common/NavBarComponent"

const SidebarLayout = () => {

    return (
        <>
                
            <SidebarProvider>

                <AppSidebar/> {/* Sidebar izquierdo con filtros */}

                <SidebarInset> {/* Contenido de la página */}
                  
                    <NavBarComponent/>  {/* Navbar login/register */}
                                   
                    {/* Contenido de las páginas */}
                    <div className="bg-gray-100">
                        <Outlet />
                    </div>

                </SidebarInset>

            </SidebarProvider>
    
            <RegisterLoginDialog/>
        </>


    )
}

export default SidebarLayout
