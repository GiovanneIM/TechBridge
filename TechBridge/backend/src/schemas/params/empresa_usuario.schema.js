import { z } from 'zod';
import { id_empresa } from "../dados/empresa.js";
import { cod_usuario } from '../dados/usuario.js';

// • ID DA EMPRESA
// • CÓDIGO DO USUÁRIO
export const params_EmpresaUsuario = z.object({
    id_empresa: id_empresa,
    cod_usuario: cod_usuario
}).strict();