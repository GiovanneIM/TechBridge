import EmpresasModel from "../models/EmpresasModel.js";

class EmpresasController {

    // REGISTAR UMA NOVA EMPRESA
    static async criarEmpresa(req, res) {
        // OBTER DADOS DA EMPRESA E DO GERENTE PRINCIPAL
        const { empresa, gerente } = req.body;

        const dadosEmpresa = {
            ...empresa,
            ...empresa.endereco,
            endereco: null
        }

        try {
            // REGISTRAR EMPRESA
            const id_empresa = await EmpresasModel.criarEmpresa(dadosEmpresa, gerente)

            // SUCESSO: ENVIAR ID DA EMPRESA
            res.status(201).json({
                sucesso: true,
                mensagem: `Empresas registrada com sucesso - ID ${id_empresa}`,
                dados: { id_empresa }
            });
        }
        catch (error) {
            // ERROS:
            console.error('Erro ao listar as empresas:', error);

            // ERRO DO SERVIDOR
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível registrar a empresa'
            });
        }
    }

    // LISTAR EMPRESAS (COM PAGINAÇÃO)
    static async listarEmpresas(req, res) {
        // OBTER PAGINAÇÃO
        const { page, limit } = req.query;

        // CALCULANDO OFFSET
        const offset = (page - 1) * limit;

        try {
            // OBTER AS EMPRESAS
            const resultado = await EmpresasModel.listarEmpresas(limit, offset)

            // SUCESSO: ENVIAR EMPRESAS
            res.status(200).json({
                sucesso: true,
                mensagem: `Empresas listadas com sucesso - página ${page}`,
                dados: resultado
            });
        }
        catch (error) {
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

    // ATUALIZAR UM EMPRESA
    static async atualizarEmpresa(req, res) {
        const {
            cnpj,
            razao_social,
            nome_fantasia,
            endereco
        } = req.body;

        const dadosEmpresa = {
            cnpj,
            razao_social,
            nome_fantasia,
            ...endereco
        }

        try {
            // OBTER AS EMPRESAS
            const resultado = await EmpresasModel.listarEmpresas(limit, offset)

            // SUCESSO: ENVIAR EMPRESAS
            res.status(200).json({
                sucesso: true,
                mensagem: `Empresas listadas com sucesso - página ${page}`,
                dados: resultado
            });

        }
        catch (error) {
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

    static async excluirEmpresa(req, res) {
    }
}

export default EmpresasController;
