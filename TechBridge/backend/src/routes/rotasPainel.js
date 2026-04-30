import express from 'express';
import PainelController from '../controllers/PainelController.js';

const router = express.Router();

// Atualizar informações do usuário (Exceto senha e foto)
router.get("/", PainelController.conectar);

// Listar chamados
router.get("/chamados", PainelController.obterChamados);

// Rotas OPTIONS para CORS (preflight requests)
router.options('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
});


export default router;
