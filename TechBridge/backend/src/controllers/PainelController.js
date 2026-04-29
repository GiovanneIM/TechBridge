import ChamadosModel from '../models/ChamadosModel.js';

// Lista de clientes conectados
let clientes = [];

// Função para notificar clientes
function enviarEvento(data) {
    clientes.forEach(cliente => {
        cliente.res.write(`data: ${JSON.stringify(data)}\n\n`);
    });
}

// CONTROLLER PARA OPERAÇÕES DE AUTENTICAÇÃO
class PainelController {


    // GET /painel - Rota para fazer login
    static async conectar(req, res) {
        try {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Content-Type", "text/event-stream");
            res.setHeader("Cache-Control", "no-cache");
            res.setHeader("Connection", "keep-alive");

            res.flushHeaders();

            const cliente = { id: Date.now(), res };
            clientes.push(cliente);

            console.log("Cliente conectado:", cliente.id);

            req.on("close", () => {
                clientes = clientes.filter(c => c.id !== cliente.id);
                console.log("Cliente desconectado:", cliente.id);
            });

        } catch (error) {
            console.error('Erro ao fazer login:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível conectar ao kanban'
            });
        }
    }

    // GET /painel/chamados
    static async obterChamados(req, res) {
        const options = {};
        const painel = await ChamadosModel.painelChamados(options);
        console.log(painel);
        
        // Respondendo a requisição com os chamados
        res.status(200).json({
            sucesso: true,
            dados: { painel }
        });

    }

}

// Exporta para usar em outros lugares
export function notificarKanban(data) {
    enviarEvento(data);
}

export default PainelController;

