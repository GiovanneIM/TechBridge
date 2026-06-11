import { z } from 'zod';

const PAGINACAO_LIMITE_MAXIMO = Number(process.env.PAGINACAO_LIMITE_MAXIMO) || 100;
const PAGINACAO_LIMITE_PADRAO = Number(process.env.PAGINACAO_LIMITE_PADRAO) || 10;

// PAGINAÇÃO
export const paginacaoSchema = z.object({
    page: z.coerce.number().int()
        .min(1)
        .default(1),

    limit: z.coerce.number().int()
        .min(1)
        .max(PAGINACAO_LIMITE_MAXIMO)
        .default(PAGINACAO_LIMITE_PADRAO),


    nome_empresa: z.string().optional(),
    status: z.string().optional(),
    estado: z.string().optional(),
    texto: z.string().optional(),
    cargo: z.string().optional(),
}).strict();
