import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";



export const CarouselImages = ({images}) => {
    return (
        <Carousel className="relative w-full mx-auto bg-gray-500">
            {/* Contenido del Carrusel */}
            <CarouselContent>

                {
                    images && images.map((image, index) => (
                        <CarouselItem key={index} className="flex justify-center items-center bg-gray-100 h-[550px]">
                            <img 
                                src={image} 
                                className="h-full bg-gray-500 object-cover"/>
                        </CarouselItem>
                    ))
                }

            </CarouselContent>

            {/* Botones de navegación */}
            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
        </Carousel>
    );
};
