import { create } from '../config/database.js';

// Middleware para registrar logs de acesso
export const logMiddleware = async (req, res, next) => {
    const startTime = Date.now();
    
    // Capturar dados da requisição (sem id_usuario ainda, será capturado na resposta)
    const logData = {
        rota: req.originalUrl,
        metodo: req.method,
        ip_address: req.ip || req.connection.remoteAddress || req.socket.remoteAddress,
        user_agent: req.get('User-Agent'),
        dados_requisicao: null
    };

    // Interceptar a resposta para capturar status code, tempo e usuário (após authMiddleware executar)
    const originalSend = res.send;
    const originalJson = res.json;
    
    res.send = function(data) {
        // Capturar dados atualizados no momento da resposta (após todos os middlewares executarem)
        const finalLogData = {
            ...logData,
            status_code: res.statusCode,
            tempo_resposta_ms: Date.now() - startTime
        };
        
        // Capturar usuário se autenticado (após authMiddleware ter executado)
        if (req.usuario && req.usuario.id) {
            finalLogData.id_usuario = req.usuario.id;
        }
        
        // Capturar dados da resposta (limitado para evitar logs muito grandes)
        if (res.statusCode >= 400) {
            finalLogData.dados_resposta = JSON.stringify({
                error: true,
                status: res.statusCode,
                message: typeof data === 'string' ? data.substring(0, 500) : data
            });
        }
        
        // Salvar log de forma assíncrona (não bloquear a resposta)
        saveLog(finalLogData).catch(error => {
            console.error('Erro ao salvar log:', error);
        });
        
        return originalSend.call(this, data);
    };
    
    res.json = function(data) {
        // Capturar dados atualizados no momento da resposta (após todos os middlewares executarem)
        const finalLogData = {
            ...logData,
            status_code: res.statusCode,
            tempo_resposta_ms: Date.now() - startTime
        };
        
        // Capturar usuário se autenticado (após authMiddleware ter executado)
        if (req.usuario && req.usuario.id) {
            finalLogData.id_usuario = req.usuario.id;
        }
        
        // Capturar dados da resposta (limitado para evitar logs muito grandes)
        if (res.statusCode >= 400) {
            finalLogData.dados_resposta = JSON.stringify({
                error: true,
                status: res.statusCode,
                message: typeof data === 'object' ? JSON.stringify(data).substring(0, 500) : data
            });
        }
        
        // Salvar log de forma assíncrona (não bloquear a resposta)
        saveLog(finalLogData).catch(error => {
            console.error('Erro ao salvar log:', error);
        });
        
        return originalJson.call(this, data);
    };

    next();
};

// Função para sanitizar dados sensíveis do body
function sanitizeRequestBody(body) {
    if (!body || typeof body !== 'object') return body;
    
    const sanitized = { ...body };
    
    // Remover campos sensíveis
    const sensitiveFields = ['senha', 'password', 'token', 'authorization'];
    sensitiveFields.forEach(field => {
        if (sanitized[field]) {
            sanitized[field] = '[REDACTED]';
        }
    });
    
    return sanitized;
}

// Função para salvar o log no banco de dados
async function saveLog(logData) {
    try {
        // console.log(logData);
        const normalized = normalizeLogData(logData);
        console.log(normalized);
        
        await create('logs', normalized);
    } catch (error) {
        console.error('Erro ao inserir log no banco:', error);
    }
}

function normalizeLogData(data) {
    return {
        rota: data.rota || null,
        metodo: data.metodo || null,
        ip_address: data.ip_address || null,
        user_agent: data.user_agent || null,
        dados_requisicao: data.dados_requisicao 
            ? JSON.stringify(data.dados_requisicao) 
            : null,
        status_code: data.status_code ?? null,
        tempo_resposta_ms: data.tempo_resposta_ms ?? null,
        id_usuario: data.id_usuario ?? null,
        dados_resposta: data.dados_resposta
            ? (typeof data.dados_resposta === 'string'
                ? data.dados_resposta
                : JSON.stringify(data.dados_resposta))
            : null
    };
}


// Middleware para logs simples (apenas console)
export const simpleLogMiddleware = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const usuario = req.usuario ? `[${req.usuario.email}]` : '[Anônimo]';
    
    console.log(`${timestamp} - ${req.method} ${req.originalUrl} ${usuario} - IP: ${req.ip || 'N/A'}`);
    
    next();
};
