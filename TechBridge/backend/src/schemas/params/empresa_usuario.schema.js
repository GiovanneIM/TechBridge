import { z } from 'zod';
import { id_empresa } from "../dados/empresa";
import { id_usuario } from '../dados/usuario';

// • ID DA EMPRESA
// • ID DO USUÁRIO
export const params_EmpresaUsuario = z.object({
    id_empresa: id_empresa,
    id_usuario: id_usuario
}).strict();