import { bio, email, nome, telefone } from "../../dados/usuario";

// ESQUEMA DE ATUALIZAÇÃO DE USUÁRIO (Exceto senha e foto)
export const updateUserSchema = z.object({
    nome: nome.optional(),
    email: email.optional(),
    bio: bio.optional(),
    telefone: telefone.optional()
})
    .strict()
    .refine(data => Object.keys(data).length > 0, {
        message: 'Informe ao menos um campo para atualização'
    });
