import { z } from 'zod';
import { cod_maquina, descricao, nome } from '../../dados/maquina.js';

// ESQUEMA DE CRIAÇÃO DE MÁQUINA
export const updateMaquinaSchema = z.object({
    nome: nome.optional(),
    cod_setor: cod_maquina.optional(),
    descricao: descricao.optional()
}).strict();
