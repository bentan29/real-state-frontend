export const useCantidadFiltros = () => {

    const featuresQuantityFilter = [
        {
            id: 'bathroomsFilter',
            name: 'Baños',
            icon : 'Toilet',
            min : 0,
            max : 12
        },
        {
            id: 'bedroomsFilter',
            name: 'Dormitorios',
            icon : 'BedDouble',
            min : 0,
            max : 12
        },
        {
            id: 'areaTotalFilter',
            name: 'Area Total',
            icon : 'Scaling',
            min : 0,
            max : 200000
        },
        {
            id: 'builtAreaFilter',
            name: 'Area Construida',
            icon : 'ImageUpscale',
            min : 0,
            max : 200000
        },
        {
            id: 'priceFilter',
            name: 'Precio',
            icon : 'DollarSign',
            min : 0,
            max : 50000000
        },
    ]

    return {
        featuresQuantityFilter
    }
}
