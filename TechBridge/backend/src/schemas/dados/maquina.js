import { z } from 'zod';
import { helperCodigo } from '../helpers/helperCodigo.js';

// CÓDIGO DE MÁQUINA
export const cod_maquina = helperCodigo('Código da máquina');

// CÓDIGO DE SETOR
export const cod_setor = helperCodigo('Código da máquina');

// NOME
export const nome = z
    .string({
        required_error: 'O nome é obrigatório',
        invalid_type_error: 'O nome deve ser um texto'
    })
    .trim()
    .min(1, 'O nome deve ter no mínimo 1 carácteres')
    .max(150, 'O nome deve ter no máximo 150 carácteres');

// DESCRICAO
export const descricao = z
    .string({
        invalid_type_error: 'A descrição deve ser um texto'
    })
    .trim()
    .max(300, 'A descrição pode ter no máximo 300 carácteres');
