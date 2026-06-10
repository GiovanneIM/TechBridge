import { z } from 'zod';
import { cod_maquina, descricao, nome } from '../../dados/maquina.js';

export const updateMaquinaSchema = z.object({
    nome: nome.optional(),
    descricao: descricao.optional(),
    status: z.enum(['ativa', 'inativa', 'em_manutencao', 'arquivada']).optional(),
}).strict();