import { z } from 'zod';

// ESQUEMA DE CRIAÇÃO DE SETOR
export const createSetorSchema = z.object({
    nome: z
        .string({
            required_error: 'O nome é obrigatório',
            invalid_type_error: 'O nome deve ser um texto'
        })
        .trim()
        .min(3, 'O nome deve ter no mínimo 3 carácteres')
        .max(100, 'O nome pode ter no máximo 100 carácteres'),

    cod_setor: z
        .string({
            required_error: 'O código é obrigatório',
            invalid_type_error: 'O código deve ser um texto'
        })
        .trim()
        .max(50, 'O código pode ter no máximo 50 carácteres'),

    descricao: z
        .string({
            invalid_type_error: 'A descrição deve ser um texto'
        })
        .trim()
        .max(255, 'A descrição pode ter no máximo 255 carácteres')
        .optional(),

    icone: z
        .string({
            required_error: 'O icone do setor é obrigatório',
            invalid_type_error: 'O icone do setor deve ser um texto'
        }),

    cor: z
        .string({
            required_error: 'A cor do setor é obrigatória',
            invalid_type_error: 'A cor do setor deve ser um texto'
        })
}).strict();