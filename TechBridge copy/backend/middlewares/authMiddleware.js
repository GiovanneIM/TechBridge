import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from '../config/jwt.js';

// Middleware de autenticação JWT
const authMiddleware = (req, res, next) => {
    try {
        let token;

        // 🔹 1. Tenta pegar do cookie
        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        // 🔹 2. Fallback: Authorization header
        else if (req.headers.authorization) {
            const authHeader = req.headers.authorization;
            token = authHeader.split(' ')[1];
        }

        // ❌ Nenhum token encontrado
        if (!token) {
            return res.status(401).json({
                erro: 'Token não fornecido',
                mensagem: 'É necessário autenticação'
            });
        }

        // 🔐 Verificar token
        const decoded = jwt.verify(token, JWT_CONFIG.secret);

        req.usuario = {
            id: decoded.id,
            tipo: decoded.tipo,
            email: decoded.email
        };

        next();

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                erro: 'Token expirado',
                mensagem: 'Faça login novamente'
            });
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                erro: 'Token inválido',
                mensagem: 'Token de autenticação inválido'
            });
        }

        console.error('Erro no middleware:', error);
        return res.status(500).json({
            erro: 'Erro interno do servidor'
        });
    }
};

// Middleware para verificar se o usuário é administrador
const adminMiddleware = (req, res, next) => {
    if (req.usuario.tipo !== 1) {
        return res.status(403).json({ 
            erro: 'Acesso negado',
            mensagem: 'Apenas administradores podem acessar este recurso'
        });
    }
    next();
};

export { authMiddleware, adminMiddleware, };

