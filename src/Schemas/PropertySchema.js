import { z } from "zod";

export const PropertySchema = z.object({
        images: z.array(
            z.object({
                url: z.string().url("Debe ser una URL válida"),
                publicId: z.string().min(1, "El publicId es obligatorio")
            })
        ).optional(),
        title: z.string()
            .min(3, "El título debe tener al menos 3 caracteres")
            .max(30, "El título no puede tener más de 30 caracteres"),
        description: z.string().min(10, "La descripción debe tener al menos 10 caracteres").optional(),
        type: z.enum(["casa", "apartamento", "duplex", "oficina", "local_comercial", "cochera", "terreno", "campo", "galpon"])
            .refine(value => value, { message: "El tipo de propiedad es obligatorio" }),
        operation: z.enum(["venta", "alquiler", "permuta"])
            .refine(value => value, { message: "El tipo de operación es obligatorio" }),
        price: z.coerce.number()
            .min(1, "El precio debe ser mayor a 0"),
        currency: z.enum(["USD", "EUR", "ARS"], {
            errorMap: () => ({ message: "La moneda seleccionada no es válida" })
        }),
        location: z.object({
            address: z.string().optional(),
            city: z.string(),
            province: z.string(),
            country: z.string().optional(),
        }),
        features: z.object({
            bedrooms: z.coerce.number().optional(),
            bathrooms: z.coerce.number().optional(),
            area: z.coerce.number().optional(),
            builtArea: z.coerce.number().optional(),
            garage: z.boolean().default(false).optional(),
        }),
        status: z.enum(["disponible", "reservado", "vendido", "alquilado"])
            .default("disponible")
            .optional(),
        listedBy: z.enum(["propietario", "inmobiliaria"], {
            errorMap: () => ({ message: "Debe seleccionar si es dueño o inmobiliaria" })
        }).optional(),
});




