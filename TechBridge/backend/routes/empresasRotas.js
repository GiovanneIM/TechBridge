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
 * /empresas/empresa{empresa}/membros/{tipoIdentificador}/{membro}:
 *   get:
 *     summary: Obter os dados de um membro da empresa (Admin / Gerente)
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
 *       name: tipoIdentificador
 *       required: true
 *       schema:
 *         type: string
 *         enum: [id, codigo]
 * 
 *     - in: path
 *       name: membro
 *       schema:
 *         type: integer
 *       required: true
 *       description: |
 *         ID numérico quando tipoIdentificador = id  
 *         Código alfanumérico quando tipoIdentificador = codigo
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
router.get('/:empresa/membros/:tipoIdentificador/:usuario', authMiddleware, () => { });

/**
 * @swagger
 * /empresas/{empresa}/membros/{tipoIdentificador}/{usuario}:
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
 *       name: tipoIdentificador
 *       required: true
 *       schema:
 *         type: string
 *         enum: [id, codigo]
 * 
 *     - in: path
 *       name: usuario
 *       schema:
 *         type: integer
 *       required: true
 *       description: |
 *         ID numérico quando tipoIdentificador = id  
 *         Código alfanumérico quando tipoIdentificador = codigo
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
router.patch('/:empresa/membros/:tipoIdentificador/:usuario', authMiddleware, () => { });

/**
 * @swagger
 * /empresas/{empresa}/membros/{tipoIdentificador}/{usuario}:
 *   delete:
 *     summary: Excluir um usuário da empresa (Admin)
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
 *       name: tipoIdentificador
 *       required: true
 *       schema:
 *         type: string
 *         enum: [id, codigo]
 * 
 *     - in: path
 *       name: usuario
 *       schema:
 *         type: integer
 *       required: true
 *       description: |
 *         ID numérico quando tipoIdentificador = id  
 *         Código alfanumérico quando tipoIdentificador = codigo
 * 
 *     responses:
 *       200:
 *         description: Usuário excluido com sucesso
 *       401:
 *         description: Permissão negada
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Não foi possível excluir o usuário da empresa
 */
router.delete('/:empresa/membros/:tipoIdentificador/:usuario', authMiddleware, () => { });



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
 * /empresas/{empresa}/setores/{setor}/{setor}:
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
 *       name: tipoIdentificador
 *       required: true
 *       schema:
 *         type: string
 *         enum: [id, codigo]
 * 
 *     - in: path
 *       name: setor
 *       schema:
 *         type: string
 *       required: true
 *       description: |
 *         ID numérico quando tipoIdentificador = id  
 *         Código alfanumérico quando tipoIdentificador = codigo
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
router.get('/:empresa/setores/:tipoIdentificador/:setor', authMiddleware, () => { });

/**
 * @swagger
 * /empresas/{empresa}/setores/{tipoIdentificador}/{setor}:
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
 *       name: tipoIdentificador
 *       required: true
 *       schema:
 *         type: string
 *         enum: [id, codigo]
 * 
 *     - in: path
 *       name: setor
 *       schema:
 *         type: string
 *       required: true
 *       description: |
 *         ID numérico quando tipoIdentificador = id  
 *         Código alfanumérico quando tipoIdentificador = codigo
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
router.patch('/:empresa/setores/:tipoIdentificador/:setor', authMiddleware, () => { });

export default router;