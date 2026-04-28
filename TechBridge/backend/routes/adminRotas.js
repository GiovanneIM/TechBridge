// ROTAS PARA CONTROLE DE EMPRESAS

import express from 'express';
import EmpresasController from '../controllers/EmpresasController.js';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();


router.get('/empresas', authMiddleware, EmpresasController.listarEmpresas)

/**
 * @swagger
 * /admin/empresa:
 *   post:
 *     summary: Registrar uma nova empresa e um gerente inicial para ela
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewCompany'
 *     responses:
 *       200:
 *         description: Empresa registrada com sucesso
 *       400: 
 *         description: Dados inválidos
 *       401:
 *         description: Permissão negada
 *       500:
 *         description: Não foi possível registrar a empresa
 */
router.post('/empresa', authMiddleware, () => { });

/**
 * @swagger
 * /admin/empresas/{empresa}:
 *   delete:
 *     summary: Excluir uma empresa e os dados associados (Usuários, Setores, Máquinas e Chamados)
 *     tags: [Admin]
 * 
 *     parameters:
 *     - in: path
 *       name: empresa
 *       schema:
 *         type: integer
 *       required: true
 *       description: ID da empresa
 * 
 *     responses:
 *       200:
 *         description: Empresa excluida com sucesso
 *       401:
 *         description: Permissão negada
 *       404:
 *         description: Empresa não encontrado
 *       500:
 *         description: Não foi possível excluir a empresa
 */
router.delete('/empresas/:empresa', authMiddleware, () => { });

/**
 * @swagger
 * /admin/usuarios/{usuario}:
 *   delete:
 *     summary: Excluir um usuário e seus dados associados (Chamados)
 *     tags: [Admin]
 * 
 *     parameters:
 *     - in: path
 *       name: usuario
 *       schema:
 *         type: integer
 *       required: true
 *       description: ID do usuário
 * 
 *     responses:
 *       200:
 *         description: Usuário excluido com sucesso
 *       401:
 *         description: Permissão negada
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Não foi possível excluir o usuário
 */
router.delete('/usuarios/:usuario', authMiddleware, () => { });


export default router;