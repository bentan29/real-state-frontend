import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BedDouble, Toilet, MapPin } from "lucide-react"

export const SideBarRelatorPropertys = () => {

    const { propertyDetails } = useSelector((state) => state.propertys)
    const { relatorPropertysList } = useSelector((state) => state.relator)

    const propiedadesFiltradas = relatorPropertysList?.filter((propiedad) => propiedad._id !== propertyDetails?._id)

    return (
        <div className="p-2">

            <div className="flex gap-2 text-muted-foreground mb-2">
                <h2 className="text-md font-bold">Mas</h2>
            </div>

            <div className="grid space-y-2">
                {propiedadesFiltradas && propiedadesFiltradas.map((propiedad) => (
                    <Link key={propiedad?._id} to={`/propertyDetails/${propiedad?._id}`} > 
                        <div
                            className="grid grid-cols-3 rounded-md shadow-md overflow-hidden bg-white text-gray-700 "
                        >
                            {/* Imagen */}
                            <img
                                src={propiedad.images?.[0]}
                                alt={propiedad.title}
                                className="col-span-1 w-full h-full object-cover"
                            />
                            
                            {/* Información */}
                            <div className="col-span-2 px-2 py-1 justify-center overflow-hidden flex flex-col">
                                <p className="font-extrabold">{propiedad.title}</p>
                                <div className="flex items-center gap-0.5">
                                    <MapPin size={13} />
                                    <p className="text-sm font-semibold">{propiedad.location.province}</p>
                                </div>
                                <p className="text-sm font-semibold">${propiedad.price}</p>
                                <div className="flex gap-2">
                                    <div className="flex items-center gap-0.5">
                                        <p className="text-xs">2</p>
                                        <BedDouble size={13}/>
                                    </div>
                                    <div className="flex items-center gap-0.5">
                                        <p className="text-xs">2</p>
                                        <Toilet size={12}/>
                                    </div>
                                    <div className="flex items-center gap-0.5">
                                        <p className="text-xs">20000</p>
                                        <p className="text-xs">m²</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

     
        </div>
    );
};
