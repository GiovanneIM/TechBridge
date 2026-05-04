import express from 'express';
import SetoresController from '../../controllers/controller_consertar/SetoresController.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';

const router = express.Router();

// Listar chamados
router.get('/', SetoresController.listarSetores)

router.get('/buscar', authMiddleware, SetoresController.listarSetores)

// Listar um setor ESPECÍFICO
router.get('/:idSetor', SetoresController.listarSetor)

export default router;
