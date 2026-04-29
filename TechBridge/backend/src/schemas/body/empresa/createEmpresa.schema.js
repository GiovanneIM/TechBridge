import { cnpj, endereco, nome_fantasia, razao_social } from "../../dados/empresa";
import { createUserSchema } from "../user/createUser.schema";


// ESQUEMA DE CRIAÇÃO DE EMPRESA
export const createEmpresaSchema = z.object({
    cnpj: cnpj,
    razao_social: razao_social,
    nome_fantasia: nome_fantasia,
    endereco: endereco,
    gerente: createUserSchema
}).strict(); 