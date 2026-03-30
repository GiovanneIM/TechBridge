import express from 'express';
import SetoresController from '../controllers/SetoresController.js';

const router = express.Router();

// Listar chamados
router.get('/', SetoresController.listarSetores)

export default router;
