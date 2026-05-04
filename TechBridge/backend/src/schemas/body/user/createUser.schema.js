import z from "zod";
import { email, nome, senha, tipo_usuario } from "../../dados/usuario.js";


// ESQUEMA DE CRIAÇÃO DE USUÁRIO
export const createUserSchema = z.object({
    nome: nome,
    email: email,
    senha: senha.default('123456'),
    tipo_usuario: tipo_usuario
}).strict();