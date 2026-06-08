import z from "zod";
import { cnpj, endereco, nome_fantasia, razao_social } from "../../dados/empresa.js";
import { createUserSchema } from "../user/createUser.schema.js";


// ESQUEMA DE CRIAÇÃO DE EMPRESA
export const updateEmpresaSchema = z.object({
    nome_fantasia: nome_fantasia.optional(),
    razao_social: razao_social.optional(),
    cnpj: cnpj.optional(),
    endereco: endereco.optional()
})
    .strict()
    .refine(data => Object.keys(data).length > 0, {
        message: 'Informe ao menos um campo para atualização'
    });; 