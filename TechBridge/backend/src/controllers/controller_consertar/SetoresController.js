import SetoresModel from "../../models/model_consertar/SetoresModel.js";

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

    /* LISTAR UM SETOR ESPECÍFICO */
    static async listarSetor(req, res) {
        try {
            // Obtendo o id do setor
            const idSetor = parseInt(req.params.idSetor)

            // Chamando o model para fazer a consulta
            const resultado = await SetoresModel.listarSetor(idSetor);

            // Retornando a equipe
            res.status(200).json({
                sucesso: true,
                dados: {
                    setor: resultado.setores
                },
            });
            
        } catch (error) {
            console.error('Erro ao listar o setor:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar o setor'
            });
        }
    }


    /* POST /maquinas - Rota para criar uma maquina */
    static async criarSetor(req, res) { }

    /* PATCH /maquinas/:id - Rota para criar uma maquina */
    static async atualizarSetor(req, res) { }

}

export default SetoresController;