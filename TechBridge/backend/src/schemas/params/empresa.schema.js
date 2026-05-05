import { z } from 'zod';
import { id_empresa } from "../dados/empresa.js";
import { id_usuario } from '../dados/usuario.js';

// • ID DA EMPRESA
export const params_Empresa = z.object({
    id_empresa: id_empresa,
    id_usuario: id_usuario
}).strict();