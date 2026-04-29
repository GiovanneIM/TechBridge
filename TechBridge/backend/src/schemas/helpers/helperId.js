import { z } from 'zod';

export const helperId = (
    nomeCampo = 'ID',
    obrigatorio = true
) => {
    let schema = z.coerce
        .number({
            required_error: `${nomeCampo} é obrigatório`,
            invalid_type_error: `${nomeCampo} deve ser um número`
        })
        .int(`${nomeCampo} deve ser um número inteiro`)
        .positive(`${nomeCampo} deve ser maior que zero`);

    if (!obrigatorio) {
        schema = schema.optional();
    }

    return schema;
};