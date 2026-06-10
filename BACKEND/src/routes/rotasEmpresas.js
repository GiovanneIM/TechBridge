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

router.get(
    '/:id_empresa',
    validateZod(params_Empresa, 'params'),
    EmpresasController.obter
);

router.patch(
    '/:id_empresa',
    validateZod(params_Empresa, 'params'),
    validateZod(updateEmpresaSchema, 'body'),
    gerentePrincipalMiddleware,
    EmpresasController.atualizar
);

router.patch(
    '/:id_empresa/logo',
    validateZod(params_Empresa, 'params'),
    setUploadTipo(TIPOS_UPLOAD.EMPRESA_LOGO),
    upload.single("imagem"),
    handleUploadError,
    gerentePrincipalMiddleware,
    EmpresasController.atualizarLogo
);


// MEMBROS DA EMPRESA

router.get(
    '/:id_empresa/membros',
    validateZod(params_Empresa, 'params'),
    validateZod(paginacaoSchema, 'query'),
    gerenteMiddleware,
    UserController.listar
);

router.post(
    '/:id_empresa/membros',
    validateZod(params_Empresa, 'params'),
    validateZod(createUserSchema, 'body'),
    gerenteMiddleware,
    UserController.criar
);

router.get(
    '/:id_empresa/membros/:cod_usuario',
    validateZod(params_EmpresaUsuario, 'params'),
    gerenteMiddleware,
    UserController.obter
);

router.patch(
    '/:id_empresa/membros/:id_usuario',
    validateZod(params_EmpresaUsuario, 'params'),
    validateZod(updateUserSchema, 'body'),
    gerenteMiddleware,
    () => { }   // TODO: UserController.atualizar
);


// SETORES DA EMPRESA

router.get(
    '/:id_empresa/setores',
    validateZod(params_Empresa, 'params'),
    SetoresController.listar
);

router.post(
    '/:id_empresa/setores',
    validateZod(params_Empresa, 'params'),
    validateZod(createSetorSchema, 'body'),
    gerenteMiddleware,
    SetoresController.criar
);

router.get(
    '/:id_empresa/setores/:cod_setor',
    validateZod(params_EmpresaSetor, 'params'),
    SetoresController.obter
);

router.patch(
    '/:id_empresa/setores/:cod_setor',
    validateZod(params_EmpresaSetor, 'params'),
    validateZod(updateSetorSchema, 'body'),
    gerenteMiddleware,
    () => { }   // TODO: SetoresController.atualizar
);


// MÁQUINAS DA EMPRESA

router.get(
    '/:id_empresa/maquinas',
    validateZod(params_Empresa, 'params'),
    MaquinaController.listarDaEmpresa
);

router.post(
    '/:id_empresa/setores/:cod_setor/maquinas',
    validateZod(params_EmpresaSetor, 'params'),
    validateZod(createMaquinaSchema, 'body'),
    gerenteMiddleware,
    MaquinaController.criar
);

router.get(
    '/:id_empresa/setores/:cod_setor/maquinas',
    validateZod(params_EmpresaSetor, 'params'),
    MaquinaController.listarDoSetor
);

router.get(
    '/:id_empresa/setores/:cod_setor/maquinas/:cod_maquina',
    validateZod(params_EmpresaMaquina, 'params'),
    MaquinaController.obter
);

router.patch(
    '/:id_empresa/setores/:cod_setor/maquinas/:cod_maquina',
    validateZod(params_EmpresaMaquina, 'params'),
    validateZod(updateMaquinaSchema, 'body'),
    gerenteMiddleware,
    MaquinaController.atualizar
);

router.delete(
    '/:id_empresa/maquinas/:id_maquina',
    gerenteMiddleware,
    MaquinaController.deletar
);


// CHAMADOS

router.get(
    '/:id_empresa/chamados',
    validateZod(params_Empresa, 'params'),
    ChamadosController.listar
);

router.get(
    '/:id_empresa/setores/:cod_setor/chamados',
    validateZod(params_EmpresaSetor, 'params'),
    ChamadosController.listarDoSetor
);

router.get(
    '/:id_empresa/setores/:cod_setor/maquinas/:cod_maquina/chamados',
    validateZod(params_EmpresaMaquina, 'params'),
    ChamadosController.listarDaMaquina
);

router.get(
    '/:id_empresa/setores/:cod_setor/maquinas/:cod_maquina/chamados/:cod_chamado',
    ChamadosController.obterPorCodigo
);

router.patch(
    '/:id_chamado',
    authMiddleware,
    ChamadosController.editar
);

router.delete(
    '/:id_chamado',
    authMiddleware,
    ChamadosController.excluir
);


// INFORMAÇÕES GERAIS

router.get(
    '/:id_empresa/infosGerais',
    EmpresasController.infosGerais
);


export default router;