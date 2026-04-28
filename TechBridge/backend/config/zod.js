import { z } from 'zod';

const PAGINACAO_LIMITE_MAXIMO = Number(process.env.PAGINACAO_LIMITE_MAXIMO) || 100;
const PAGINACAO_LIMITE_PADRAO = Number(process.env.PAGINACAO_LIMITE_PADRAO) || 10;

const estadosValidos = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
    'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
    'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

// PAGINAÇÃO
export const paginacaoSchema = z.object({
    page: z.coerce.number().int()
        .min(1)
        .default(1),

    limit: z.coerce.number().int()
        .min(1)
        .max(PAGINACAO_LIMITE_MAXIMO)
        .default(PAGINACAO_LIMITE_PADRAO)
})
    .strict();

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =


// ESQUEMA DE LOGIN
export const loginUserSchema = z.object({
    email: z
        .string({
            required_error: 'O e-mail é obrigatório',
            invalid_type_error: 'O e-mail deve ser um texto'
        })
        .trim()
        .max(255, 'O e-mail pode ter no máximo 255 carácteres')
        .toLowerCase()
        .pipe(
            z.email({ error: 'Formato de e-mail inválido' })
        ),

    senha: z
        .string({
            required_error: 'A senha é obrigatória',
            invalid_type_error: 'A senha deve ser um texto'
        })
        .min(6, 'A senha dever ter no mínimo 6 dígitos')
}).strict();

// ESQUEMA DE ATUALIZAÇÃO DE USUÁRIO (Exceto senha e foto)
export const updateUserSchema = z.object({
    nome: z
        .string({
            invalid_type_error: 'O nome deve ser um texto'
        })
        .trim()
        .min(3, 'O nome deve ter no mínimo 3 carácteres')
        .max(255, 'O nome pode ter no máximo 255 carácteres')
        .optional(),

    email: z
        .string({
            invalid_type_error: 'O e-mail deve ser um texto'
        })
        .trim()
        .max(255, 'O e-mail pode ter no máximo 255 carácteres')
        .toLowerCase()
        .pipe(
            z.email({ error: 'Formato de e-mail inválido' })
        )
        .optional(),

    bio: z
        .string({
            invalid_type_error: 'A biografia deve ser um texto'
        })
        .trim()
        .max(300, 'O biografia pode ter no máximo 300 carácteres')
        .optional(),

    telefone: z
        .string({ invalid_type_error: 'O telefone deve ser um texto' })
        .trim()
        .regex(/^\d{10,11}$/, 'Telefone deve conter 10 ou 11 números')
        .optional()

})
    .strict()
    .refine(data => Object.keys(data).length > 0, {
        message: 'Informe ao menos um campo para atualização'
    });

// ESQUEMA DE ATUALIZAÇÃO DE USUÁRIO (Senha)
export const updateSenhaSchema = z.object({
    senhaAtual: z
        .string({
            required_error: 'A senha atual é obrigatória',
            invalid_type_error: 'A senha atual deve ser um texto'
        })
        .min(6, 'A senha atual deve ter no mínimo 6 carácteres')
        .max(255, 'A senha atual pode ter no máximo 255 carácteres'),

    senhaNova: z
        .string({
            required_error: 'A nova senha é obrigatória',
            invalid_type_error: 'A nova senha deve ser um texto'
        })
        .min(6, 'A nova senha deve ter no mínimo 6 carácteres')
        .max(255, 'A nova senha pode ter no máximo 255 carácteres')
}).strict();


// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =


// ESQUEMA DE CRIAÇÃO DE USUÁRIO
export const createUserSchema = z.object({
    nome: z
        .string({
            required_error: 'O nome é obrigatório',
            invalid_type_error: 'O nome deve ser um texto'
        })
        .trim()
        .min(3, 'O nome deve ter no mínimo 3 carácteres')
        .max(255, 'O nome pode ter no máximo 255 carácteres'),

    email: z
        .string({
            required_error: 'O e-mail é obrigatório',
            invalid_type_error: 'O e-mail deve ser um texto'
        })
        .trim()
        .max(255, 'O e-mail pode ter no máximo 255 carácteres')
        .toLowerCase()
        .pipe(
            z.email({ error: 'Formato de e-mail inválido' })
        ),

    senha: z
        .string({
            required_error: 'A senha é obrigatória',
            invalid_type_error: 'A senha deve ser um texto'
        })
        .min(6, 'A senha deve ter no mínimo 6 carácteres')
        .max(255, 'A senha pode ter no máximo 255 carácteres'),


    tipo_usuario: z
        .number({
            required_error: 'O cargo é obrigatório',
            invalid_type_error: 'O ID do cargo deve ser um inteiro'
        })
        .int()
}).strict()

// ESQUEMA DE CRIAÇÃO DE EMPRESA
export const createEmpresaSchema = z.object({
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
            z.string({
                required_error: 'Número é obrigatório',
                invalid_type_error: 'Número deve ser texto'
            }).min(1, 'Número não pode ser vazio'),

            z.number({
                required_error: 'Número é obrigatório',
                invalid_type_error: 'Número deve ser numérico'
            })
        ]),

        complemento: z
            .string({
                invalid_type_error: 'Complemento deve ser um texto'
            })
            .max(100, 'Complemento deve ter no máximo 100 caracteres')
            .optional(),

        bairro: z
            .string({
                required_error: 'Bairro é obrigatório',
                invalid_type_error: 'Bairro deve ser um texto'
            })
            .trim()
            .min(2, 'Bairro deve ter no mínimo 2 caracteres'),

        cidade: z
            .string({
                required_error: 'Cidade é obrigatória',
                invalid_type_error: 'Cidade deve ser um texto'
            })
            .trim()
            .min(2, 'Cidade deve ter no mínimo 2 caracteres')
            .max(100, 'Cidade deve ter no máximo 100 caracteres'),

        estado: z
            .string({
                required_error: 'Estado é obrigatório',
                invalid_type_error: 'Estado deve ser um texto'
            })
            .length(2, 'Estado deve ter 2 caracteres')
            .transform(val => val.toUpperCase())
            .refine(val => estadosValidos.includes(val), {
                message: 'Estado inválido'
            })
    }),

    gerente: createUserSchema
});

// ESQUEMA DE CRIAÇÃO DE SETOR
export const createSetorSchema = z.object({
    nome: z
        .string({
            required_error: 'O nome é obrigatório',
            invalid_type_error: 'O nome deve ser um texto'
        })
        .trim()
        .min(3, 'O nome deve ter no mínimo 3 carácteres')
        .max(100, 'O nome pode ter no máximo 100 carácteres'),

    cod_setor: z
        .string({
            required_error: 'O código é obrigatório',
            invalid_type_error: 'O código deve ser um texto'
        })
        .trim()
        .max(50, 'O código pode ter no máximo 50 carácteres'),

    descricao: z
        .string({
            invalid_type_error: 'A descrição deve ser um texto'
        })
        .trim()
        .max(255, 'A descrição pode ter no máximo 255 carácteres')
        .optional(),

    icone: z
        .string({
            required_error: 'O icone do setor é obrigatório',
            invalid_type_error: 'O icone do setor deve ser um texto'
        }),

    cor: z
        .string({
            required_error: 'A cor do setor é obrigatória',
            invalid_type_error: 'A cor do setor deve ser um texto'
        })
});

// ESQUEMA DE CRIAÇÃO DE MÁQUINA
export const createMaquinaSchema = z.object({
    nome: z
        .string({
            required_error: 'O nome é obrigatório',
            invalid_type_error: 'O nome deve ser um texto'
        })
        .trim()
        .min(3, 'O nome deve ter no mínimo 3 carácteres')
        .max(100, 'O nome pode ter no máximo 100 carácteres'),

    cod_setor: z
        .string({
            required_error: 'O código é obrigatório',
            invalid_type_error: 'O código deve ser um texto'
        })
        .trim()
        .max(50, 'O código pode ter no máximo 50 carácteres'),

    descricao: z
        .string({
            invalid_type_error: 'A descrição deve ser um texto'
        })
        .trim()
        .max(255, 'A descrição pode ter no máximo 255 carácteres')
        .optional()
});
