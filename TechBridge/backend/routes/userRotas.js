import express from 'express';
import UserController from '../controllers/UserController.js';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware.js';
import { handleUploadError, uploadImagens } from '../middlewares/uploadMiddleware.js';

const router = express.Router();



// Atualizar informações do usuário (Exceto senha e foto)
router.patch('/info', authMiddleware, UserController.atualizarInformacoes);

// Atualizar senha do usuário
router.patch('/senha', authMiddleware, UserController.atualizarSenha);

// Atualizar imagem de perfil do usuário
router.patch(
    "/foto",
    authMiddleware,
    uploadImagens.single("foto"),
    UserController.atualizarImagem
);

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
