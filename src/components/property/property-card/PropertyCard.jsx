import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BedDouble, Toilet, DollarSign, MapPin, Settings, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ConfirmDeleteDialog } from "./ConfirmDeleteDialog";
import { useState } from "react";
import { setOpenPropertyDialog } from "@/store/auth/openDialog-slice";
import { setPropertyToEdit } from "@/store/auth/crud-property-slice";

export const PropertyCard = ({ property, refreshProperties }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [open, setOpen] = useState(false)
    const { currentPage } = useSelector((state) => state.sideBarOptions);

    const handleDelete = () => {
        setOpen(true)
    }

    const handleEdit = (property) => {   
        //-cargamos la propiedad a editar, que vamos a tomar en el dialog de cargar propiedad
        dispatch(setPropertyToEdit(property)) 
        dispatch(setOpenPropertyDialog(true));  
    }

    return (
        <div className="relative">

            { currentPage === 'sellerPage' && user?._id && user?._id === property?.owner?._id && (
                <div className="absolute grid right-0 bg-white/30 rounded-tr-md  p-1 gap-0.5 z-50 ">
                    
                    <Button 
                        className="h-7 px-2 text-sm font-xs gap-1 rounded-none"
                        onClick={()=>handleEdit(property)}
                    >
                        <Settings/>
                        Editar
                    </Button>

                    <Button 
                        className="h-7 px-2 text-sm gap-1 rounded-none" 
                        variant="destructive"
                        onClick={handleDelete}
                    >
                        <Trash2/>
                        Eliminar
                    </Button>

                </div>  
            )}
  
               
            <Card className="rounded-md border-black/30 min-w-[250px] max-w-[350px] w-full ">
                <Link to={`/propertyDetails/${property._id}`}>     
                    {/* Imagen */}
                    <div className="relative">
                        <img
                            src={`${property?.images[0] ? property?.images[0] : '/images/casa.jpeg'}`}
                            className="w-full aspect-[4/3] object-cover rounded-t-md"
                            alt="Imagen de la propiedad"
                        />

                        <div className="absolute flex bottom-0">
                            <p className="text-sm border border-green-600 bg-green-300 shadow shadow-black py-0.5 px-3 w-fit capitalize">
                                {property?.type}
                            </p>
                            <p className="text-sm border border-red-600 bg-red-300 shadow shadow-black  py-0.5 px-3 w-fit capitalize">
                                {property?.operation}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white shadow">
                        {/* Información principal */}
                        <CardHeader className="pt-3 pb-2 px-2 space-y-1 border-b border-black/50 border-dashed 100">
                            <CardTitle className="flex items-center">
                                <h2 className="text-md capitalize">{property?.title}</h2>
                            </CardTitle>

                            <div className="flex items-center font-bold text-lg">
                                <DollarSign size={20} />
                                <span className="text-xl">{property.price}</span>
                            </div>

                            <CardDescription className="flex items-center gap-1 text-sm text-gray-600">
                                <MapPin size={18} />
                                <span className="">{property.location.province},</span>
                                <span>{property.location.city}</span>
                            </CardDescription>
                        </CardHeader>

                        {/* Características */}
                        <CardContent className="p-2 mt-1 grid grid-cols-2 gap-1">
                            <div className="grid grid-cols-1 space-y-1 text-sm justify-center">
                                {/* Habitaciones y baños */}
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-md">
                                        <span>{property.features.bedrooms}</span>
                                        <BedDouble size={18} />
                                    </div>
                                    <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-md">
                                        <span>{property.features.bathrooms}</span>
                                        <Toilet size={18} />
                                    </div>
                                    {/* Áreas */}
                                    <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-md">
                                        <span className="block font-bold">{property.features.builtArea}m²</span>
                                        <span className="text-xs">Construidos</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-md">
                                        <span className="block font-bold">{property.features.area}m²</span>
                                        <span className="text-xs">Totales</span>
                                    </div>
                                </div>
                            </div>

                            <div className="justify-content-center items-center justify-center text-center ">
                                <p className="text-xs">Publicado por..</p>
                                <span className="text-sm justify-center font-bold py-0 block">{property.owner.name}</span>
                                <img
                                    className=" h-auto max-h-16 object-cover mx-auto"
                                    src={property.owner.profileImage}
                                />
                            </div>

                        </CardContent> 
                    </div>    
                </Link>  
            </Card>

            {/* Dialog de confirmacion de elimnar */}
            <ConfirmDeleteDialog
                id={property._id}
                open={open} 
                setOpen={setOpen}
                refreshProperties={refreshProperties}
            />
                     
        </div>
    );
};
