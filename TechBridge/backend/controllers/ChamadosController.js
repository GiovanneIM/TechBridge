import ChamadosModel from "../models/ChamadosModel.js";

class ChamadosController {

    /* LISTAR TODOS OS CHAMADOS */
    static async listarTodosChamados(req, res) {
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

}

export default ChamadosController;