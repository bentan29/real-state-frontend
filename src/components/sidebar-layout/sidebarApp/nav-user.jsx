import { ChevronsUpDown,  Heart, HomeIcon, HousePlus, LogOut, Settings, User, UserX2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/store/auth/auth-slice/thunk";
import { useNavigate } from "react-router-dom";
import { resetFilters } from "@/store/filters-slice";

export const NavUser = () => {
  const { isMobile } = useSidebar();
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
   

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const handleNavigate = (to) => {
    navigate(to)
    dispatch(resetFilters())
  }


  return (

    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
          
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                disabled={!user} // - Deshabilitamos si no hay usuario
                size="lg"
                className={`py-0.5 pl-0.5 rounded-lg data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground ${user &&  'border border-blue-800 bg-black/60 hover:bg-black/40'}`}
              >
                {/* -- Imagen de perfil */}
                <div className={`h-full aspect-square ${user ? 'bg-green-400/30' : 'bg-blue-400/30'} flex justify-center items-center rounded-sm`}>
                  {user 
                    ? user?.profileImage 
                        ? <img src={user?.profileImage} className="h-full w-full aspect-square object-cover"/>
                        : <User size={25}/> 
                    : <UserX2 size={25}/>  }
                </div>

                {
                  user 
                    ?  
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">{user?.name}</span>
                        <span className="truncate text-xs">{user?.email}</span>
                      </div>
                    :
                      <div className="grid flex-1 text-left text-sm ">
                        <span className="truncate font-semibold">Usuario no registrado</span>
                      </div>
                }
               

                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            { user &&
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg p-0.5"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >

                { user?.profileImage &&
                    <DropdownMenuLabel className="p-0 font-normal bg-gray-200">
                      <div className="flex max-h-52 items-center gap-2 text-left text-sm rounded-t-lg overflow-hidden">
                        <img src={user?.profileImage} className="h-full w-full object-cover"/>
                      </div>
                    </DropdownMenuLabel>
                }
              
                <DropdownMenuSeparator />

                <DropdownMenuGroup className="space-y-2">

                  <DropdownMenuItem className="cursor-pointer" onClick={() => handleNavigate('/')}>
                    <HomeIcon />
                    Inicio
                  </DropdownMenuItem>

                  <DropdownMenuItem className="cursor-pointer" onClick={() => handleNavigate('/account/favourites')}>
                    <Heart />
                    Favoritos
                  </DropdownMenuItem>

                  <DropdownMenuItem className="cursor-pointer" onClick={() => handleNavigate('/account/seller')}>
                    <HousePlus />
                    Mis propiedades / Vender
                  </DropdownMenuItem>

                  <DropdownMenuItem className="cursor-pointer" onClick={() => handleNavigate('/account/userAccount')}>
                    <Settings />
                    Cuenta
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem 
                    className="cursor-pointer"
                    onClick={handleLogout}
                    role="button"
                    aria-label="Cerrar sesión"
                  >
                    <LogOut />
                    Log out
                  </DropdownMenuItem> 

                </DropdownMenuGroup>

              </DropdownMenuContent>
            }

          </DropdownMenu>
        </SidebarMenuItem>


      </SidebarMenu>

    </>

   

  );
}
