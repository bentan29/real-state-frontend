export const useTipoOperacionPropiedad = () => {

    const typeOptions = {
        id: 'tipo_propiedad',
        title: 'Tipo de propiedad',
        icon: 'House',
        values: [   
            {title: "Casa", id:"casa"},
            {title: "Apartamento", id:"apartamento"},
            {title: "Duplex", id: "duplex"},
            {title: "Oficina", id: "oficina"},
            {title: "Local Comercial", id: "local_comercial"},
            {title: "Cochera", id: "cochera"},
            {title: "Terreno", id: "terreno"},
            {title: "Campo", id: "campo"},
            {title: "Galpon", id: "galpon"},
        ]
    };
    
    const operationOptions = {
        id: 'operation',
        title: 'Operación',
        icon: 'Handshake',
        values:[
            {title: "Venta", id : "venta"},
            {title: "Alquiler", id :"alquiler"},
            {title: "Permuta", id: "permuta"},
        ]
    };
    

    return {
        typeOptions,
        operationOptions
    }
}

