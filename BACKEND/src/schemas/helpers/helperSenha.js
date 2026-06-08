import { z } from 'zod';

export const helperSenha = (
    nomeCampo = 'senha'
) => {
    let schema = z
        .string({
            required_error: `A ${nomeCampo} é obrigatória`,
            invalid_type_error: `A ${nomeCampo} deve ser um texto`
        })
        .min(6, `A ${nomeCampo} deve ter no mínimo 6 carácteres`)
        .max(255, `A ${nomeCampo} pode ter no máximo 255 carácteres`)


    return schema;
};