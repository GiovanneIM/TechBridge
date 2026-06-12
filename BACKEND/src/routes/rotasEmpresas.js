// ROTAS PARA CONTROLE DE EMPRESAS

import express from 'express';
// MIDDLEWARES
import {
    authMiddleware,
    adminMiddleware,
    gerentePrincipalMiddleware,
    gerenteMiddleware
} from '../middlewares/authMiddleware.js';
// CONTROLLERS
import EmpresasController from '../controllers/Empresas.js';
import UserController from '../controllers/User.js';
import SetoresController from '../controllers/Setores.js';
import MaquinaController from '../controllers/Maquinas.js';
import ChamadosController from '../controllers/Chamados.js';
import { handleUploadError, setUploadTipo, TIPOS_UPLOAD, upload } from '../middlewares/uploadMiddleware.js';
// ZOD
import { validateZod } from '../middlewares/validate.js';
import { params_Empresa } from '../schemas/params/empresa.schema.js';
import { updateEmpresaSchema } from '../schemas/body/empresa/updateEmpresa.schema.js';
import { params_EmpresaUsuario } from '../schemas/params/empresa_usuario.schema.js';
import { createUserSchema } from '../schemas/body/user/createUser.schema.js';
import { updateUserSchema } from '../schemas/body/user/updateUser.schema.js';
import { params_EmpresaSetor } from '../schemas/params/empresa_setor.schema.js';
import { createSetorSchema } from '../schemas/body/setor/createSetor.schema.js';
import { updateSetorSchema } from '../schemas/body/setor/updateSetor.schema.js';
import { params_EmpresaMaquina } from '../schemas/params/empresa_setor_maquina.schema.js';
import { createMaquinaSchema } from '../schemas/body/maquina/createMaquina.schema.js';
import { updateMaquinaSchema } from '../schemas/body/maquina/updateMaquina.schema.js';
import { paginacaoSchema } from '../schemas/query/paginacao.js';


const router = express.Router();


// EMPRESA

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
 *       401:
 *         description: Autorização negada
 *       403:
 *         description: Acesso proibido
 *       404:
 *         description: Empresa não encontrada
 *       500:
 *         description: Não foi possível obter os dados da empresa
 */
router.get(
    '/:id_empresa',
    validateZod(params_Empresa, 'params'),      // Params - ID da empresa
    EmpresasController.obter                    // Controller empresa - Obter
);

/**
 * @swagger
 * /empresas/{empresa}:
 *   patch:
 *     summary: Atualizar uma empresa (Admin / Gerente Principal)
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
 *       403:
 *         description: Acesso proibido
 *       404:
 *         description: Empresa não encontrada
 *       500:
 *         description: Não foi possível atualizar a empresa
 */
router.patch(
    '/:id_empresa',
    validateZod(params_Empresa, 'params'),      // Params - ID da empresa
    validateZod(updateEmpresaSchema, 'body'),   // Body - Dados para atualizar
    gerentePrincipalMiddleware,                 // Gerente principal
    EmpresasController.atualizar                // Controller empresas - Atualizar
);

/**
 * @swagger
 * /empresas/{empresa}:
 *   patch:
 *     summary: Atualizar a logo de uma empresa (Admin / Gerente Principal)
 *     tags: [Empresas]
 * 
 *     parameters:
 * 
 *     requestBody:
 * 
 *     responses:
 *       200:
 *         description: Logo da empresa atualizados com sucesso
 *       400: 
 *         description: Dados inválidos
 *       401:
 *         description: Permissão negada
 *       403:
 *         description: Acesso proibido
 *       404:
 *         description: Empresa não encontrada
 *       500:
 *         description: Não foi possível atualizar a logo da empresa
 */
router.patch(
    '/:id_empresa/logo',
    validateZod(params_Empresa, 'params'),      // Params - ID da empresa
    setUploadTipo(TIPOS_UPLOAD.EMPRESA_LOGO),
    upload.single("imagem"),
    handleUploadError,
    gerentePrincipalMiddleware,                 // Gerente principal
    EmpresasController.atualizarLogo            // Controller empresas - Atualizar
);



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
 *       403:
 *         description: Acesso proibido
 *       500:
 *         description: Não foi possível listar os membros da empresa
 */
router.get(
    '/:id_empresa/membros',
    validateZod(params_Empresa, 'params'),      // Params - ID da empresa
    validateZod(paginacaoSchema, 'query'),      // Query - Paginação
    gerenteMiddleware,                          // Gerente
    UserController.listar                       // Controller users - Listar
);

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
 *       403:
 *         description: Acesso proibido
 *       404:
 *         description: Setor não encontrado
 *       500:
 *         description: Não foi possível registrar o membros da empresa
 */
router.post(
    '/:id_empresa/membros',
    validateZod(params_Empresa, 'params'),      // Params - ID da empresa
    validateZod(createUserSchema, 'body'),      // Body - Dados do usuário
    gerenteMiddleware,                          // Gerente
    UserController.criar                        // Controller users - Criar
);

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
 *     - in: cod_usuario
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
 *       403:
 *         description: Acesso proibido
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Não foi possível listar o usuário da empresa
 */
router.get(
    '/:id_empresa/membros/:cod_usuario',
    validateZod(params_EmpresaUsuario, 'params'),   // Params - ID da empresa, ID do usuário
    gerenteMiddleware,                              // Gerente
    UserController.obter                            // Controller users - Obter
);

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
 *       403:
 *         description: Acesso proibido
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Não foi possível atualizar o usuário da empresa
 */
router.patch(
    '/:id_empresa/membros/:id_usuario',
    validateZod(params_EmpresaUsuario, 'params'),
    validateZod(updateUserSchema, 'body'),
    gerenteMiddleware,
    () => { }
);



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
 *       403:
 *         description: Acesso proibido
 *       500:
 *         description: Não foi possível listar os setores da empresa
 */
router.get(
    '/:id_empresa/setores',
    validateZod(params_Empresa, 'params'),      // Params - ID da empresa
    validateZod(paginacaoSchema, 'query'),      // Query - Paginação
    SetoresController.listar                    // Controller setores - listar
);

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
 *       403:
 *         description: Acesso proibido
 *       404:
 *         description: Setor não encontrado
 *       500:
 *         description: Não foi possível registrar o setor para a empresa
 */
router.post(
    '/:id_empresa/setores',
    validateZod(params_Empresa, 'params'),      // Params - ID da empresa
    validateZod(createSetorSchema, 'body'),     // Body - Dados do setor
    gerenteMiddleware,                          // Gerente
    SetoresController.criar                     // Controller Setores - Criar
);

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
 *       403:
 *         description: Acesso proibido
 *       404:
 *         description: Setor não encontrado
 *       500:
 *         description: Não foi possível listado o setor da empresa
 */
router.get(
    '/:id_empresa/setores/:cod_setor',
    validateZod(params_EmpresaSetor, 'params'), // Params - ID da empresa, Código do setor
    SetoresController.obter                     // Controller Setores - Obter
);

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
 *       403:
 *         description: Acesso proibido
 *       404:
 *         description: Setor não encontrado
 *       500:
 *         description: Não foi possível atualizar o setor da empresa
 */
router.patch(
    '/:id_empresa/setores/:cod_setor',
    validateZod(params_EmpresaSetor, 'params'),
    validateZod(updateSetorSchema, 'body'),
    gerenteMiddleware,
    () => { }
);



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
 *       403:
 *         description: Acesso proibido
 *       500:
 *         description: Não foi possível listar as maquinas da empresa
 */
router.get(
    '/:id_empresa/maquinas',
    validateZod(params_Empresa, 'params'),          // Params - ID da empresa
    validateZod(paginacaoSchema, 'query'),          // Query - Paginação
    MaquinaController.listarDaEmpresa               // Controller Maquinas - Listar máquinas da empresa
);

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
 *       403:
 *         description: Acesso proibido
 *       500:
 *         description: Não foi possível registrar a máquina para a empresa
 */
router.post(
    '/:id_empresa/setores/:cod_setor/maquinas',
    validateZod(params_EmpresaSetor, 'params'),     // Params - ID da empresa, Código do setor
    validateZod(createMaquinaSchema, 'body'),       // Body - Dados da máquina
    gerenteMiddleware,                              // Gerente
    MaquinaController.criar                         // Controller Maquinas - Criar
);

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
 *       403:
 *         description: Acesso proibido
 *       500:
 *         description: Não foi possível listar as maquinas do setor
 */
router.get(
    '/:id_empresa/setores/:cod_setor/maquinas',
    validateZod(params_EmpresaSetor, 'params'),     // Params - ID da empresa, Código do setor
    MaquinaController.listarDoSetor                 // Controller Maquinas - Listar máquinas do setores
);

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
 *       403:
 *         description: Acesso proibido
 *       404:
 *         description: Máquina não encontrado
 *       500:
 *         description: Não foi possível listar a máquina da empresa
 */
router.get(
    '/:id_empresa/setores/:cod_setor/maquinas/:cod_maquina',
    validateZod(params_EmpresaMaquina, 'params'),               // Params - ID da empresa, Código do setor e Código da máquina
    MaquinaController.obter                                     // Controller Maquinas - Obter
);

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
 *       403:
 *         description: Acesso proibido
 *       404:
 *         description: Máquina não encontrada
 *       500:
 *         description: Não foi possível atualizar a máquina
 */
router.patch(
    '/:id_empresa/setores/:cod_setor/maquinas/:cod_maquina',
    validateZod(params_EmpresaMaquina, 'params'),
    validateZod(updateMaquinaSchema, 'body'),
    gerenteMiddleware,
    () => { }
);



// CHAMADOS

// LISTAR CHAMADOS DE UMA EMPRESA
router.get(
    '/:id_empresa/chamados',
    validateZod(params_Empresa, 'params'),      // Params - ID da empresa
    ChamadosController.listar
)


// LISTAR CHAMADOS DE UM SETOR
router.get(
    '/:id_empresa/setores/:cod_setor/chamados',
    validateZod(params_EmpresaSetor, 'params'),      // Params - ID da empresa
    ChamadosController.listarDoSetor
)

// LISTAR CHAMADOS DE UMA MÁQUINA
router.get(
    '/:id_empresa/setores/:cod_setor/maquinas/:cod_maquina/chamados',
    validateZod(params_EmpresaMaquina, 'params'),      // Params - ID da empresa
    ChamadosController.listarDaMaquina
)

// LISTAR CHAMADO ESPECÍFICO (A partir ds códigos)
router.get(
    '/:id_empresa/setores/:cod_setor/maquinas/:cod_maquina/chamados/:cod_chamado',
    ChamadosController.obterPorCodigo
)


// INFORMAÇÕES GERAIS
router.get(
    '/:id_empresa/infosGerais',
    EmpresasController.infosGerais
)




export default router;