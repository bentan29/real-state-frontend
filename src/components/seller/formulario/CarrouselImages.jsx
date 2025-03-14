import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ImagePlus, X } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function CarrouselImages({ imageFiles, setImageFiles, propertyImages }) {
    const [preview, setPreview] = useState(propertyImages || []); // Guardamos las URLs de las imágenes seleccionadas
    
    ///----- Al cargar una imagen
    const handleImageFileChange = (e, index) => {
        const selectedFile = e.target.files?.[0]; //- tomamos de una imagen
        if(selectedFile) {
            const validImage = validateAndSetImage(selectedFile);
            if(validImage) {
                //Actualizamos el preview en la poscicion correcta
                const newPreview = [...preview];
                newPreview[index] = validImage;
                setPreview(newPreview);
            }

            //- Guardamos el archivo en imagesFiles
            const newImageFiles = [...imageFiles]; //- Tomamos las que ya tenemos cargadas
            newImageFiles[index] = selectedFile; //- En el index que cargamos otra la ubicamos
            setImageFiles(newImageFiles); //- Metemos todas las imagenes
        }
    }

    ///----- Validamos cada imagen
    const validateAndSetImage = (file) => {
        if(!file) return;
        // Verifica si el archivo es una imagen (JPG o PNG)
        if (!file.type.startsWith("image/")) {
            alert("El archivo debe ser una imagen (JPG, PNG).");
            return null;
        }
        // Verifica si el tamaño del archivo es mayor a 2MB
        if (file.size > 2 * 1024 * 1024) {
            alert("El tamaño máximo es de 2MB.");
            return null;
        }
        return URL.createObjectURL(file); // URL para previsualizar
    }

    ///----- Borramos cada imagen
    const handleRemoveImage = (index) => {
        const newPreview = [...preview];
        newPreview.splice(index, 1); // Elimina la imagen del preview
        setPreview(newPreview);

        const newImageFiles = [...imageFiles];
        newImageFiles.splice(index, 1); // Elimina la imagen del array de archivos
        setImageFiles(newImageFiles)
    }

    return (
        <Carousel
            opts={{align: "start", }}
            className="w-full sm:max-w-xs max-w-xs mx-auto"
        >
            <CarouselContent>
                {Array.from({ length: 8 }).map((_, index) => {
                    const isDisabled = index != 0 && !preview[index - 1];// Solo habilitado si el anterior tiene imagen
                    return (
                        <CarouselItem key={index} className="basis-1/3">
                            <div className="p-1">
                                <Card className="rounded-lg w-full h-ful">
                                    <CardContent className="relative aspect-square w-full h-full overflow-hidden">
                                    
                                        <Label 
                                            htmlFor={`image-upload-${index}`}
                                            className={`cursor-pointer ${isDisabled ? "pointer-events-none" : ""}`}
                                        >
                                            {preview[index] ? (
                                                <img  //- Mostramos cada imagen
                                                    src={preview[index]} alt={`Imagen ${index + 1}`} 
                                                    className="object-cover absolute inset-0 p-0.5 rounded-lg" 
                                                />
                                            ) : ( 
                                                <ImagePlus  //- Icono de agregar imagen 
                                                    strokeWidth={1.50}
                                                    className={`absolute inset-0 w-full h-full ${isDisabled ? 'text-gray-200 ' : 'text-gray-600'} transition-all hover:text-gray-800 hover:shadow-lg`} 
                                                />)
                                            }
                                        </Label>

                                        {/* Boton para eliminar cada imagen (solo si hay una imagen) */}
                                        {preview[index] && (
                                            <Button
                                                variant="ghost"
                                                size="xs"
                                                className="z-40 absolute top-0 right-0 bg-red-900 text-white p-1 rounded-full hover:bg-red-600 hover:text-red-200"
                                                onClick={() => handleRemoveImage(index)}
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        )}

                                        <Input
                                            id={`image-upload-${index}`}
                                            type="file"
                                            className="hidden"
                                            onChange={(e) =>handleImageFileChange(e, index)}
                                            accept="image/png, image/jpeg"
                                            multiple
                                            disabled={isDisabled} // Solo habilitado si el anterior tiene imagen
                                        />

                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    )
                })}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
  )
}
