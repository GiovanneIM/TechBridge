import express from 'express';
import ChamadosController from '../controllers/Chamados.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// LISTAR POR ID
router.get('/:id_chamado', ChamadosController.obterPorID);

// CRIAR
router.post('/:id_maquina', ChamadosController.chamar);

// ATENDER
router.patch('/:id_chamado/atender', ChamadosController.atender);

// CONCLUIR
router.patch('/:id_chamado/concluir', ChamadosController.concluir);

// EDITAR (🔴 ESSA É A SUA ROTA DO FRONT)
router.patch(
    '/:id_chamado',
    authMiddleware,
    ChamadosController.editar
);

// EXCLUIR
router.delete('/:id_chamado', authMiddleware, ChamadosController.excluir);

// DASHBOARD
router.post(
    '/dashboard',
    ChamadosController.obterDashboard
)

export default router;