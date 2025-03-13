import { PropertyCard } from "@/components/property/property-card/PropertyCard";
import { Button } from "@/components/ui/button";
import { useTipoOperacionPropiedad } from "@/config/useTipoOperacionPropiedad";
import { useLoadFilters } from "@/hooks/useLoadFilters";
import { setFilterType } from "@/store/filters-slice";
import { setSort } from "@/store/paginationSort-Slice";
import { setOpenFilters } from "@/store/sideBarSlice";
import { ChevronsRight } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const HomePage = () => {

  const dispatch = useDispatch()
  const { propertysList } = useSelector((state) => state.propertys); //- propiedades cargadas de los filtros
  const { typeOptions } = useTipoOperacionPropiedad(); 
 
 useLoadFilters() //-hook de carga de filtros

 //-Cargamos propiedades desde el inicio, solo 4 por que tenemos limit en el back
  useEffect(() => {
    dispatch(setSort({ sort: "createdAt", order: "desc" }))
  }, [dispatch])

  useEffect(() => {
      dispatch(setOpenFilters(true)); //- Abrimos los filtros de busqueda
  }, [dispatch])

  const handleSeeAllProperties = () => {
    // Extraemos todos los IDs de tipo de propiedad
    const allPropertyTypes = typeOptions.values.map(item => item.id); 
    // Dispatch para establecer los filtros
    dispatch(setFilterType(allPropertyTypes));
  }


  return (
    <div className="flex-col gap-4 space-y-5 ">

      <section className="relative text-center flex z-20 flex-col items-center justify-center py-5 px-6 bg-gradient-to-b from-blue-600 to-white text-white overflow-hidden">
        <div className="absolute inset-0 z-10 bg-black/50 "></div> 
        <img className="absolute object-center w-full" src="images/home/banner1.jpg"/>

        <div className="relative z-10 space-y-5">

          <div className="bg-black/20 py-2 px-10" >
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg textShadow ">
              Compra, vende, alquila o permuta!
            </h1>
            <h2 className="text-2xl md:text-4xl font-semibold mt-4 drop-shadow-md textShadow ">
              Todo en un solo lugar
            </h2>
          </div>
         
            <Button 
              className="rounded-none p-6 bg-yellow-400 hover:bg-yellow-300"
              onClick={handleSeeAllProperties}
            >
              <span className="font-extrabold text-lg text-black">VER TODAS LAS PROPIEDADES</span>
            </Button>

        </div>
      </section>


      <section className="px-4 pb-4">
        <div className="flex py-2 gap-2 items-center border-y border-gray-200">
          <ChevronsRight className="text-blue-500"/>
          <h2 className="text-xl  font-bold tracking-widest">Nuevos Ingresos</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-4 justify-items-center ">
            {
                propertysList.length ? propertysList.map((item) => 
                    <PropertyCard 
                        key={item._id}
                        property={item}
                    />
                ) : <h1 className="col-span-full text-center text-gray-600 text-xl flex justify-center items-center h-40">
                        No se encontraron propiedades con esos filtros
                    </h1>
            }
        </div>
      </section>

    </div>
  );
};
