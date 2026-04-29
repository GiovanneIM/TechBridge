import { email, nome, senha, tipo_usuario } from "../../dados/usuario";


// ESQUEMA DE CRIAÇÃO DE USUÁRIO
export const createUserSchema = z.object({
    nome: nome,
    email: email,
    senha: senha,
    tipo_usuario: tipo_usuario
}).strict();