import { z } from 'zod';
import { helperCodigo } from '../helpers/helperCodigo.js';


// CÓDIGO DE SETOR
export const cod_setor = helperCodigo('Código do setor');

// NOME
export const nome = z
    .string({
        required_error: 'O nome do setor é obrigatório',
        invalid_type_error: 'O nome deve ser um texto'
    })
    .trim()
    .min(1, 'O nome do setor deve ter no mínimo 1 carácteres')
    .max(150, 'O nome do setor deve ter no máximo 150 carácteres');

// DESCRICAO
export const descricao = z
    .string({
        invalid_type_error: 'A descrição deve ser um texto'
    })
    .trim()
    .max(300, 'A descrição do setor pode ter no máximo 300 carácteres');

// ICONE
export const icone = z
    .string({
        required_error: 'Icone é obrigatório',
        invalid_type_error: 'Icone deve ser um texto'
    })
    .min(1, 'O Icone deve ter ao menos 1 caráctere')

// COR DE FUNDO
export const cor_fundo = z
    .string({
        required_error: 'Cor é obrigatório',
        invalid_type_error: 'Cor deve ser um texto'
    })
    .min(1, 'A cor deve ter ao menos 1 caráctere')

// COR DE TEXTO
export const cor_texto = z
    .string({
        required_error: 'Cor é obrigatório',
        invalid_type_error: 'Cor deve ser um texto'
    })
    .min(1, 'A cor deve ter ao menos 1 caráctere')

