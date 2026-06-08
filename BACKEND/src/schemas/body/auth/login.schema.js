import z from "zod";
import { email, senha } from "../../dados/usuario.js";


export const loginUserSchema = z.object({
    email: email,
    senha: senha
}).strict();