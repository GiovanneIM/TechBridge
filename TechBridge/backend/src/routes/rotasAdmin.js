import express from 'express';
import EmpresasController from '../controllers/Empresas.js';
import { adminMiddleware, authMiddleware } from '../middlewares/authMiddleware.js';
import { validateZod } from '../middlewares/validate.js';
import { paginacaoSchema } from '../schemas/query/paginacao.js';
import { createEmpresaSchema } from '../schemas/body/empresa/createEmpresa.schema.js';
import LogModel from '../models/Logs.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Rotas exclusivas para Admin
 */

// OBTER EMPRESAS (Com paginação)
/**
 * @swagger
 * /admin/empresas:
 *   get:
 *     summary: Listar todas as empresas. (Com paginação)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 * 
 *     parameters:
 *     - in: query
 *       name: page
 *       schema:
 *         type: integer
 *         minimum: 1
 *         default: 1
 *       description: Número da página
 * 
 *     - in: query
 *       name: limit
 *       schema:
 *         type: integer
 *         minimum: 1
 *         maximum: 100
 *         default: 10
 *       description: Limite de dados por página
 * 
 *     responses:
 *       200:
 *         description: Empresas listadas com sucesso
 *         content:
 *           'application/json': 
 *             schema:
 *               $ref: '#/components/schemas/GetEmpresas'
 *       400: 
 *         description: Dados inválidos
 *       401:
 *         description: Permissão negada
 *       500:
 *         description: Não foi possível listar as empresas
 */
router.get('/empresas', validateZod(paginacaoSchema, 'query'), EmpresasController.listar)

// CRIAR UMA EMPRESA
/**
 * @swagger
 * /admin/empresas:
 *   post:
 *     summary: Registrar uma nova empresa e um gerente inicial para ela
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 * 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewCompany'
 * 
 *     responses:
 *       201:
 *         description: Empresa registrada com sucesso
 *       400: 
 *         description: Dados inválidos
 *       401:
 *         description: Permissão negada
 *       500:
 *         description: Não foi possível registrar a empresa
 */
router.post('/empresas', validateZod(createEmpresaSchema, 'body'), EmpresasController.criar);

// EXCLUIR UMA EMPRESA (E seus dados associados)
/**
 * @swagger
 * /admin/empresas/{empresa}:
 *   delete:
 *     summary: Excluir uma empresa e os dados associados (Usuários, Setores, Máquinas e Chamados)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
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
router.delete('/empresas/:empresa', () => { });

// EXCLUIR UM USUÁRIO (E seus dados associados)
/**
 * @swagger
 * /admin/usuarios/{usuario}:
 *   delete:
 *     summary: Excluir um usuário e seus dados associados (Chamados)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
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
router.delete('/usuarios/:usuario', () => { });

/**
 * @swagger
 * /admin/log/total:
 *   GET:
 *     summary: Obter total de Logs
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.get('/log/total', LogModel.total)

export default router;