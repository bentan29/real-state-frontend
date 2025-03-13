import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { deleteProperty } from "@/store/auth/crud-property-slice/thunk";
import { useDispatch } from "react-redux"
import { toast } from "sonner";

export const ConfirmDeleteDialog = ({open, setOpen, id, refreshProperties}) => {

    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteProperty(id)).then(
            (data) => {
                if(data.payload.success) {
                    setOpen(false)
                    toast(data.payload.message);
                    refreshProperties();
                }
            }
        )
    }
    

    return (
        <Dialog open={open} setOpen={setOpen} onOpenChange={(isOpen) => {setOpen(isOpen)}}>
            <DialogContent className="p-10">
                <DialogHeader>
                    <DialogTitle className="text-center">Estas seguro de eliminar esta Propiedad ?</DialogTitle>
                    <DialogDescription className="flex justify-between pt-5 gap-1">

                        <Button 
                            className="w-full rounded-none" 
                            variant="destructive"
                            onClick={handleDelete}
                        >
                        Elimiar
                        </Button>

                        <Button 
                            className="w-full rounded-none"
                            onClick={()=>setOpen(!open)}
                        >
                        Cancelar
                        </Button>

                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

