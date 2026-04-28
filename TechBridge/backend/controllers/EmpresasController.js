import EmpresasModel from "../models/EmpresasModel.js";

class EmpresasController {

    // LISTAR EMPRESAS (COM PAGINAÇÃO)
    static async listarEmpresas(req, res) {
        try {
            // OBTER PAGINAÇÃO
            const { page, limit } = req.query;

            // CALCULANDO OFFSET
            const offset = (page - 1) * limit;

            // OBTER AS EMPRESAS
            const resultado = await EmpresasModel.listarEmpresas(limit, offset)

            // SUCESSO: ENVIAR EMPRESAS
            res.status(200).json({
                sucesso: true,
                mensagem: `Empresas listadas com sucesso - página ${page}`,
                dados: resultado
            });

        } catch (error) {
            // ERROS:
            console.error('Erro ao listar as empresas:', error);

            // ERRO DO SERVIDOR
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar as empresas'
            });
        }
    }

    // REGISTAR UMA NOVA EMPRESA
    static async criarEmpresa(req, res) {
        const { empresa, gerente } = req.body;

        try {

        }
        catch {
        }
    }

    static async atualizarEmpresas(req, res) {
        const {
            cnpj,
            razao_social,
            nome_fantasia,
            endereco
        } = req.body;


    }
}

export default EmpresasController;
