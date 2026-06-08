import z from "zod";
import { cnpj, endereco, nome_fantasia, razao_social } from "../../dados/empresa.js";
import { createUserSchema } from "../user/createUser.schema.js";


// ESQUEMA DE CRIAÇÃO DE EMPRESA
export const createEmpresaSchema = z.object({
    empresa: z.object({
        nome_fantasia: nome_fantasia,
        razao_social: razao_social,
        cnpj: cnpj,
        endereco: endereco
    }),
    gerente: createUserSchema
}).strict(); 