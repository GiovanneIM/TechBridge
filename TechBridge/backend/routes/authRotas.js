import express from 'express';
import AuthController from '../controllers/AuthController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();




/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza login
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
 * /auth/perfil:
 *   get:
 *     summary: Obtem o perfil
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
 * /auth/logout:
 *   post:
 *     summary: Realiza logout
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
