import express from 'express';
import ChamadosController from '../controllers/ChamadosController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Listar todos chamados
router.post('/buscar', authMiddleware, ChamadosController.listarChamados)

// Obter um chamado específico
router.get('/:id', authMiddleware, ChamadosController.listarChamado)

// Criar um chamado
router.post('/', ChamadosController.criarChamado)

// Atualizar um chamado
router.patch('/:id', ChamadosController.atualizarChamado)

// Atualizar um chamado para em andamento
router.patch('/:id/atender', ChamadosController.atenderChamado)

// Atualizar um chamado para atendido
router.patch('/:id/concluir', ChamadosController.concluirChamado)


// Obter dados para o dashboard
router.post('/dashboard', authMiddleware, ChamadosController.obterDashboard)

export default router;
