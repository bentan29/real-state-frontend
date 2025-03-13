import { LogOut, Menu, UserRound } from "lucide-react"
import { Button } from "../ui/button"
import { useDispatch, useSelector } from "react-redux"
import { setOpenLoginDialog } from "@/store/auth/openDialog-slice"
import { logoutUser } from "@/store/auth/auth-slice/thunk"
import { useSidebar } from "../ui/sidebar"

export const NavBarComponent = () => {

    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { toggleSidebar } = useSidebar()
    
    const handleOpenDialog = () => {
        dispatch(setOpenLoginDialog(true)) //-abrimos el dialog de Login/Register
    }

    const handleLogout = () => {
        dispatch(logoutUser())
    }


    return (
        <nav className="h-14 border-no bg-black text-white z-50 flex items-center justify-between px-4  shadow-sm shadow-black sticky top-0">

            <div className="flex items-center gap-4">
                {/* Boton para mostrar el sidebar */}
                <div className="flex items-center">
                    {/* <SidebarTrigger className=" " aria-label="Toggle Sidebar" /> */}
                    <Button 
                        variant="ghost" 
                        className="text-white hover:bg-white/10 hover:text-white" 
                        onClick={toggleSidebar} 
                        aria-label="Toggle Sidebar"
                    >
                        <Menu size={24} />
                    </Button>
                    {/* <Separator orientation="vertical" className="mr-1 h-4" /> */}
                </div>
            </div>
            
            { user 
                ? 
                    (
                        <Button variant="destructive" onClick={handleLogout} className="flex rounded-lg h-8 bg-red-500/10 border-red-500 border items-center gap-1">
                            <LogOut size={20} className="text-red-500"/>
                        </Button>
                    ) 
                : 
                    ( 
                        <Button variant="ghost" onClick={handleOpenDialog} className="flex items-center gap-1">
                            <UserRound size={20} />
                            <span className="hidden md:flex">Login / Crear cuenta</span>
                        </Button>
                    )
            }
        </nav>
    )
}