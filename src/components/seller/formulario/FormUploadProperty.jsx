import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CarrouselImages } from "../formulario/CarrouselImages";
import { useDispatch, useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PropertySchema } from "@/Schemas/PropertySchema";
import { useCiudadesDepartamentos } from "@/config/useCiudadesDepartamentos";
import { createProperty, updateProperty, uploadPropertyImages } from "@/store/auth/crud-property-slice/thunk";
import { toast } from "sonner";
import { setOpenPropertyDialog } from "@/store/auth/openDialog-slice";
import { useEffect } from "react";
import { useTipoOperacionPropiedad } from "@/config/useTipoOperacionPropiedad";

export const FormUploadProperty = ({ imageFiles, setImageFiles, propertyToEdit, refreshProperties }) => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { typeOptions, operationOptions} = useTipoOperacionPropiedad();
    
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
      resolver: zodResolver(PropertySchema),
    });
    
    //--Establecemos los valores del formulario a editar si es que llegan
    useEffect(() => {
        if(propertyToEdit) {
            Object.keys(propertyToEdit).forEach((key) => {
                setValue(key, propertyToEdit[key]);
            });
        }
    }, [propertyToEdit, setValue])
    
    const { locations } = useCiudadesDepartamentos();
    const selectedProvince = watch("location.province");
    const cities = locations.find(loc => loc.name === selectedProvince)?.towns || [];
  
    // -- Función para manejar la subida de las imágenes
    const uploadImageCloudinary = async () => {
        if (imageFiles.length === 0) return [];
        const formData = new FormData();
        imageFiles.forEach(file => {
            //metemos cada una de las imágenes en el formData
            formData.append('my_files', file);
        });
        const response = await dispatch(uploadPropertyImages(formData))
        if (response.payload && response.payload.result) {
            return response.payload.result; //-- Retorna[{ url, publicId }, ...]
        }
        return [];
    } 

    //--- Guardamos formulario
    const onSubmit = async (formData) => {
        try {
            let imageUrls = formData.images || [];  //si es que tenemos ya imágenes la mantenemos
            
            //---Esperamos a que se suban las imágenes para obtener las URLs
            const uploadUrls = await uploadImageCloudinary()
            if (uploadUrls.length > 0) {
                imageUrls = [...imageUrls, ...uploadUrls];  //-- Agrega las nuevas imágenes a las existentes
            }

            formData.images = imageUrls; //- Agregamos las URL de imágenes
            formData.owner = user._id;

            const action = propertyToEdit ? updateProperty : createProperty;

            const payload = propertyToEdit ? {id:propertyToEdit?._id, formData} : formData;          

            await dispatch(action(payload)).then((data) => {
                toast(data.payload.message);
                if (data.payload.success) {
                    dispatch(setOpenPropertyDialog(false))
                    refreshProperties()
                }
            })

        } catch (error) {
            console.error('Error al subir imagen:', error)
            alert(error.message || 'Error al subir la propiedad');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">

            <div className="px-10 overflow-hidden">
                <CarrouselImages 
                    imageFiles={imageFiles} 
                    setImageFiles={setImageFiles} 
                    propertyImages={propertyToEdit?.images || []} 
                />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                    <div className="relative">
                        <Input 
                            {...register("title")}
                            placeholder={errors.title ? errors.title.message : `Título de la propiedad`}
                            className={`border bg-blue-50 border-blue-200 h-8 ${errors.title ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 placeholder-gray-500 ${errors.title ? 'placeholder-red-500' : ''}`} 
                        />
                    </div>
                    
                    <div className="relative">
                        <Select onValueChange={(value) => setValue("type", value)} defaultValue={propertyToEdit?.type || ""}>
                            <SelectTrigger className={`h-8 bg-blue-50 border ${errors.type ? "border-red-500 bg-red-50" : "border-blue-500"}`}>
                                <SelectValue placeholder={errors.type ? errors.type.message : "Tipo de Propiedad"} />
                            </SelectTrigger>
                            <SelectContent >
                                {typeOptions.values.map(option => (
                                    <SelectItem key={option.id} value={option.id}>
                                        {option.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="relative">
                        <Select onValueChange={(value) => setValue("operation", value)} defaultValue={propertyToEdit?.operation || ""}>
                             <SelectTrigger className={`h-8 bg-blue-50 border ${errors.operation ? "border-red-500 bg-red-50" : "border-blue-500"}`}>
                                <SelectValue placeholder={errors.operation ? errors.operation.message : "Operación"} />
                            </SelectTrigger>
                            <SelectContent>
                                {operationOptions.values.map(option => (
                                    <SelectItem key={option.id} value={option.id}>
                                        {option.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="relative">
                        <Select onValueChange={(value) => setValue("location.province", value)} defaultValue={propertyToEdit?.location.province || ""}>
                            <SelectTrigger className={`h-8 bg-blue-50 border ${errors.location?.province ? "border-red-500 bg-red-50" : "border-blue-500"}`}>
                                <SelectValue placeholder={errors.location?.province ? errors.location?.province.message : "Provincia"} />
                            </SelectTrigger>
                            <SelectContent>{locations.map(loc => <SelectItem key={loc.id} value={loc.name}>{loc.name}</SelectItem>)}</SelectContent>
                        </Select>
                    </div>

                    <div className="relative">
                        <Select onValueChange={(value) => setValue("location.city", value)} disabled={!selectedProvince} defaultValue={propertyToEdit?.location.city || ""}>
                            <SelectTrigger className={`h-8 bg-blue-50 border ${errors.location?.city ? "border-red-500 bg-red-50" : "border-blue-500"}`}>
                                <SelectValue placeholder={errors.location?.city ? errors.location?.city.message : "Ciudad"} />
                            </SelectTrigger>
                            <SelectContent>{cities.map(city => <SelectItem key={city.id} value={city.name}>{city.name}</SelectItem>)}</SelectContent>
                        </Select>
                    </div>

                    <div className="relative">
                        <Input 
                            {...register("location.address")} 
                            placeholder={errors.location?.address ? errors.location?.address.message : `Dirección`}
                            className={`border bg-blue-50 border-blue-200 h-8 ${errors.location?.address ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 placeholder-gray-500 ${errors.location?.address ? 'placeholder-red-500' : ''}`} 
                        />
                    </div>
                </div>
                
                <div className="space-y-3">
                    <div className="relative">
                        <Input 
                            type="number" 
                            {...register("features.bedrooms")} 
                            placeholder={errors.features?.bedrooms ? errors.features?.bedrooms.message : "Habitaciones"} 
                            className={`border bg-blue-50 border-blue-200 h-8 ${errors.features?.bedrooms  ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 placeholder-gray-500 ${errors.features?.bedrooms ? 'placeholder-red-500' : ''}`} 
                        />
                    </div>
                    
                    <div className="relative">
                        <Input 
                            type="number" 
                            {...register("features.bathrooms")} 
                            placeholder={errors.features?.bathrooms ? errors.features?.bathrooms.message : "Baños"} 
                            className={`border bg-blue-50 border-blue-200 h-8 ${errors.features?.bathrooms ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 placeholder-gray-500 ${errors.features?.bathrooms ? 'placeholder-red-500' : ''}`} 
                        />
                    </div>

                    <div className="relative">
                        <Input 
                            type="number" 
                            {...register("features.area")} 
                            placeholder={errors.features?.area ? errors.features?.area.message : "Área total en m²"} 
                            className={`border bg-blue-50 border-blue-200 h-8 ${errors.features?.area ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 placeholder-gray-500 ${errors.features?.area ? 'placeholder-red-500' : ''}`} 
                        />
                    </div>

                    <div className="relative">
                        <Input 
                            type="number" 
                            {...register("features.builtArea")} 
                            placeholder={errors.features?.builtArea ? errors.features?.builtArea.message : "Área construida en m²"} 
                            className={`border bg-blue-50 border-blue-200 h-8 ${errors.features?.builtArea ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 placeholder-gray-500 ${errors.features?.builtArea ? 'placeholder-red-500' : ''}`} 
                        />
                    </div>

                    <div className="relative flex items-center space-x-2">
                        <Checkbox id="garage" checked={watch("features.garage")} onCheckedChange={(value) => setValue("features.garage", !!value)} />
                        <label htmlFor="garage">Garage</label>
                    </div>

                    <div className="relative">
                        <Select onValueChange={(value) => setValue("status", value)} defaultValue={propertyToEdit?.status || ""}>
                            <SelectTrigger className="h-8 bg-blue-50 border-blue-500">
                                <SelectValue placeholder={errors.status ? errors.status.message : "Estado"} />
                            </SelectTrigger>
                            <SelectContent>{["disponible", "vendido"].map(option => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
            
            <div className="relative">
                <Textarea 
                    {...register("description")} 
                    placeholder={errors.description ? errors.description.message : "Descripción"} 
                    className={`border bg-blue-50 border-blue-200  ${errors.description ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 placeholder-gray-500 ${errors.description ? 'placeholder-red-500' : ''}`} 
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                    <Input 
                        type="number" 
                        {...register("price")} 
                        placeholder={errors.price ? errors.price.message : "Precio"} 
                        className={`border bg-blue-50 border-blue-200 h-8 ${errors.price ? 'border-red-500 bg-red-50' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 placeholder-gray-500 ${errors.price ? 'placeholder-red-500' : ''}`} 
                    />
                </div>

                <div className="relative">
                    <Select onValueChange={(value) => setValue("currency", value)} defaultValue={propertyToEdit?.currency || ""}>
                    <SelectTrigger className={`h-8 bg-blue-50 border ${errors.currency ? "border-red-500 bg-red-50" : "border-blue-500"}`}>
                            <SelectValue placeholder={errors.currency ? errors.currency.message : "Moneda"} />
                        </SelectTrigger>
                        
                        <SelectContent>{["USD", "EUR", "ARS"].map(option => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent>
                    </Select>
                </div>
            </div>
            
            <Button type="submit" className="w-full">
            {
                propertyToEdit ? 'Editar' : 'Subir Propiedad'
            }
            </Button>
        </form>
    );
};

