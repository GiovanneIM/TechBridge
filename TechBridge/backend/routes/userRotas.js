import express from 'express';
import UserController from '../controllers/UserController.js';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Obter tecnicos
router.get("/tecnicos", authMiddleware, UserController.listarTecnicos)


// Rotas OPTIONS para CORS (preflight requests)
router.options('/info', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
});

router.options('/senha', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
});





export default router;
