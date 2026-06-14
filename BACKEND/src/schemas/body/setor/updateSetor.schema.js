import { z } from 'zod';
import { cod_setor, cor_fundo, cor_texto, descricao, icone, nome } from '../../dados/setor.js';

// ESQUEMA DE CRIAÇÃO DE SETOR
export const updateSetorSchema = z.object({
    nome: nome.optional(),
    cod_setor: cod_setor.optional(),
    descricao: descricao.optional(),

    icone: icone.optional(),
    cor_fundo: cor_fundo.optional(),
    cor_texto: cor_texto.optional(),
})
    .strict()
    .refine(data => Object.keys(data).length > 0, {
        message: 'Informe ao menos um campo para atualização'
    });