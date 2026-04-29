import { email, senha } from "../../dados/usuario";


export const loginUserSchema = z.object({
    email: email,
    senha: senha
}).strict();