import MaquinasModel from "../models/MaquinasModel.js";

class MaquinasController {

    /* GET /maquinas - Rota para listar as maquinas 
        • Se admin Techbridge, lista todos os maquinas
        • Se admin Cliente, lista as maquinas da empresa
        • Se Técnico, lista as maquinas que ele atendeu
    */
    static async listarMaquinas(req, res) {
        try {
            // Chamando o model para fazer a consulta
            const resultado = await MaquinasModel.listarMaquinas();

            // Respondendo a requisição com as equipes
            res.status(200).json({
                sucesso: true,
                dados: { maquinas: resultado.maquinas }
            });

        } catch (error) {
            console.error('Erro ao listar os maquinas:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar as maquinas'
            });
        }
    }

    /* GET /maquinas - Rota para listar as maquinas*/
    static async listarMaquina(req, res) { }

    /* POST /maquinas - Rota para criar uma maquina */
    static async criarMaquina(req, res) { }

    /* PATCH /maquinas/:id - Rota para criar uma maquina */
    static async atualizarMaquina(req, res) { }

}

export default MaquinasController;