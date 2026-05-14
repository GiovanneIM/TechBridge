import express from 'express';
import { adminMiddleware, authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// IMPORTAR AS ROTAS
import criptografiaRotas from './criptografia/rotasCripto.js';
import authRotas from './rotasAuth.js';
import adminRotas from './rotasAdmin.js'
import empresasRotas from './rotasEmpresas.js';

import testeRotas from './rotasTeste.js'

// ROTAS PARA CONSERTAR

import userRotas from './rotas_consertar/rotasUser.js';
import chamadosRotas from './rotas_consertar/rotasChamados.js';
import maquinasRotas from './rotas_consertar/rotasMaquinas.js';
import setoresRotas from './rotas_consertar/rotasSetores.js';
import painelRotas from './rotas_consertar/rotasPainel.js';

// ATIVAR AS ROTAS
router.use('/criptografia', criptografiaRotas);
router.use('/auth', authRotas);
router.use('/admin', authMiddleware, adminMiddleware, adminRotas);

// ROTAS PARA FINALIZAR
router.use('/empresas', authMiddleware, empresasRotas);

// ROTAS DE TESTE
router.use('/teste', testeRotas);

// ROTAS PARA CONSERTAR
router.use('/user', userRotas);
router.use('/chamados', chamadosRotas);
router.use('/maquinas', maquinasRotas);
router.use('/setores', setoresRotas);
router.use('/painel', painelRotas);

export default router;