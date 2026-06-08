import { senhaAtual, senhaNova } from "../../dados/usuario";

// ESQUEMA DE ATUALIZAÇÃO DE USUÁRIO (Senha)
export const updateSenhaSchema = z.object({
    senhaAtual: senhaAtual,
    senhaNova: senhaNova
}).strict();
