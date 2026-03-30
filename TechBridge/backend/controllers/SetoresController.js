import SetoresModel from "../models/SetoresModel.js";

class SetoresController {

    static async listarSetores(req, res) {
        try {
            // Chamando o model para fazer a consulta
            const resultado = await SetoresModel.listarSetores();

            // Respondendo a requisição com as equipes
            res.status(200).json({
                sucesso: true,
                dados: { setores: resultado.setores }
            });

        } catch (error) {
            console.error('Erro ao listar os setores:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar os setores'
            });
        }
    }


    /* POST /maquinas - Rota para criar uma maquina */
    static async criarSetor(req, res) { }

    /* PATCH /maquinas/:id - Rota para criar uma maquina */
    static async atualizarSetor(req, res) { }

}

export default SetoresController;