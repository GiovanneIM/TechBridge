import z from "zod";
import { email, nome, senha, tipo_usuario } from "../../dados/usuario.js";

export const createUserSchema = z.object({
    nome: nome,
    email: email,
    senha: senha.default('123456'),
    tipo_usuario: tipo_usuario,
    cod_usuario: z.string().min(1, "Código do usuário é obrigatório"),
    telefone: z.string().optional(),
}).strict();