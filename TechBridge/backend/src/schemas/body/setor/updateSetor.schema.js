import { z } from 'zod';
import { cod_setor, cor, descricao, icone, nome } from '../../dados/setor';

// ESQUEMA DE CRIAÇÃO DE SETOR
export const createSetorSchema = z.object({
    nome: nome.optional(),
    cod_setor: cod_setor.optional(),
    descricao: descricao.optional(),

    icone: icone.optional(),
    cor: cor.optional()
})
    .strict()
    .refine(data => Object.keys(data).length > 0, {
        message: 'Informe ao menos um campo para atualização'
    });