import ChamadosModel from "../models/ChamadosModel.js";

class ChamadosController {

    /* GET /chamados - Rota para listar os chamados 
        • Se admin Techbridge, lista todos os chamados
        • Se admin Cliente, lista os chamado da empresa
        • Se Técnico, lista os chamados que ele atendeu
    */
    static async listarChamados(req, res) {
        try {
            // Chamando o model para fazer a consulta
            const resultado = await ChamadosModel.listarChamados();

            // Respondendo a requisição com as equipes
            res.status(200).json({
                sucesso: true,
                dados: { chamados: resultado.chamados }
            });

        } catch (error) {
            console.error('Erro ao listar os chamados:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar os chamados'
            });
        }
    }

    /* GET /chamados/:id - Rota para criar um chamado */
    static async listarChamado(req, res) { }

    /* POST /chamados - Rota para criar um chamado */
    static async criarChamado(req, res) { }

    /* PATCH /chamados/:id - Rota para criar um chamado */
    static async atualizarChamado(req, res) { }

}

export default ChamadosController;