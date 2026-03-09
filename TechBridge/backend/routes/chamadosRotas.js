import express from 'express';
import ChamadosController from '../controllers/ChamadosController.js';

const router = express.Router();

// LISTAR TODOS OS CHAMADOS
router.get('/', ChamadosController.listarTodosChamados)

export default router;