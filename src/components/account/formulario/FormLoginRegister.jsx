import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDispatch } from "react-redux"
import { useMemo, useState } from "react"
import { editUserSchema, loginSchema, registerSchema } from "@/Schemas/UserSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { checkAuth, loginUser, registerUser, updateUser, uploadImage } from "@/store/auth/auth-slice/thunk"
import { toast } from "sonner"
import { setOpenLoginDialog } from "@/store/auth/openDialog-slice"
import { ImageUpload } from "./ImageUpload"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const FormLoginRegister = ({isRegister, editUser, setActiveTab, userData}) => {

    const dispatch = useDispatch()
    const [imageFile, setImageFile] = useState(null);

    // Memoriza si viene isRegister para evitar recomputaciones innecesarias. si cambia se actualiza
    const schema = useMemo(() => (
        isRegister? registerSchema //- Registrar usuario
            : editUser ? editUserSchema //- Editar usuario
            : loginSchema //- Login
    ), [isRegister, editUser])

    const { register, setValue, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: zodResolver(schema),
        defaultValues: 
            editUser 
            ? userData 
            : { contact:{email:"",phone:"",address:"" } } //- Contact siempre presente
    })

    // -- Función para manejar la subida de la imagen
    const uploadImageCloudinary = async() => {
        if (!imageFile) return;
        const data = new FormData();
        data.append('my_file', imageFile)
        const response = await dispatch(uploadImage(data));
        if(response.payload && response.payload.result.url) {
            return response.payload.result.url;// 🔹 Retorna la URL de la imagen
        }
        return null;
    }
  

    //-- Guardamos formulario en BD incluso la ruta de la imagen
    const onSubmit = async(formData) => {
        try {
            let imageUrl = formData.profileImage; // Si ya tiene una imagen, mantenerla
            //- Primero cargamos la imagen a cloudinary
            if(isRegister || editUser) { 
                const uploadedUrl  = await uploadImageCloudinary(); //-Esperamos a que se suba la imagen para obtener la URL
                if (uploadedUrl) {
                    imageUrl = uploadedUrl;
                }
            }
            formData.profileImage = imageUrl; // Agregar URL de imagen
            formData.contact = formData.contact || { email: "", phone: "", address: "" };
            const action = isRegister ? registerUser : editUser ? updateUser: loginUser;
            //- Tomamos todo el valor del formulario
            const payload = editUser ? {id: userData._id, formData} : formData;

            await dispatch(action(payload)).then((data) => {
                toast(data.payload.message)
                if (data.payload.success) {
                    reset(); //reseteamos el formulario
                    if (isRegister) {
                        setImageFile(null); // Resetear imagen
                        setActiveTab('login'); // Cambiar a pestaña de Login
                    } else if (editUser) {
                        toast("Perfil actualizado");
                        dispatch(checkAuth())
                        
                    } else { 
                        // login
                        dispatch(setOpenLoginDialog(false))
                    }
                }; 
            })


        } catch (error) {
            console.error('Error al subir imagen:', error)
            alert(error.message || `Error al ${isRegister ? "registrar" : "iniciar sesión"} el usuario`);
        }
    }

    return (

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        
            { (isRegister || editUser) && // -- Imagen de perfil 
                <ImageUpload
                    imageFile={imageFile}
                    setImageFile={setImageFile}
                    profileImage={userData?.profileImage} // Pasar la imagen existente desde AccountPage
                /> 
            }
        
            { (isRegister || editUser) && // -- Nombre de Usuario
                <div className="grid items-center gap-0.5">
                    <Label htmlFor="name" className="text-xs">Nombre</Label>
                    <Input 
                        {...register("name")} 
                        id="name" 
                        type="text" 
                        placeholder="Nombre de Usuario"
                        className="bg-blue-50 border-blue-200 h-8"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>
            }
                  
            {/* -- Email */}
            <div className="grid items-center gap-0.5">
                <Label htmlFor="email" className="text-xs">Correo</Label>
                <Input 
                    {...register("contact.email")} 
                    id="email" 
                    type="email" 
                    placeholder="email@ejemplo.com"
                    className="bg-blue-50 border-blue-200 h-8"
                />
                {errors.contact?.email && <p className="text-red-500 text-sm">{errors.contact.email.message}</p>}
            </div>
        
            {/* -- Contraseña */}
            {
                !editUser &&
                    <div className="grid items-center gap-0.5">
                        <Label htmlFor="password" className="text-xs">Contraseña</Label>
                        <Input 
                            {...register("password")} 
                            id="password" 
                            type="password" 
                            placeholder="Mínimo 6 caracteres"
                            className="bg-blue-50 border-blue-200 h-8"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>
            }
          

            {(isRegister || editUser) && (
                <>
                    <div className="grid items-center gap-0.5">
                        <Label htmlFor="contact.phone" className="text-xs">Teléfono</Label>
                        <Input {...register("contact.phone")} 
                            id="contact.phone" 
                            type="text" 
                            placeholder="Número de teléfono (*Opcional)" 
                            className="bg-blue-50 border-blue-200 h-8"
                        />
                        {errors.contact?.phone && <p className="text-red-500 text-sm">{errors.contact.phone.message}</p>}
                    </div>

                    <div className="grid items-center gap-0.5">
                        <Label htmlFor="contact.address" className="text-xs">Dirección Personal (Inmobiliaria)</Label>
                        <Input {...register("contact.address")} 
                            id="contact.address" 
                            type="text" 
                            placeholder="Dirección (*Opcional)" 
                            className="bg-blue-50 border-blue-200 h-8"
                        />
                        {errors.contact?.address && <p className="text-red-500 text-sm">{errors.contact.address.message}</p>}
                    </div>

                    <div className="grid items-center gap-0.5">
                        <Label htmlFor="listedBy" className="text-xs">Soy propietario, inmobiliaria o agente?</Label>
                        <Select onValueChange={(value) => setValue("listedBy", value)}>
                            <SelectTrigger className="border border-blue-500 bg-blue-50 h-8 rounded-md ">
                                <SelectValue placeholder="Selecciona una opción" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="propietario">Propietario</SelectItem>
                                <SelectItem value="inmobiliaria">Inmobiliaria</SelectItem>
                                <SelectItem value="agente">Agente</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.listedBy && <p className="text-red-500 text-sm">{errors.listedBy.message}</p>}
                    </div>
                </>
            )}
        
            <Button type="submit" className="w-full">
                {
                    isRegister 
                        ? "Registrar" 
                        : editUser ? "Actualizar"
                        : "Iniciar Sesión"
                    }
            </Button>
        </form>
    )
}
