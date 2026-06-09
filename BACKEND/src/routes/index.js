import express from 'express';
import { adminMiddleware, authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// IMPORTAR AS ROTAS
import criptografiaRotas from './criptografia/rotasCripto.js';
import authRotas from './rotasAuth.js';
import adminRotas from './rotasAdmin.js'
import empresasRotas from './rotasEmpresas.js';

import chamadosRotas from './rotasChamados.js';

import testeRotas from './rotas_consertar/rotasTeste.js'

// ROTAS PARA CONSERTAR

import userRotas from './rotas_consertar/rotasUser.js';
import chamadosRotas2 from './rotas_consertar/rotasChamados.js';
import painelRotas from './rotas_consertar/rotasPainel.js';

// ATIVAR AS ROTAS
router.use('/criptografia', criptografiaRotas);
router.use('/auth', authRotas);
router.use('/admin', authMiddleware, adminMiddleware, adminRotas);

// ROTAS PARA FINALIZAR
router.use('/empresas', authMiddleware, empresasRotas);
router.use('/chamados', authMiddleware, chamadosRotas);

// ROTAS DE TESTE
router.use('/teste', testeRotas);

// ROTAS PARA CONSERTAR
router.use('/user', userRotas);
router.use('/chamados2', chamadosRotas2);
router.use('/painel', painelRotas);

export default router;