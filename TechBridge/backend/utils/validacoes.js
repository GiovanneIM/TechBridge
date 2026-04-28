import { z } from 'zod';

// Regex de email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const estadosValidos = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
    'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
    'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

// ========================
// VALIDAÇÕES MANUAIS
// ========================

export function validarEmail(email) {
    if (typeof email !== "string") {
        return {
            sucesso: false,
            erro: 'Email inválido',
            mensagem: 'O e-mail deve ser um texto'
        };
    }

    email = email.trim();

    if (!email) {
        return {
            sucesso: false,
            erro: 'Email obrigatório',
            mensagem: 'O email é obrigatório'
        };
    }

    if (!emailRegex.test(email)) {
        return {
            sucesso: false,
            erro: 'Email inválido',
            mensagem: 'Formato de email inválido'
        };
    }

    if (email.length > 255) {
        return {
            sucesso: false,
            erro: 'Email inválido',
            mensagem: 'O e-mail pode ter no máximo 255 caracteres'
        };
    }

    return { sucesso: true };
}

export function validarSenha(senha) {
    if (typeof senha !== "string") {
        return {
            sucesso: false,
            erro: 'Senha inválida',
            mensagem: 'A senha deve ser um texto'
        };
    }

    senha = senha.trim();

    if (!senha) {
        return {
            sucesso: false,
            erro: 'Senha obrigatória',
            mensagem: 'A senha é obrigatória'
        };
    }

    if (senha.length < 6) {
        return {
            sucesso: false,
            erro: 'Senha inválida',
            mensagem: 'A senha deve ter no mínimo 6 caracteres'
        };
    }

    return { sucesso: true };
}

export function validarNome(nome) {
    if (typeof nome !== "string") {
        return {
            sucesso: false,
            erro: 'Nome inválido',
            mensagem: 'O nome deve ser um texto'
        };
    }

    nome = nome.trim();

    if (!nome) {
        return {
            sucesso: false,
            erro: 'Nome obrigatório',
            mensagem: 'O nome é obrigatório'
        };
    }

    if (nome.length > 255) {
        return {
            sucesso: false,
            erro: 'Nome inválido',
            mensagem: 'O nome pode ter no máximo 255 caracteres'
        };
    }

    return { sucesso: true };
}

export function validarEmpresa(empresa) {
    const {
        cnpj,
        razao_social,
        nome_fantasia,
        cep,
        rua,
        complemento,
        bairro,
        cidade,
        estado
    } = empresa;

    // (Você ainda pode implementar regras aqui se quiser)

    return { sucesso: true };
}

// ========================
// SCHEMAS ZOD
// ========================

// LOGIN
export const userLogin = z.object({
    email: z
        .string({
            required_error: 'O e-mail é obrigatório',
            invalid_type_error: 'O e-mail deve ser um texto'
        })
        .trim()
        .min(1, 'O e-mail não pode estar vazio')
        .max(255, 'O e-mail pode ter no máximo 255 caracteres')
        .email('Formato de e-mail inválido')
        .transform(val => val.toLowerCase()),

    senha: z
        .string({
            required_error: 'A senha é obrigatória',
            invalid_type_error: 'A senha deve ser um texto'
        })
        .min(6, 'A senha deve ter no mínimo 6 dígitos')
}).strict();

// CRIAÇÃO DE USUÁRIO (placeholder)
export const createuser = z.object({});

// CRIAÇÃO DE EMPRESA
export const createEmpresa = z.object({
    cnpj: z
        .string({
            required_error: 'CNPJ é obrigatório',
            invalid_type_error: 'CNPJ deve ser um texto'
        })
        .transform(val => val.replace(/\D/g, ''))
        .refine(val => val.length === 14, {
            message: 'CNPJ deve ter 14 dígitos'
        }),

    razao_social: z
        .string({
            required_error: 'Razão social é obrigatória',
            invalid_type_error: 'Razão social deve ser um texto'
        })
        .trim()
        .min(3, 'Razão social deve ter no mínimo 3 caracteres')
        .max(200, 'Razão social deve ter no máximo 200 caracteres'),

    nome_fantasia: z
        .string({
            required_error: 'Nome fantasia é obrigatório',
            invalid_type_error: 'Nome fantasia deve ser um texto'
        })
        .trim()
        .min(2, 'Nome fantasia deve ter no mínimo 2 caracteres')
        .max(100, 'Nome fantasia deve ter no máximo 100 caracteres'),

    endereco: z.object({
        cep: z
            .string({
                required_error: 'CEP é obrigatório',
                invalid_type_error: 'CEP deve ser um texto'
            })
            .transform(val => val.replace(/\D/g, ''))
            .refine(val => val.length === 8, {
                message: 'CEP deve ter 8 dígitos'
            }),

        rua: z
            .string({
                required_error: 'Rua é obrigatória',
                invalid_type_error: 'Rua deve ser um texto'
            })
            .trim()
            .min(3, 'Rua deve ter no mínimo 3 caracteres')
            .max(150, 'Rua deve ter no máximo 150 caracteres'),

        numero: z.union([
            z.string().min(1, 'Número não pode ser vazio'),
            z.number()
        ]),

        complemento: z
            .string()
            .max(100, 'Complemento deve ter no máximo 100 caracteres')
            .optional(),

        bairro: z
            .string({
                required_error: 'Bairro é obrigatório'
            })
            .trim()
            .min(2, 'Bairro deve ter no mínimo 2 caracteres'),

        cidade: z
            .string({
                required_error: 'Cidade é obrigatória'
            })
            .trim()
            .min(2, 'Cidade deve ter no mínimo 2 caracteres')
            .max(100, 'Cidade deve ter no máximo 100 caracteres'),

        estado: z
            .string({
                required_error: 'Estado é obrigatório'
            })
            .length(2, 'Estado deve ter 2 caracteres')
            .transform(val => val.toUpperCase())
            .refine(val => estadosValidos.includes(val), {
                message: 'Estado inválido'
            })
    }),

    gerente: z.object({}).optional()
});