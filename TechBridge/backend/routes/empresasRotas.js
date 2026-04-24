// ROTAS PARA CONTROLE DE EMPRESAS

import express from 'express';
import EmpresasController from '../controllers/EmpresasController.js';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();



/**
 * @swagger
 * /empresas:
 *   0ost:
 *     summary: Registrar uma nova empresa (Admin)
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
router.post('/', authMiddleware, adminMiddleware, () => { });

/**
 * @swagger
 * /empresas/(id):
 *   get:
 *     summary: Lista os dados de uma empresa
 *     tags: [Empresas]
 * 
 *     parameters:
 *     - in: path
 *       name: ID
 *       schema:
 *         type: integer
 *       required: true
 *       description: ID da empresa
 * 
 *     responses:
 *       200:
 *         description: Dados da empresa listados com sucesso
 *       500:
 *         description: Não foi possível obter os dados da empresa
 */
router.get('/:id', authMiddleware, () => { });

/**
 * @swagger
 * /empresas/(id):
 *   patch:
 *     summary: Atualiza uma empresa (Admin / Gerente)
 *     tags: [Empresas]
 * 
 *     parameters:
 *     - in: path
 *       name: ID
 *       schema:
 *         type: integer
 *       required: true
 *       description: ID da empresa
 * 
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PatchCompany'
 * 
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
router.patch('/:id', authMiddleware, () => { });



/**
 * @swagger
 * /empresas/(id)/membros:
 *   get:
 *     summary: Lista os usuários de uma empresa (Admin / Gerente)
 *     tags: [Empresas]
 * 
 *     parameters:
 *     - in: path
 *       name: ID
 *       schema:
 *         type: integer
 *       required: true
 *       description: ID da empresa
 * 
 *     responses:
 *       200:
 *         description: Membros listados com sucesso
 *       401:
 *         description: Permissão negada
 *       500:
 *         description: Não foi possível listar os membros da empresa
 */
router.get('/:id/membros', authMiddleware, () => { });

/**
 * @swagger
 * /empresas/(id)/membros:
 *   post:
 *     summary: Registra um novo usuário para a empresa (Admin / Gerente)
 *     tags: [Empresas]
 * 
 *     parameters:
 *     - in: path
 *       name: ID
 *       schema:
 *         type: integer
 *       required: true
 *       description: ID da empresa
 * 
 *     responses:
 *       200:
 *         description: Usuário criado com sucesso
 *       401:
 *         description: Permissão negada
 *       404:
 *         description: Setor não encontrado
 *       500:
 *         description: Não foi possível registrar o membros da empresa
 */
router.post('/:id/membros', authMiddleware, () => { });

/**
 * @swagger
 * /empresas/(id)/membros/(idUsuario):
 *   patch:
 *     summary: Obtem os dados de um membro da empresa (Admin / Gerente)
 *     tags: [Empresas]
 * 
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *       description: ID da empresa
 * 
 *     - in: path
 *       name: idUsuario
 *       schema:
 *         type: integer
 *       required: true
 *       description: ID ou Código do usuário
 * 
 *     responses:
 *       200:
 *         description: Usuário listado com sucesso
 *       401:
 *         description: Permissão negada
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Não foi possível atualizar o usuário da empresa
 */
router.patch('/:id/membros/:idUsuario', authMiddleware, () => { });

/**
 * @swagger
 * /empresas/(id)/membros/(idUsuario):
 *   patch:
 *     summary: Atualiza um usuário da empresa (Admin / Gerente)
 *     tags: [Empresas]
 * 
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *       description: ID da empresa
 * 
 *     - in: path
 *       name: idUsuario
 *       schema:
 *         type: integer
 *       required: true
 *       description: ID ou Código do usuário
 * 
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       401:
 *         description: Permissão negada
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Não foi possível atualizar o usuário da empresa
 */
router.patch('/:id/membros/:idUsuario', authMiddleware, () => { });



/**
 * @swagger
 * /empresas/(id)/setores:
 *   get:
 *     summary: Lista os setores de uma empresa (Admin / Gerente)
 *     tags: [Empresas]
 * 
 *     parameters:
 *     - in: path
 *       name: ID
 *       schema:
 *         type: integer
 *       required: true
 *       description: ID da empresa
 * 
 *     responses:
 *       200:
 *         description: Setores listados com sucesso
 *       401:
 *         description: Permissão negada
 *       500:
 *         description: Não foi possível listar os setores da empresa
 */
router.get('/:id/setores', authMiddleware, () => { });

/**
 * @swagger
 * /empresas/(id)/setores:
 *   post:
 *     summary: Registra um novo setor para a empresa (Admin / Gerente)
 *     tags: [Empresas]
 * 
 *     parameters:
 *     - in: path
 *       name: ID
 *       schema:
 *         type: integer
 *       required: true
 *       description: ID da empresa
 * 
 *     responses:
 *       200:
 *         description: Setor criado com sucesso
 *       401:
 *         description: Permissão negada
 *       404:
 *         description: Setor não encontrado
 *       500:
 *         description: Não foi possível registrar o setor para a empresa
 */
router.post('/:id/setores', authMiddleware, () => { });

/**
 * @swagger
 * /empresas/(id)/setores/(idUsuario):
 *   patch:
 *     summary: Atualiza um usuário da empresa (Admin / Gerente)
 *     tags: [Empresas]
 * 
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *       description: ID da empresa
 * 
 *     - in: path
 *       name: idSetor
 *       schema:
 *         type: string
 *       required: true
 *       description: ID ou Código do setor
 * 
 *     responses:
 *       200:
 *         description: Setor atualizado com sucesso
 *       401:
 *         description: Permissão negada
 *       404:
 *         description: Setor não encontrado
 *       500:
 *         description: Não foi possível atualizar o setor da empresa
 */
router.patch('/:id/setores/:idSetor', authMiddleware, () => { });

export default router;