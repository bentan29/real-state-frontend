import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(3, "El nombre debe tener al menos 3 caracteres").max(30, "Máximo 30 caracteres"),
    profileImage: z.string().url("Debe ser una URL válida").optional(), // URL de la imagen
    contact: z.object({
        email: z.string().email("Correo inválido").min(1, "El correo electrónico es obligatorio"),
        phone: z.string().max(20, "El teléfono no puede superar los 20 caracteres").optional(),
        address: z.string().max(200, "La dirección no puede superar los 200 caracteres").optional(),
    }).default({ phone: "", address: "" }),
    password: z.string().min(6, "Minimo 6 caracteres").max(30, "Máximo 30 caracteres"),
});

export const editUserSchema  = z.object({
    name: z.string().min(3, "El nombre debe tener al menos 3 caracteres").max(30, "Máximo 30 caracteres"),
    profileImage: z.string().url("Debe ser una URL válida").optional(), // URL de la imagen
    contact: z.object({
        email: z.string().email("Correo inválido"),
        phone: z.string().max(20, "El teléfono no puede superar los 20 caracteres").optional(),
        address: z.string().max(200, "La dirección no puede superar los 200 caracteres").optional(),
    }).default({ phone: "", address: "" }), // 🔹 Garantiza que contact siempre tenga valores
    listedBy: z.enum(['propietario', 'inmobiliaria', 'agente']).nullable().optional().default(null),
});

export const loginSchema = z.object({
    contact: z.object({
        email: z.string().email("Correo inválido"),
    }),
    password: z.string().min(6, "Minimo 6 caracteres").max(30, "Máximo 30 caracteres"),
});
