import { z } from 'zod';
import { helperId } from '../helpers/helperId.js';


const estadosValidos = [
    'AC', 'AP', 'AM', 'PA', 'RO', 'RR', 'TO',
    'AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE',
    'DF', 'GO', 'MT', 'MS',
    'ES', 'MG', 'RJ', 'SP',
    'PR', 'RS', 'SC'
];


// ID DA EMPRESA
export const id_empresa = helperId('ID da empresa');

// CNPJ
export const cnpj = z
    .string({
        required_error: 'CNPJ é obrigatório',
        invalid_type_error: 'CNPJ deve ser um texto'
    })
    .transform(val => val.replace(/\D/g, ''))
    .refine(val => val.length === 14, {
        message: 'CNPJ deve ter 14 dígitos'
    });

// RAZÃO SOCIAL
export const razao_social = z
    .string({
        required_error: 'Razão social é obrigatória',
        invalid_type_error: 'Razão social deve ser um texto'
    })
    .trim()
    .min(3, 'Razão social deve ter no mínimo 3 caracteres')
    .max(200, 'Razão social deve ter no máximo 200 caracteres');

// NOME FANTASIA
export const nome_fantasia = z
    .string({
        required_error: 'Nome fantasia é obrigatório',
        invalid_type_error: 'Nome fantasia deve ser um texto'
    })
    .trim()
    .min(2, 'Nome fantasia deve ter no mínimo 2 caracteres')
    .max(200, 'Nome fantasia deve ter no máximo 200 caracteres')

// ENDEREÇO
export const cep = z
    .string({
        required_error: 'CEP é obrigatório',
        invalid_type_error: 'CEP deve ser um texto'
    })
    .transform(val => val.replace(/\D/g, ''))
    .refine(val => val.length === 8, {
        message: 'CEP deve ter 8 dígitos'
    })

export const rua = z
    .string({
        required_error: 'Rua é obrigatória',
        invalid_type_error: 'Rua deve ser um texto'
    })
    .trim()
    .min(3, 'Rua deve ter no mínimo 3 caracteres')
    .max(150, 'Rua deve ter no máximo 150 caracteres');

export const numero = z.union([
    z.string({
        required_error: 'Número é obrigatório',
        invalid_type_error: 'Número deve ser texto'
    }).min(1, 'Número não pode ser vazio'),

    z.number({
        required_error: 'Número é obrigatório',
        invalid_type_error: 'Número deve ser numérico'
    })
]).transform(val => String(val));


export const complemento = z
    .string({
        invalid_type_error: 'Complemento deve ser um texto'
    })
    .max(100, 'Complemento deve ter no máximo 100 caracteres')
    .optional();

export const bairro = z
    .string({
        required_error: 'Bairro é obrigatório',
        invalid_type_error: 'Bairro deve ser um texto'
    })
    .trim()
    .min(2, 'Bairro deve ter no mínimo 2 caracteres')
    .max(100, 'Bairro deve ter no máximo 100 caracteres');


export const cidade = z
    .string({
        required_error: 'Cidade é obrigatória',
        invalid_type_error: 'Cidade deve ser um texto'
    })
    .trim()
    .min(2, 'Cidade deve ter no mínimo 2 caracteres')
    .max(100, 'Cidade deve ter no máximo 100 caracteres');

export const estado = z
    .string({
        required_error: 'Estado é obrigatório',
        invalid_type_error: 'Estado deve ser um texto'
    })
    .length(2, 'Estado deve ter 2 caracteres')
    .transform(val => val.toUpperCase())
    .refine(val => estadosValidos.includes(val), {
        message: 'Estado inválido'
    });




export const endereco = z.object({
    cep,
    rua,
    numero,
    complemento,
    bairro,
    cidade,
    estado
});