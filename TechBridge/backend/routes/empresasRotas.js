// ROTAS PARA CONTROLE DE EMPRESAS

import express from 'express';
import EmpresasController from '../controllers/EmpresasController.js';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();





/**
 * @swagger
 * /empresas:
 *   post:
 *     summary: Registrar uma nova empresa (Apenas Admin)
 *     tags: [Empresas]
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
router.post('/', authMiddleware, adminMiddleware, EmpresasController.registrarEmpresas);

/**
 * @swagger
 * /empresas/(id):
 *   patch:
 *     summary: Atualiza uma empresa (Apenas Admin ou um gerente da empresa)
 *     tags: [Empresas]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PatchCompany'
 *     responses:
 *       200:
 *         description: Dados da empresa atualizados com sucesso
 *       400: 
 *         description: Dados inválidos
 *       401:
 *         description: Permissão negada
 *       500:
 *         description: Não foi possível atualizar a empresa
 */
router.patch('/:id', authMiddleware, EmpresasController.atualizarEmpresas);





export default router;