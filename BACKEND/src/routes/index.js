import express from 'express';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// =========================
// ROTAS PRINCIPAIS
// =========================
import criptografiaRotas from './criptografia/rotasCripto.js';
import authRotas from './rotasAuth.js';
import adminRotas from './rotasAdmin.js';
import empresasRotas from './rotasEmpresas.js';
import chamadosRotas from './rotasChamados.js';

// =========================
// ROTAS AUXILIARES / TESTE
// =========================
import testeRotas from './rotas_consertar/rotasTeste.js';
import userRotas from './rotas_consertar/rotasUser.js';
import chamadosRotas2 from './rotas_consertar/rotasChamados.js';
import painelRotas from './rotas_consertar/rotasPainel.js';

// =========================
// ATIVAÇÃO DAS ROTAS
// =========================

// AUTENTICAÇÃO
router.use('/auth', authRotas);

// CRIPTOGRAFIA
router.use('/criptografia', criptografiaRotas);

// ADMIN (protegido)
router.use('/admin', authMiddleware, adminMiddleware, adminRotas);

// EMPRESAS (protegido)
router.use('/empresas', authMiddleware, empresasRotas);

// CHAMADOS (PRODUÇÃO)
router.use('/chamados', authMiddleware, chamadosRotas);

// =========================
// ROTAS DE TESTE
// =========================
router.use('/teste', testeRotas);

// =========================
// ROTAS EM CONSERTO (DEV)
// =========================
router.use('/user', userRotas);
router.use('/chamados2', chamadosRotas2);
router.use('/painel', painelRotas);

export default router;