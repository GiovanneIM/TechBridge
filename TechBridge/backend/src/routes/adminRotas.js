import express from 'express';
import EmpresasController from '../controllers/EmpresasController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { validateZod } from '../middlewares/validate.js';
import { createEmpresaSchema, paginacaoSchema } from '../config/zod/zod.js';

const router = express.Router();

// OBTER EMPRESAS (Com paginação)
/**
 * @swagger
 * /admin/empresas:
 *   get:
 *     summary: Listar todas as empresas. (Com paginação)
 *     tags: [Admin]
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
 *       400: 
 *         description: Dados inválidos
 *       401:
 *         description: Permissão negada
 *       500:
 *         description: Não foi possível listar as empresas
 */
router.get('/empresas', validateZod(paginacaoSchema, 'query'), EmpresasController.listarEmpresas)

// CRIAR UMA EMPRESA
/**
 * @swagger
 * /admin/empresas:
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
 *       201:
 *         description: Empresa registrada com sucesso
 *       400: 
 *         description: Dados inválidos
 *       401:
 *         description: Permissão negada
 *       500:
 *         description: Não foi possível registrar a empresa
 */
router.post('/empresas', validateZod(createEmpresaSchema, 'body'), EmpresasController.criarEmpresa);

// EXCLUIR UMA EMPRESA (E seus dados associados)
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
router.delete('/empresas/:empresa', () => { });

// EXCLUIR UM USUÁRIO (E seus dados associados)
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
router.delete('/usuarios/:usuario', () => { });


export default router;