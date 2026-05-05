import { z } from 'zod';
import { id_empresa } from "../dados/empresa.js";
import { cod_maquina } from "../dados/maquina.js";
import { cod_setor } from "../dados/setor.js";

// • ID DA EMPRESA
// • CÓDIGO DO SETOR
// • CÓDIGO DA MÁQUINA
export const params_EmpresaMaquina = z.object({
    id_empresa: id_empresa,
    cod_setor: cod_setor,
    cod_maquina: cod_maquina
}).strict();