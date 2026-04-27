// ROTAS PARA CONTROLE DE EMPRESAS

import express from 'express';
import EmpresasController from '../controllers/EmpresasController.js';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();



/**
 * @swagger
 * /empresas/{empresa}:
 *   get:
 *     summary: Listar os dados de uma empresa
 *     tags: [Empresas]
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
 *         description: Dados da empresa listados com sucesso
 *       500:
 *         description: Não foi possível obter os dados da empresa
 */
router.get('/:empresa', authMiddleware, () => { });

/**
 * @swagger
 * /empresas/{empresa}:
 *   patch:
 *     summary: Atualizar uma empresa (Admin / Gerente)
 *     tags: [Empresas]
 * 
 *     parameters:
 *     - in: path
 *       name: empresa
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
router.patch('/:empresa', authMiddleware, () => { });



// MEMBROS DA EMPRESA

/**
 * @swagger
 * /empresas/{empresa}/membros:
 *   get:
 *     summary: Listar os usuários de uma empresa (Admin / Gerente)
 *     tags: [Empresas - Membros]
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
 *         description: Membros listados com sucesso
 *       401:
 *         description: Permissão negada
 *       500:
 *         description: Não foi possível listar os membros da empresa
 */
router.get('/:empresa/membros', authMiddleware, () => { });

/**
 * @swagger
 * /empresas/{empresa}/membros:
 *   post:
 *     summary: Registrar um novo usuário para a empresa (Admin / Gerente)
 *     tags: [Empresas - Membros]
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
 *         description: Usuário criado com sucesso
 *       401:
 *         description: Permissão negada
 *       404:
 *         description: Setor não encontrado
 *       500:
 *         description: Não foi possível registrar o membros da empresa
 */
router.post('/:empresa/membros', authMiddleware, () => { });

/**
 * @swagger
 * /empresas/{empresa}/membros/{membro}:
 *   get:
 *     summary: Listar um membro da empresa (Admin / Gerente)
 *     tags: [Empresas - Membros]
 * 
 *     parameters:
 *     - in: path
 *       name: empresa
 *       schema:
 *         type: integer
 *       required: true
 *       description: ID da empresa
 * 
 *     - in: path
 *       name: membro
 *       schema:
 *         type: string
 *       required: true
 *       description: Código do usuário
 * 
 *     responses:
 *       200:
 *         description: Usuário listado com sucesso
 *       401:
 *         description: Permissão negada
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Não foi possível listar o usuário da empresa
 */
router.get('/:empresa/membros/:membro', authMiddleware, () => { });

/**
 * @swagger
 * /empresas/{empresa}/membros/{usuario}:
 *   patch:
 *     summary: Atualizar um usuário da empresa (Admin / Gerente)
 *     tags: [Empresas - Membros]
 * 
 *     parameters:
 *     - in: path
 *       name: empresa
 *       schema:
 *         type: integer
 *       required: true
 *       description: ID da empresa
 * 
 *     - in: path
 *       name: usuario
 *       schema:
 *         type: string
 *       required: true
 *       description: Código do usuário
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
router.patch('/:empresa/membros/:membro', authMiddleware, () => { });



// SETORES DA EMPRESA

/**
 * @swagger
 * /empresas/{empresa}/setores:
 *   get:
 *     summary: Listar os setores de uma empresa (Admin / Gerente)
 *     tags: [Empresas - Setores]
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
 *         description: Setores listados com sucesso
 *       401:
 *         description: Permissão negada
 *       500:
 *         description: Não foi possível listar os setores da empresa
 */
router.get('/:empresa/setores', authMiddleware, () => { });

/**
 * @swagger
 * /empresas/{empresa}/setores:
 *   post:
 *     summary: Registrar um novo setor para a empresa (Admin / Gerente)
 *     tags: [Empresas - Setores]
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
 *         description: Setor criado com sucesso
 *       401:
 *         description: Permissão negada
 *       404:
 *         description: Setor não encontrado
 *       500:
 *         description: Não foi possível registrar o setor para a empresa
 */
router.post('/:empresa/setores', authMiddleware, () => { });

/**
 * @swagger
 * /empresas/{empresa}/setores/{setor}:
 *   get:
 *     summary: Listar um setor da empresa (Admin / Gerente)
 *     tags: [Empresas - Setores]
 * 
 *     parameters:
 *     - in: path
 *       name: empresa
 *       schema:
 *         type: integer
 *       required: true
 *       description: ID da empresa
 * 
 *     - in: path
 *       name: setor
 *       schema:
 *         type: string
 *       required: true
 *       description: Código do setor
 * 
 *     responses:
 *       200:
 *         description: Setor listado com sucesso
 *       401:
 *         description: Permissão negada
 *       404:
 *         description: Setor não encontrado
 *       500:
 *         description: Não foi possível listado o setor da empresa
 */
router.get('/:empresa/setores/:setor', authMiddleware, () => { });

/**
 * @swagger
 * /empresas/{empresa}/setores/{setor}:
 *   patch:
 *     summary: Atualizar um setor da empresa (Admin / Gerente)
 *     tags: [Empresas - Setores]
 * 
 *     parameters:
 *     - in: path
 *       name: empresa
 *       schema:
 *         type: integer
 *       required: true
 *       description: ID da empresa
 * 
 *     - in: path
 *       name: setor
 *       schema:
 *         type: string
 *       required: true
 *       description: Código do setor
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
router.patch('/:empresa/setores/:setor', authMiddleware, () => { });



// MÁQUINAS DA EMPRESA

/**
 * @swagger
 * /empresas/{empresa}/maquinas:
 *   get:
 *     summary: Listar todas as maquinas de uma empresa (Admin / Gerente)
 *     tags: [Empresas - Maquinas]
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
 *         description: Maquinas listados com sucesso
 *       401:
 *         description: Permissão negada
 *       500:
 *         description: Não foi possível listar as maquinas da empresa
 */
router.get('/:empresa/maquinas', authMiddleware, () => { });

/**
 * @swagger
 * /empresas/{empresa}/setores/{setor}/maquinas:
 *   post:
 *     summary: Registrar uma nova máquina para um setor da empresa (Admin / Gerente)
 *     tags: [Empresas - Maquinas]
 * 
 *     parameters:
 *     - in: path
 *       name: empresa
 *       schema:
 *         type: integer
 *       required: true
 *       description: ID da empresa
 * 
 *     - in: path
 *       name: setor
 *       schema:
 *         type: string
 *       required: true
 *       description: Código do setor
 * 
 *     responses:
 *       200:
 *         description: Maquina criada com sucesso
 *       401:
 *         description: Permissão negada
 *       500:
 *         description: Não foi possível registrar a máquina para a empresa
 */
router.post('/:empresa/setores/:setor/maquinas', authMiddleware, () => { });

/**
 * @swagger
 * /empresas/{empresa}/setores/{setor}/maquinas:
 *   get:
 *     summary: Listar as maquinas de um setor de uma empresa (Admin / Gerente)
 *     tags: [Empresas - Maquinas]
 * 
 *     parameters:
 *     - in: path
 *       name: empresa
 *       schema:
 *         type: integer
 *       required: true
 *       description: ID da empresa
 * 
 *     - in: path
 *       name: setor
 *       schema:
 *         type: string
 *       required: true
 *       description: Código do setor
 * 
 *     responses:
 *       200:
 *         description: Maquinas listados com sucesso
 *       401:
 *         description: Permissão negada
 *       500:
 *         description: Não foi possível listar as maquinas do setor
 */
router.get('/:empresa/setores/:setor/maquinas', authMiddleware, () => { });

/**
 * @swagger
 * /empresas/{empresa}/setores/{setor}/maquinas/{maquina}:
 *   get:
 *     summary: Listar uma máquina da empresa (Admin / Gerente)
 *     tags: [Empresas - Maquinas]
 * 
 *     parameters:
 *     - in: path
 *       name: empresa
 *       schema:
 *         type: integer
 *       required: true
 *       description: ID da empresa
 * 
 *     - in: path
 *       name: setor
 *       schema:
 *         type: string
 *       required: true
 *       description: Código do setor
 * 
 *     - in: path
 *       name: maquina
 *       schema:
 *         type: string
 *       required: true
 *       description: Código da máquina
 * 
 *     responses:
 *       200:
 *         description: Máquina listado com sucesso
 *       401:
 *         description: Permissão negada
 *       404:
 *         description: Máquina não encontrado
 *       500:
 *         description: Não foi possível listar a máquina da empresa
 */
router.get('/:empresa/setores/:setor/maquinas/:maquina', authMiddleware, () => { });

/**
 * @swagger
 * /empresas/{empresa}/setores/{setor}/maquinas/{maquina}:
 *   patch:
 *     summary: Atualizar uma máquina de um setor da empresa (Admin / Gerente)
 *     tags: [Empresas - Maquinas]
 * 
 *     parameters:
 *     - in: path
 *       name: empresa
 *       schema:
 *         type: integer
 *       required: true
 *       description: ID da empresa
 * 
 *     - in: path
 *       name: setor
 *       schema:
 *         type: string
 *       required: true
 *       description: Código do setor
 * 
 *     - in: path
 *       name: maquina
 *       schema:
 *         type: string
 *       required: true
 *       description: Código da máquina
 * 
 *     responses:
 *       200:
 *         description: Máquina atualizada com sucesso
 *       401:
 *         description: Permissão negada
 *       404:
 *         description: Máquina não encontrada
 *       500:
 *         description: Não foi possível atualizar a máquina
 */
router.patch('/:empresa/setores/:setor/maquinas/:maquina', authMiddleware, () => { });


export default router;