import { DialogHeader, DialogTitle } from "../ui/dialog";
import { FormLoginRegister } from "./formulario/FormLoginRegister";


export const LogRegDialogContent = ({ isRegister, setActiveTab }) => {


    // const [imageFile, setImageFile] = useState(null);

    // // Memoriza si viene isRegister para evitar recomputaciones innecesarias. si cambia se actualiza
    // const schema = useMemo(() => (
    //     isRegister 
    //         ? registerSchema //schemas.register 
    //         : loginSchema //schemas.login
    // ), [isRegister]);

    // const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: zodResolver(schema)});

    // // 🔹 Función para manejar la subida de la imagen
    // const uploadImageCloudinary = async() => {
    //     if (!imageFile) return;
    //     const data = new FormData();
    //     data.append('my_file', imageFile)

    //     const response = await dispatch(uploadImage(data));
    //     if(response.payload && response.payload.result.url) {
    //         return response.payload.result.url;// 🔹 Retorna la URL de la imagen
            
    //     }
    //     return null;
    // }

    // //-- Guardamos formulario en BD incluso la ruta de la imagen
    // const onSubmit = async (formData) => {

    //     try {
            
    //         //-Cargamos la imagen a cloudinary
    //         if(isRegister) {
    //             const imageUrl = await uploadImageCloudinary(); //-Esperamos a que se suba la imagen para obtener la URL
    //             if (imageUrl) {
    //                 formData.profileImage = imageUrl; // Agregar la URL de la imagen al formulario
    //             }
    //         }

    //         const action = isRegister ? registerUser : loginUser;
            
    //         await dispatch(action(formData)).then(
    //             (data) => {
    //                 toast(data.payload.message)
    //                 if (data.payload.success) {
    //                     reset(); //reseteamos el formulario
    //                     if (isRegister) {
    //                         setImageFile(null); // Resetear imagen
    //                         setActiveTab('login'); // Cambiar a pestaña de Login
    //                     } else { // login
    //                         dispatch(changeOpen(false))
    //                     }
    //                 }; 
    //             }
    //         )
    //     } catch (error) {
    //         console.error("Error:", error);
    //         alert(error.message || `Error al ${isRegister ? "registrar" : "iniciar sesión"} el usuario`);
    //     }
    // };

    return (
        <>
            <DialogHeader className="mb-4">
                <DialogTitle className="text-center text-black">
                    {
                        isRegister ? "Registrar Usuario" : "Iniciar Sesion"
                    }
                </DialogTitle>
            </DialogHeader>

            {/* -- Formulario */}
            <FormLoginRegister
                isRegister={isRegister} 
                setActiveTab={setActiveTab}
            />
        
        </>
    )
}