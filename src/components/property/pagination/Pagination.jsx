import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { setPage } from "@/store/paginationSort-Slice";
import { useDispatch, useSelector } from "react-redux";

export const PaginationDemo = ({ limit, total }) => {

    const dispatch = useDispatch()
    const { page } = useSelector((state) => state.paginationSort);

    const totalPages = Math.ceil(total / limit);

    // Calcula las páginas visibles según la página actual.
    const getVisiblePages = (currentPage, totalPages) => {
        const pages = [];
        const start = Math.max(1, currentPage - 1); // Página inicial (2 antes de la actual).
        const end = Math.min(totalPages, currentPage + 1); // Página final (2 después de la actual).
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    const visiblePages = getVisiblePages(page, totalPages);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            dispatch(setPage(page))
        }
    };

    return (
        <Pagination className="py-2 bg-gray-100 border">
            <PaginationContent>

                {/*//* Anterior */}
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                        className={`${page === 1 ? 'text-black/40' : 'cursor-pointer'}`}
                    />
                </PaginationItem>

                {/* //* Puntos ... */}
                {
                    page > 2 && (
                        <PaginationItem>    
                            <PaginationEllipsis/>
                        </PaginationItem>
                    )
                }
        

                {/*//* Paginas Visibles */}
                {
                    visiblePages.map((pageNumber) => (
                        <PaginationItem key={pageNumber}>
                            <PaginationLink
                                isActive={pageNumber === page}
                                onClick={() => handlePageChange(pageNumber)}
                                className={`${pageNumber === page ? 'text-black/40' : 'cursor-pointer'}`}
                            >
                                {pageNumber}
                            </PaginationLink>
                        </PaginationItem>
                    ))
                }

                {/* //*... Puntitos suspensivos al final si no estamos en las últimas páginas */}
                {
                    page < totalPages - 1 && (
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    )   
                }

                
                {/* Botón para página siguiente */}
                <PaginationItem>
                    <PaginationNext
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page === totalPages}
                        className={`${page === totalPages ? 'text-black/40' : 'cursor-pointer'}`}
                    />
                </PaginationItem>
       

            </PaginationContent>
        </Pagination>
    )
}
