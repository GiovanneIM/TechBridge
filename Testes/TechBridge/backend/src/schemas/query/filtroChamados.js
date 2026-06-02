import { z } from 'zod';
import { cod_setor } from '../dados/setor';
import { cod_maquina } from '../dados/maquina';
import { id_usuario } from '../dados/usuario';

const PAGINACAO_LIMITE_MAXIMO = Number(process.env.PAGINACAO_LIMITE_MAXIMO) || 100;
const PAGINACAO_LIMITE_PADRAO = Number(process.env.PAGINACAO_LIMITE_PADRAO) || 10;

// PAGINAÇÃO
export const paginacaoChamadosSchema = z.object({
    page: z.coerce.number().int()
        .min(1)
        .default(1),

    limit: z.coerce.number().int()
        .min(1)
        .max(PAGINACAO_LIMITE_MAXIMO)
        .default(PAGINACAO_LIMITE_PADRAO),

    // FILTROS = = = = = = = = = = = = = = = =

    cod_setor: cod_setor.optional,
    cod_maquina: cod_maquina.optional,
    id_tecnico: id_usuario.optional,

    // DATAS = = = = = = = = = = = = = = = =

    datahora_abertura: z.object({
        de: z.coerce.date().optional(),
        ate: z.coerce.date().optional(),
    }).optional(),

    datahora_atendimento: z.object({
        de: z.coerce.date().optional(),
        ate: z.coerce.date().optional(),
    }).optional(),

    datahora_conclusao: z.object({
        de: z.coerce.date().optional(),
        ate: z.coerce.date().optional(),
    }).optional(),
    
}).strict();
