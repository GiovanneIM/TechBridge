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


// CHAMADOS

// LISTAR CHAMADOS DE UMA EMPRESA
router.get(
    '/empresas/:id_empresa/chamados',
    validateZod(paginacaoSchema, 'query'),      // Query - Paginação
    validateZod(params_Empresa, 'params'),      // Params - ID da empresa
    () => {}
)

// LISTAR CHAMADO ESPECÍFICO
router.get(
    '/chamados/:id_chamado',
    () => {}
)

// CRIAR CHAMADO
router.post(
    '/chamados',
    () => {}
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
