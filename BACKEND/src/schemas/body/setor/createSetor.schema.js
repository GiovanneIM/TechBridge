import { z } from 'zod';
import { cod_setor, cor, cor_fundo, cor_texto, descricao, icone, nome } from '../../dados/setor.js';

// ESQUEMA DE CRIAÇÃO DE SETOR
export const createSetorSchema = z.object({
    nome: nome,
    cod_setor: cod_setor,
    descricao: descricao,

    icone: icone,
    cor_fundo: cor_fundo,
    cor_texto: cor_texto,
}).strict();