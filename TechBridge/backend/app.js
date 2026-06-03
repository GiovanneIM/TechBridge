import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';

import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './src/config/swagger.js';

import { negrito, azul, verde, vermelho } from './src/utils/modificadoresDeSaida.js';

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

// IMPORTAR ROTAS
import rotas from './src/routes/index.js';

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

// IMPORTAR MIDDLEWARES
import { logMiddleware } from './src/middlewares/logMiddleware.js';
import { errorMiddleware } from './src/middlewares/errorMiddleware.js';
import { handleUploadError } from './src/middlewares/uploadMiddleware.js';

// IMPORTAR GATEWAY SERIAL
import { startSerialGateway } from './src/services/Gateway.js'; // ← novo

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

app.use(helmet({ crossOriginResourcePolicy: false }));

app.use(cors({
    origin: [
        'http://localhost:3001',
        'http://10.84.7.3:3001',
        'http://10.84.7.2:3001',
    ],                                 // Permitindo acesso do Frontend
    credentials: true,                                               // Permitindo receber cookies do navegador
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],   // Metódos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'],               // Headers permmitidos
    preflightContinue: false,                                        // Deixa as rotas OPTIONS específicas serem processadas
    optionsSuccessStatus: 200,                                       // Retorna 200 para OPTIONS em vez de 204
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(logMiddleware);
app.use(cookieParser());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

// ATIVAR AS ROTAS
app.use('/techbridge', rotas);

app.get('/', (req, res) => {
    res.json({
        sucesso: true,
        mensagem: 'API de Produtos - Sistema de Gestão',
        versao: '1.0.0',
        rotas: {
            autenticacao: '/techbridge/auth',
            produtos: '/techbridge/produtos',
            criptografia: '/techbridge/criptografia'
        },
        documentacao: {
            login: 'POST /techbridge/auth/login',
            perfil: 'GET /techbridge/auth/perfil',
            listarProdutos: 'GET /techbridge/produtos',
            buscarProduto: 'GET /techbridge/produtos/:id',
            criarProduto: 'POST /techbridge/produtos',
            atualizarProduto: 'PUT /techbridge/produtos/:id',
            excluirProduto: 'DELETE /techbridge/produtos/:id',
            infoCriptografia: 'GET /techbridge/criptografia/info',
            cadastrarUsuario: 'POST /techbridge/criptografia/cadastrar-usuario'
        }
    });
});

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

app.use((req, res) => {
    res.status(404).json({
        sucesso: false,
        erro: 'Rota não encontrada',
        mensagem: `A rota ${req.method} ${req.originalUrl} não foi encontrada`
    });
});

app.use(handleUploadError);
app.use(errorMiddleware);

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

// INICIAR SERVIDOR
app.listen(PORT, () => {
    console.log(negrito(azul('🌉 TECHBRIDGE - Backend')));
    console.log(`• Porta: ${negrito(verde(PORT))}`);
    console.log(`• Endereço: ${negrito(verde(`http://localhost:${PORT}`))}`);
    console.log(`• Documentação Swagger: ${negrito(azul(`http://localhost:${PORT}/api-docs`))}`);
    console.log(`• Ambiente: ${process.env.NODE_ENV || 'development'}`);

    // Inicia o gateway serial após o servidor subir
    startSerialGateway(); // ← novo
});

export default app;