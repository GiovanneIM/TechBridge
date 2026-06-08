import { z } from 'zod';
import { id_empresa } from "../dados/empresa.js";

// • ID DA EMPRESA
export const params_Empresa = z.object({
    id_empresa: id_empresa
}).strict();