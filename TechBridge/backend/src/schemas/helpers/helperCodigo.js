import { z } from 'zod';

export const helperCodigo = (
    nomeCampo,
    obrigatorio = true
) => {
    let schema = z
        .string({
            required_error: `${nomeCampo} é obrigatório`,
            invalid_type_error: `${nomeCampo} deve ser um texto`
        })
        .trim()
        .min(1, `${nomeCampo} não pode estar vazio`);

    if (!obrigatorio) {
        schema = schema.optional();
    }

    return schema;
}