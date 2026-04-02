import express from 'express';          // 
import cors from 'cors';                // Controla quais domínios podem acessar a API
import helmet from 'helmet';            // Complemento de segurança, realiza tratativas de seguranças nas requisições HTTP
import dotenv from 'dotenv';            // Variáveis de ambiente - Utilizado para as informações locais que não serão compartilhadas no GitHub
import path from 'path';                // 
import { fileURLToPath } from 'url';    // 
import cookieParser from 'cookie-parser';

import { negrito, azul, verde, vermelho } from './utils/modificadoresDeSaida.js';

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

// IMPORTAR ROTAS
import authRotas from './routes/authRotas.js';
import criptografiaRotas from './routes/criptografiaRotas.js';
import userRotas from './routes/userRotas.js';
import chamadosRotas from './routes/chamadosRotas.js';
import maquinasRotas from './routes/maquinasRotas.js';
import setoresRotas from './routes/setoresRotas.js'

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

// IMPORTAR MIDDLEWARES
import { logMiddleware } from './middlewares/logMiddleware.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
import { handleUploadError } from './middlewares/uploadMiddleware.js';

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// CONFIGURANDO SERVIDOR E MIDDLEWARES

// Carregando variáveis do arquivo .env
dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurações do servidor
const PORT = process.env.PORT || 3000;

// Middlewares globais
app.use(helmet()); // Segurança HTTP headers

// Configurar CORS para permitir que rotas OPTIONS específicas sejam processadas
app.use(cors({
    origin: 'http://localhost:3001',                        // Permitindo acesso de qualquer endereço (Alterar para o endereço do Frontend)
    credentials: true,                                      // Permitindo receber cookies do navegador
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],   // Metódos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'],      // Headers permmitidos
    preflightContinue: false,                               // Deixa as rotas OPTIONS específicas serem processadas
    optionsSuccessStatus: 200,                              // Retorna 200 para OPTIONS em vez de 204
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos (imagens)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware para log de requisições (salva no banco de dados)
app.use(logMiddleware);

// Middlewate para obter cookies
app.use(cookieParser());

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

// ATIVAR AS ROTAS
app.use('/api/auth', authRotas);
app.use('/api/criptografia', criptografiaRotas);
app.use('/api/user', userRotas);
app.use('/api/chamados', chamadosRotas);
app.use('/api/maquinas', maquinasRotas);
app.use('/api/setores', setoresRotas);

// Rota raiz
app.get('/', (req, res) => {
    res.json({
        sucesso: true,
        mensagem: 'API de Produtos - Sistema de Gestão',
        versao: '1.0.0',
        rotas: {
            autenticacao: '/api/auth',
            produtos: '/api/produtos',
            criptografia: '/api/criptografia'
        },
        documentacao: {
            login: 'POST /api/auth/login',
            registrar: 'POST /api/auth/registrar',
            perfil: 'GET /api/auth/perfil',
            listarProdutos: 'GET /api/produtos',
            buscarProduto: 'GET /api/produtos/:id',
            criarProduto: 'POST /api/produtos',
            atualizarProduto: 'PUT /api/produtos/:id',
            excluirProduto: 'DELETE /api/produtos/:id',
            infoCriptografia: 'GET /api/criptografia/info',
            cadastrarUsuario: 'POST /api/criptografia/cadastrar-usuario'
        }
    });
});

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

// Middleware para tratar rotas não encontradas
app.use((req, res) => {
    res.status(404).json({
        sucesso: false,
        erro: 'Rota não encontrada',
        mensagem: `A rota ${req.method} ${req.originalUrl} não foi encontrada`
    });
});

app.use(handleUploadError);

// Middleware global de tratamento de erros (deve ser o último)
app.use(errorMiddleware);

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

// INICIAR SERVIDOR

app.listen(PORT, () => {
    console.log(negrito(azul('🌉 TECHBRIDGE - Backend')));
    console.log(`• Porta: ${negrito(verde(PORT))}`);
    console.log(`• Endereço: ${negrito(verde(`http://localhost:${PORT}`))}`);
    console.log(`• Ambiente: ${process.env.NODE_ENV || 'development'}`);
});

export default app;