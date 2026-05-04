import express from 'express';
import MaquinasController from '../controllers/MaquinasController.js';

const router = express.Router();

// Listar chamados
router.get('/', MaquinasController.listarMaquinas)

router.get('/:id', MaquinasController.listarMaquinas)

router.post('/', MaquinasController.criarMaquina)

router.patch('/:id', MaquinasController.atualizarMaquina)

export default router;
