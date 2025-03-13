import { useEffect, useRef, useState } from "react";
import { Input } from "../../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { User, X } from "lucide-react";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";

export const ImageUpload = ({ imageFile, setImageFile, profileImage }) => { //- profileImage es la imagen si es que editamos y la traemos de la BD
    // Referencia para el input de archivo (para activarlo desde un botón si es necesario)
    const inputRef = useRef(null);
    const [preview, setPreview] = useState(imageFile ? URL.createObjectURL(imageFile) : profileImage || null); // Previsualización de la imagen (URL del archivo seleccionado)
    const [error, setError] = useState(""); // Errores al seleccionar un archivo

    //-- Evita que el navegador abra el archivo al arrastrarlo sobre el área
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    //-- Maneja el evento cuando se suelta un archivo en el área de carga
    const handleDrop = (e) => {
        e.preventDefault(); // Prevenir el comportamiento predeterminado del navegador
        const droppedFile = e.dataTransfer.files?.[0]; // Obtener el primer archivo arrastrado // e.dataTransfer es un objeto que almacena los archivos arrastrados.
        validateAndSetImage(droppedFile); // Validar y almacenar la imagen
    };

    //-- Maneja la selección de un archivo desde el input de tipo "file"
    const handleImageFileChange = (e) => {
        const selectedFile = e.target.files?.[0]; // Obtener el primer archivo seleccionado
        validateAndSetImage(selectedFile); // Validar y almacenar la imagen
    };

    //-- Función para validar el archivo seleccionado
    const validateAndSetImage = (file) => {
        if (!file) return; // Si no hay archivo, salir de la función
        // Verifica si el archivo es una imagen (JPG o PNG)
        if (!file.type.startsWith("image/")) {
            setError("El archivo debe ser una imagen (JPG, PNG).");
            return;
        }
        // Verifica si el tamaño del archivo es mayor a 2MB
        if (file.size > 2 * 1024 * 1024) {
            setError("El tamaño máximo es de 2MB.");
            return;
        }
        // Si pasa las validaciones, se guarda el archivo y su previsualización
        setImageFile(file); //- imagen
        setPreview(URL.createObjectURL(file)); //- previsualizacion
        setError(""); // Se limpia cualquier error anterior
    };

    //-- Función para eliminar la imagen seleccionada
    const removeImage = () => {
        setImageFile(null); // Eliminar el archivo almacenado
        setPreview(null); // Eliminar la previsualización
        setError(""); // Limpiar errores
        if (inputRef.current) inputRef.current.value = ""; // Reiniciar el input de archivo
    };

    useEffect(() => {
        return() => {
            if (preview) {
                URL.revokeObjectURL(preview); // Liberar la URL cuando se crea una nueva
            }
        }
    }, [preview])

    return (
        <div
            onDragOver={handleDragOver} // Permitir eventos de arrastrar sobre el área
            onDrop={handleDrop} // Manejar cuando un archivo es soltado
            className="relative mx-auto flex flex-col items-center gap-4 p-2 rounded-lg border-2 border-dashed bg-gray-50 w-full max-w-sm"
        >
            {/* Input oculto para la carga de archivos */}
            <Input
                id="image-upload"
                type="file"
                className="hidden"
                ref={inputRef}
                onChange={handleImageFileChange}
                accept="image/png, image/jpeg" // Solo permite imágenes JPG y PNG
            />

            {preview ? (
                // Si hay una imagen seleccionada, se muestra su previsualización
                <div className="relative ">
                    <Avatar className="w-24 h-24 border border-gray-300 rounded-lg">
                        <AvatarImage src={preview || profileImage || ""} alt="Foto de perfil" className="h-full w-full object-cover"/>
                        <AvatarFallback className="bg-gray-200 text-gray-500">
                        <User className="w-8 h-8" />
                        </AvatarFallback>
                    </Avatar>

                    {/* Botón para eliminar la imagen */}
                    <Button
                        size="icon"
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full"
                        onClick={removeImage}
                        aria-label="Eliminar imagen"
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </div>
            ) : (
                // Si no hay imagen seleccionada, se muestra la opción de carga
                <Label htmlFor="image-upload" className="flex  items-center gap-3 cursor-pointer">
                    <Avatar className="w-16 h-16 border border-gray-300 rounded-lg">
                        <AvatarFallback className="bg-gray-50 text-gray-500">
                        <User className="w-8 h-8" />
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-medium text-gray-700">
                            Foto de perfil o Logo <span className="text-xs text-gray-500">(*Opcional)</span>
                        </p>
                        <span className="text-xs text-gray-500">Formatos: JPG, PNG (máx. 2MB)</span>
                    </div>
                  
                </Label>
            )}

            {/* Mensaje de error si el archivo es inválido */}
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
};
