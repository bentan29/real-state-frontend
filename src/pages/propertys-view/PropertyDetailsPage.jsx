
import { CarouselImages } from "@/components/property/carousel/CarouselImages";
import { Button } from "@/components/ui/button";
import useRelatorFilters from "@/hooks/useRelatorPropertys";
import { saveFavourite } from "@/store/auth/favourite-slice/thunk";
import { setOpenLoginDialog } from "@/store/auth/openDialog-slice";
import { resetPropertyDetails } from "@/store/propertys-slice";
import { getPropertyDetails } from "@/store/propertys-slice/thunk";
import { setCurrentPage, setOpenFilters } from "@/store/sideBarSlice";
import { BedDouble, Toilet, DollarSign, MapPin, Heart, Car, ChevronRight } from "lucide-react"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

export const PropertyDetailsPage = () => {
    const dispatch = useDispatch()
    const { propertyDetails } = useSelector((state) => state.propertys)
    const { user } = useSelector((state) => state.auth)
    const { id } = useParams();

    useEffect(() => {
        dispatch(setCurrentPage('propertyDetails'))
        dispatch(getPropertyDetails(id)) //-- Tomamos la propiedad seleccionada
        return () => {
            dispatch(resetPropertyDetails()); //-- Quitamos la propiedad del store al salir 
            dispatch(setCurrentPage(''))
        };
    }, [dispatch, id])

    useEffect(() => {
        dispatch(setOpenFilters(false)); //- Cerramos los filtros de busqueda
    }, [dispatch])

    
    //- Guardamos en favoritos la propiedad
    const handleSaveFavourite = () => {
        if(!user){
            alert("Debes Iniciar sesion, o Registrarte para Guardar")
            dispatch(setOpenLoginDialog(true)) //- Abrimos el dialog de Login/Register
            return
        }
        if(user) {
            dispatch(saveFavourite({
                userId: user?._id, 
                propertyId: propertyDetails?._id
            })).then((data) => {toast(data.payload.message);})
        }
    }
    
    //- Tomamos todas las propiedades de este vendedor 
    useRelatorFilters(propertyDetails?.owner?._id, 4);  

    
    return (
        <div className="mx-auto">

            <div className="grid grid-cols-1 gap-4 py-2">
                
                {/* Carrusel de imágenes */}
                <div>
                    <CarouselImages images={propertyDetails?.images}/>
                </div>

                {/* Información de la propiedad */}
                <div className="mx-3 md:p-3 border bg-slate-50 border-slate-300 flex flex-col space-y-4">

                    <div className="grid lg:grid-cols-2 space-y-8 lg:space-y-0">
                        {/* Cantidad dormitorios baños m2.construidos  */}
                        <div className="flex gap-4 flex-wrap">
                            <div className="flex items-center gap-2 bg-gray-300 p-2 rounded-lg">
                                <span>{propertyDetails?.features.bedrooms}</span>
                                <BedDouble size={18}/>
                            </div>
                            <div className="flex items-center gap-2 bg-gray-300 p-2 rounded-lg">
                                <span>{propertyDetails?.features.bathrooms}</span>
                                <Toilet size={18}/>
                            </div>
                            <div className="flex flex-col justify-center items-center bg-gray-300 p-2 rounded-lg">
                                <p className="text-md ">Construidos</p>
                                <p className="leading-none">{propertyDetails?.features.builtArea}m²</p>
                            </div>
                            <div className="flex flex-col justify-center items-center bg-gray-300 p-2 rounded-lg ">
                                <p className="text-md">Totales</p>
                                <p className="leading-none">{propertyDetails?.features.area}m²</p>
                            </div>
                            <div className="justify-center items-center bg-gray-300 p-2 rounded-lg">
                                <p className="text-md">Cochera</p>
                                <div className="flex gap-2 items-center">
                                    <span className="leading-none">{propertyDetails?.features.garage ? 'Si' : 'No'}</span>
                                    <Car />
                                </div>
                            </div>
                        </div>

                        {/* Precio, Ubicacion y guardar */}
                        <div className="flex flex-wrap items-center justify-around">
                            <div className="flex items-center border border-black/50 rounded-md p-2">
                                <DollarSign size={28}/>
                                <h1 className="text-3xl font-extrabold text-gray-900">{propertyDetails?.price}</h1>
                            </div>
                            <Button 
                                onClick={handleSaveFavourite}
                                className=" h-10 "
                            >
                                <Heart />
                                Guardar
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <MapPin size={28} />
                        <div className="flex flex-col">
                            <span>{propertyDetails?.location.address}</span>
                            <span>{propertyDetails?.location.province}, {propertyDetails?.location.city}</span>
                        </div>
                    </div>
              

                    <div className="space-y-4">
                        {/* Tipo / operacion / disponible / vendida por */}
                        <div className="flex gap-2 flex-wrap">
                            <h2 className="capitalize text-xl mb-2 border border-green-600 bg-green-300 rounded-md px-2 w-fit">{propertyDetails?.type}</h2>
                            <h2 className="capitalize text-xl mb-2 border border-red-600 bg-red-300 rounded-md px-2 w-fit">{propertyDetails?.operation}</h2>
                            <h2 className="capitalize text-xl mb-2 border border-black rounded-md px-2 w-fit">{propertyDetails?.status}</h2>
                            {
                                propertyDetails?.owner?.listedBy &&
                                <h2 className="capitalize text-xl mb-2 border border-blue-600 bg-blue-300 rounded-md px-2 w-fit">{propertyDetails?.owner?.listedBy}</h2>
                            }
                        </div>
                        {/* Titulo y descripcion */}
                        <div>
                            <h3 className="text-lg text-gray-600">Titulo</h3>
                            <h1 className="text-2xl flex items-center"><ChevronRight size={13}/>{propertyDetails?.title}</h1>
                        </div>
                        <div>
                            <h3 className="text-lg text-gray-600">Descripción</h3>
                            <p className="text-2xl flex items-center"><ChevronRight size={13}/>{propertyDetails?.description}</p>
                        </div>
                        
                    </div>
                </div>


                {/* Datos del Agente o Propietario */}
                <div className="mx-3 grid grid-cols-2 border bg-white p-2 mb-8 gap-2">

                    <div className="flex flex-col items-end justify-around">
                        <div className="text-start">
                            <h2 className="text-xl font-extrabold text-gray-700">Publicada por</h2>
                            <p className="text-lg">{propertyDetails?.owner.name}</p>
                            <p className="text-lg">{propertyDetails?.owner.contact.phone}</p>
                            <p className="text-lg">{propertyDetails?.owner.contact.email}</p>
                        </div>
                        <Link to={`/relator/${propertyDetails?.owner._id}`} className="bg-blue-800 border rounded-lg hover:bg-blue-900 text-white border-blue-400 py-1 px-2">
                            Ver Propiedades
                        </Link>
                    </div>

                    <div className="max-h-52 max-w-80 flex justify-start">
                        <img 
                            src={propertyDetails?.owner.profileImage}
                            className="bg-white object-contain max-w-full max-h-full"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};
