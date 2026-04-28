import EmpresasModel from "../models/EmpresasModel.js";

class EmpresasController {

    // LISTAR EMPRESAS
    static async listarEmpresas(req, res) {
        try {
            // OBTER AS EMPRESAS
            const { empresas } = EmpresasModel.listarEmpresas()

            // SUCESSO: ENVIAR EMPRESAS
            res.status(200).json({
                sucesso: true,
                dados: { empresas }
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
    static async registrarEmpresas(req, res) {
        const { empresa, gerente } = req.body;

        try {
            // VALIDAR DADOS DA NOVA EMPRESA
            const validacaoEmpresa = validarEmpresa(empresa)

            // VALIDAR DADOS DO NOVO GERENTE

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
