import express from 'express';
import ChamadosController from '../controllers/ChamadosController.js';

const router = express.Router();

// Listar chamados
router.get('/', ChamadosController.listarChamados)

router.get('/:id', ChamadosController.listarChamado)

router.post('/', ChamadosController.criarChamado)

router.patch('/:id', ChamadosController.atualizarChamado)

export default router;
