import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from '../config/jwt.js';
import { CARGOS } from '../utils/validacoes.js';

// Middleware de autenticação JWT
const authMiddleware = (req, res, next) => {
    try {
        let token;

        // Tenta pegar token do cookie
        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        // Se não encontrar no cookie, tenta pegar no header
        else if (req.headers.authorization) {
            const authHeader = req.headers.authorization;
            token = authHeader.split(' ')[1];
        }

        // Nenhum token encontrado
        if (!token) {
            return res.status(401).json({
                sucesso: false,
                erro: 'Token não fornecido',
                mensagem: 'É necessário autenticação'
            });
        }

        // Verificar token
        const decoded = jwt.verify(token, JWT_CONFIG.secret);

        req.usuario = {
            id: decoded.id,
            email: decoded.email,
            tipo_usuario: decoded.tipo_usuario,
            id_empresa: decoded.id_empresa
        };

        next();

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                sucesso: false,
                erro: 'Token expirado',
                mensagem: 'Faça login novamente'
            });
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                sucesso: false,
                erro: 'Token inválido',
                mensagem: 'Token de autenticação inválido'
            });
        }

        console.error('Erro no middleware:', error);
        return res.status(500).json({
            sucesso: false,
            erro: 'Erro do servidor',
            erro: 'Erro interno do servidor'
        });
    }
};

// MIDDLEWARE - USER É ADMIN
const adminMiddleware = (req, res, next) => {    
    if (req.usuario.tipo_usuario !== CARGOS.ADMIN) {
        return res.status(403).json({
            sucesso: false,
            erro: 'Acesso negado',
            mensagem: 'Apenas administradores podem acessar este recurso'
        });
    }
    next();
};

// MIDDLEWARE - USER É GERENTE PRINCIPAL
const gerentePrincipalMiddleware = (req, res, next) => {    
    if (req.usuario.tipo_usuario > CARGOS.GERENTE_PRINCIPAL) {
        return res.status(403).json({
            sucesso: false,
            erro: 'Acesso negado',
            mensagem: 'Voce não tem acesso a este recurso'
        });
    }
    next();
};


// MIDDLEWARE - USER É GERENTE
const gerenteMiddleware = (req, res, next) => {    
    if (req.usuario.tipo_usuario > CARGOS.GERENTE) {
        return res.status(403).json({
            sucesso: false,
            erro: 'Acesso negado',
            mensagem: 'Voce não tem acesso a este recurso'
        });
    }
    next();
};


export { 
    authMiddleware, 
    adminMiddleware, 
    gerentePrincipalMiddleware,
    gerenteMiddleware
};

