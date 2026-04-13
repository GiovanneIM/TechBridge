import express from 'express';
import AuthController from '../controllers/AuthController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { handleUploadError, uploadImagens } from '../middlewares/uploadMiddleware.js';

const router = express.Router();




/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realizar login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           'application/json': 
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400: 
 *         description: Dados inválidos (email ausente, senha ausente ou formato incorreto)
 *       401:
 *         description: Email ou senha incorretos
 *       500:
 *         description: Não foi possível processar o login
 */
router.post('/login', AuthController.login);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Realizar logout
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TokenBody'
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 *       401:
 *         description: Erro de autenticação
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/logout', authMiddleware, AuthController.logout);

/**
 * @swagger
 * /auth/perfil:
 *   get:
 *     summary: Obter o perfil do usuário logado
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TokenBody'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Perfil'
 *       401:
 *         description: Erro de autenticação
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Não foi possível obter o perfil
 */
router.get('/perfil', authMiddleware, AuthController.obterPerfil);


/**
 * @swagger
 * /auth/info:
 *   patch:
 *     summary: Atualizar informações do usuário (Exceto senha e foto)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PatchInfo'
 *     responses:
 *       200:
 *         description: Informações realizadas com sucesso
 */
router.patch('/info', authMiddleware, AuthController.atualizarInformacoes);

/**
 * @swagger
 * /auth/senha:
 *   patch:
 *     summary: Atualizar senha do usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PatchSenha'
 *     responses:
 *       200:
 *         description: Senha atualizada com sucesso
 */
router.patch('/senha', authMiddleware, AuthController.atualizarSenha);

/**
 * @swagger
 * /auth/foto:
 *   patch:
 *     summary: Atualizar imagem de perfil do usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TokenBody'
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               foto:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Imagem atualizada com sucesso
 */
router.patch(
    "/foto",
    authMiddleware,
    uploadImagens.single("foto"),
    AuthController.atualizarImagem
);



// Rotas OPTIONS para CORS (preflight requests)
router.options('/login', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.sendStatus(200);
});

router.options('/perfil', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
});





export default router;
