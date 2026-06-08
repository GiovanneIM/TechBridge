import { z } from 'zod';
import { cod_setor, cor, descricao, icone, nome } from '../../dados/setor.js';

// ESQUEMA DE CRIAÇÃO DE SETOR
export const createSetorSchema = z.object({
    nome: nome,
    cod_setor: cod_setor,
    descricao: descricao,
    
    icone: icone,
    cor: cor
}).strict();