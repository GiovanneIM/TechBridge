import { z } from 'zod';
import { helperSenha } from '../helpers/helperSenha';
import { helperId } from '../helpers/helperId';

// ID DO USUÁRIO
export const id_usuario = helperId('ID do usuário');

// E-MAIL
export const email = z
    .string({
        required_error: 'O e-mail é obrigatório',
        invalid_type_error: 'O e-mail deve ser um texto'
    })
    .trim()
    .max(255, 'O e-mail pode ter no máximo 255 carácteres')
    .toLowerCase()
    .pipe(
        z.email({ error: 'Formato de e-mail inválido' })
    );

// SENHA
export const senha = helperSenha('senha')

// NOME
export const nome = z
    .string({
        invalid_type_error: 'O nome deve ser um texto'
    })
    .trim()
    .min(3, 'O nome deve ter no mínimo 3 carácteres')
    .max(255, 'O nome pode ter no máximo 255 carácteres');

// BIO
export const bio = z
    .string({
        invalid_type_error: 'A biografia deve ser um texto'
    })
    .trim()
    .max(300, 'O biografia pode ter no máximo 300 carácteres');

// TELEFONE
export const telefone = z
    .string({ invalid_type_error: 'O telefone deve ser um texto' })
    .trim()
    .regex(/^\d{10,11}$/, 'Telefone deve conter 10 ou 11 números');

// SENHA ATUAL
export const senhaAtual = helperSenha('senha atual')

// SENHA ATUAL
export const senhaNova = helperSenha('nova senha')

// ID DO CARGO
export const tipo_usuario = helperId('ID do cargo')