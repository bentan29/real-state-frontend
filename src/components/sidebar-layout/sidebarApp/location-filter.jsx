import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SidebarGroup, SidebarGroupLabel, } from "@/components/ui/sidebar";
import { useCiudadesDepartamentos } from "@/config/useCiudadesDepartamentos.js";
import { resetLocationFilters, setFilterCity, setFilterProvince } from "@/store/filters-slice";
import { MapPin, MapPinned, RotateCcw } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

export const LocationFilter = () => {

    const dispatch = useDispatch()
    const {locationFilter} = useSelector((state) => state.filters);

    const { locations } = useCiudadesDepartamentos(); // Traemos las localidades
    // Filtramos las ciudades basandonos en el departamento seleccionado
    const ciudadesDelDepartamento = locations.find(location => location.name === locationFilter.province)?.towns || [];

    // console.log('filterProvince',filterProvince);
    

    const handleResetLocation = () => {
       dispatch(resetLocationFilters()) 
    }


    return (
        <SidebarGroup>

            {/* Oculta el título cuando el sidebar está colapsado */}
            <SidebarGroupLabel className="justify-between">
                <span>Ubicación</span> 
                <span 
                    className=" flex gap-1 cursor-pointer transition duration-200 bg-black hover:text-yellow-400 border border-gray-600 px-2 py-0.5 rounded-md"
                    onClick={()=>handleResetLocation()}
                >
                    <RotateCcw size={15} />
                    Reset Ubi.
                </span>
            </SidebarGroupLabel>

            <div className="space-y-2">

                {/*//---- Primer Select para el Departamento */}
                <Select //
                    asChild
                    value={locationFilter.province} 
                    onValueChange={(value) => { 
                        dispatch(setFilterProvince(value));
                        dispatch(setFilterCity(''));
                    }}
                >
                    <SelectTrigger className="pl-1 border-gray-400">
                        <div>
                            <MapPinned size={20} className="text-gray-500" />
                        </div>
                        <SelectValue  placeholder="Departamento"/>
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Departamento</SelectLabel>
                            {
                                locations.map((location) => (
                                    <SelectItem key={location.id} value={location.name}>
                                        {location.name}
                                    </SelectItem>
                                ))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>

                {/*//---- Segundo Select para la Ciudad (depende del Departamento seleccionado) */}
                <Select 
                    value={locationFilter.city} 
                    onValueChange={(value) =>
                        dispatch(setFilterCity(value))
                        //setCiudad
                    } 
                    disabled={!locationFilter.province}
                >

                    <SelectTrigger className="pl-1 border-gray-400">
                        <div>
                            <MapPin size={20} className="text-gray-500" />
                        </div>
                        <SelectValue  placeholder={locationFilter.province ? "Ciudad" : "Selecciona un departamento"}/>
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Ciudad</SelectLabel>
                            {
                                ciudadesDelDepartamento.length > 0 ? (
                                    ciudadesDelDepartamento.map((town) => (
                                        <SelectItem key={town.id} value={town.name}>
                                            {town.name}
                                        </SelectItem>
                                    ))
                                ) : (
                                    <SelectItem disabled>No hay ciudades disponibles</SelectItem>
                                )
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
    
  
              
              

            
        </SidebarGroup>
    );
};
