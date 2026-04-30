import { z } from 'zod';
import { cod_maquina, descricao, nome } from '../../dados/maquina';

// ESQUEMA DE CRIAÇÃO DE MÁQUINA
export const createMaquinaSchema = z.object({
    nome: nome,
    cod_setor: cod_maquina,
    descricao: descricao
})
    .strict()
    .refine(data => Object.keys(data).length > 0, {
        message: 'Informe ao menos um campo para atualização'
    });; 