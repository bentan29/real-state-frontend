import { Dialog,  DialogContent} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { setOpenLoginDialog } from "@/store/auth/openDialog-slice";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { LogRegDialogContent } from "./LogRegDialogContent";
import { useCallback, useState } from "react";

export const RegisterLoginDialog = () => {
  
  const dispatch = useDispatch();
  const { openRegisterDialog } = useSelector((state) => state.openDialogSlice)
  const [ activeTab, setActiveTab ] = useState('login')

  // Usamos useCallback para evitar recrear la función en cada render
  const handleDialogChange = useCallback(
    (isOpen) => {
      dispatch(setOpenLoginDialog(isOpen));
    },
    [dispatch]
  );


    return (
      <Dialog open={openRegisterDialog} onOpenChange={handleDialogChange}>
        <DialogContent className="max-w-xl bg-gradient-to-br from-gray-50 to-gray-200 p-6 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl">
          
          {/* Contenedor de Tabs con diseño refinado */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="bg-white p-6 rounded-lg shadow-md transition-all duration-300">
            
            {/* Lista de Tabs con efecto interactivo */}
            <TabsList className="flex w-full bg-gray-200 p-1 rounded-lg">

              <TabsTrigger 
                value="login" 
                className="w-1/2 py-2 font-semibold text-gray-700 rounded-lg transition-all duration-300 hover:bg-gray-300 focus:ring-2 focus:ring-gray-500"
              > 
                Login
              </TabsTrigger>

              <TabsTrigger 
                value="registrarme" 
                className="w-1/2 py-2 font-semibold text-gray-700 rounded-lg transition-all duration-300 hover:bg-gray-300 focus:ring-2 focus:ring-gray-500"
              > 
                Registrarme
              </TabsTrigger>

            </TabsList>
    
            {/* Contenido de cada pestaña con efecto fade */}
            <TabsContent value="login" className="pt-3 text-gray-600 animate-fadeIn">   
              {/* //* --- Contenido con el Formulario */}
              <LogRegDialogContent/> 
            </TabsContent>
    
            <TabsContent value="registrarme" className="pt-4 animate-fadeIn">
              {/* //* --- Contenido con el Formulario */}
              <LogRegDialogContent 
                isRegister={true} 
                setActiveTab={setActiveTab}
              />
            </TabsContent>
    
          </Tabs>
    
        </DialogContent>
      </Dialog>
    );
    
};
  