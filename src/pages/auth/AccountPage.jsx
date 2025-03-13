
import { FormLoginRegister } from "@/components/account/formulario/FormLoginRegister";
import { setCurrentPage, setOpenFilters } from "@/store/sideBarSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const AccountPage = () => {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(setOpenFilters(false)); //- Cerramos los filtros de busqueda
        dispatch(setCurrentPage('cuenta'))
        return() => {
            dispatch(setCurrentPage(''))
        }
    }, [dispatch])

    return (
        <div className="max-w-2xl mx-auto pt-4 pb-8">
            <FormLoginRegister
                editUser={true}
                userData={user}
            />
        </div>
          
        
    )
}