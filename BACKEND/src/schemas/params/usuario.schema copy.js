import { z } from 'zod';
import { id_empresa } from "../dados/empresa.js";
import { id_usuario } from '../dados/usuario.js';

// • ID DA EMPRESA
// • ID DO USUÁRIO
export const params_Usuario = z.object({
    id_usuario: id_usuario
}).strict();