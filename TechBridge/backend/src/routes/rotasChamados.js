import express from 'express';
// MIDDLEWARES
import {
    authMiddleware,
    adminMiddleware,
    gerentePrincipalMiddleware,
    gerenteMiddleware
} from '../middlewares/authMiddleware.js';
//CONTROLLER
import ChamadosController from '../controllers/Chamados.js';
// ZOD
import { validateZod } from '../middlewares/validate.js';
import { paginacaoSchema } from '../schemas/query/paginacao.js';
import { params_Empresa } from '../schemas/params/empresa.schema.js';


const router = express.Router();




// LISTAR CHAMADO ESPECÍFICO (POR ID)
router.get(
    '/:id_chamado',
    ChamadosController.obterPorID
)

// CRIAR CHAMADO
router.post(
    '/chamados/:id_maquina',
    ChamadosController.chamar
)

// ATENDER CHAMADO
router.patch(
    '/chamados/:id_chamado/atender',
    () => {}
)

// CONCLUIR CHAMADO
router.patch(
    '/chamados/:id_chamado/concluir',
    () => {}
)

export default router;