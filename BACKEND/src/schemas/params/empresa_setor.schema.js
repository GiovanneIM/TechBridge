import { z } from 'zod';
import { id_empresa } from "../dados/empresa.js";
import { cod_setor } from "../dados/setor.js";

// • ID DA EMPRESA
// • CÓDIGO DO SETOR
export const params_EmpresaSetor = z.object({
    id_empresa: id_empresa,
    cod_setor: cod_setor
}).strict();