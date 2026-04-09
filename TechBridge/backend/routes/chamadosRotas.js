import express from 'express';
import ChamadosController from '../controllers/ChamadosController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Listar chamados
router.post('/buscar', authMiddleware, ChamadosController.listarChamados)

router.get('/:id', authMiddleware, ChamadosController.listarChamado)

router.post('/', ChamadosController.criarChamado)

router.patch('/:id', ChamadosController.atualizarChamado)

// Obter dados para o dashboard
router.post('/dashboard', authMiddleware, ChamadosController.obterDashboard)

export default router;
