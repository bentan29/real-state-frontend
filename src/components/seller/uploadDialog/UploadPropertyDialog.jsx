import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCallback, useState } from "react";
import { FormUploadProperty } from "../formulario/FormUploadProperty";
import { useDispatch, useSelector } from "react-redux";
import { setOpenPropertyDialog } from "@/store/auth/openDialog-slice";
import { setPropertyToEdit } from "@/store/auth/crud-property-slice";

export const UploadPropertyDialog = ({refreshProperties}) => {

  const dispatch = useDispatch()
  const [imageFiles, setImageFiles] = useState([]);
  const { openPropertyDialog } = useSelector((state) => state.openDialogSlice)
  const { propertyToEdit } = useSelector((state) => state.sellerPropertys)

  //-- Usamos useCallback para evitar recrear la función en cada render
  const handleDialogChange = useCallback(
    (isOpen) => {
      if (!isOpen) {
        setImageFiles([]); //- Limpiar imágenes al cerrar el modal
      } 
      dispatch(setOpenPropertyDialog(isOpen)) // cerramos el Dialog
      dispatch(setPropertyToEdit(null))
    },
    [dispatch]
  );
  
  

  return (
    <Dialog open={openPropertyDialog} onOpenChange={handleDialogChange}>
      <DialogContent className="max-w-2xl w-full max-h-[85vh] md:max-h-full overflow-y-auto">

        <DialogHeader>
          <DialogTitle>
            {!propertyToEdit ? 'Nueva Propiedad' : 'Editar Propiedad'}
          </DialogTitle>
        </DialogHeader>

        {/* --- Formulario */}
        <FormUploadProperty
          imageFiles={imageFiles} 
          setImageFiles={setImageFiles}
          propertyToEdit={propertyToEdit}
          refreshProperties={refreshProperties}
        />
       
      </DialogContent>
    </Dialog>
  );
};
