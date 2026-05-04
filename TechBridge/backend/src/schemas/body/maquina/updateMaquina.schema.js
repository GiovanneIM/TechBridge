import { z } from 'zod';
import { cod_maquina, descricao, nome } from '../../dados/maquina';

// ESQUEMA DE CRIAÇÃO DE MÁQUINA
export const createMaquinaSchema = z.object({
    nome: nome.optional(),
    cod_setor: cod_maquina.optional(),
    descricao: descricao.optional()
}).strict();
