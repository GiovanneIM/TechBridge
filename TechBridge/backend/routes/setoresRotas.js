import express from 'express';
import SetoresController from '../controllers/SetoresController.js';

const router = express.Router();

// Listar chamados
router.get('/', SetoresController.listarSetores)

router.get('/:id', SetoresController.listarSetores)

router.post('/', SetoresController.criarSetor)

router.patch('/:id', SetoresController.atualizarSetor)

export default router;
