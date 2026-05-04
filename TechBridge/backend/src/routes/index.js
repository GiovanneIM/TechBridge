import express from 'express';
import { adminMiddleware, authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// IMPORTAR AS ROTAS
import authRotas from './rotasAuth.js';
import adminRotas from './rotasAdmin.js'
import empresasRotas from './rotasEmpresas.js';
import criptografiaRotas from './rotasCripto.js';
import userRotas from './rotasUser.js';

import chamadosRotas from './rotas_consertar/rotasChamados.js';
import maquinasRotas from './rotas_consertar/rotasMaquinas.js';
import setoresRotas from './rotas_consertar/rotasSetores.js';
import painelRotas from './rotas_consertar/rotasPainel.js';

// ATIVAR AS ROTAS
router.use('/auth', authRotas);
router.use('/admin', authMiddleware, adminMiddleware, adminRotas);
router.use('/criptografia', criptografiaRotas);

router.use('/empresas', authMiddleware, empresasRotas);




router.use('/user', userRotas);
router.use('/chamados', chamadosRotas);
router.use('/maquinas', maquinasRotas);
router.use('/setores', setoresRotas);
router.use('/painel', painelRotas);

export default router;