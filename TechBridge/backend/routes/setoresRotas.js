import express from 'express';
import SetoresController from '../controllers/SetoresController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Listar chamados
router.get('/', SetoresController.listarSetores)

router.get('/buscar', authMiddleware, SetoresController.listarSetores)

export default router;
