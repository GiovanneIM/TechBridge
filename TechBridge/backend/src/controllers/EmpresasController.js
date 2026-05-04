import EmpresasModel from "../models/EmpresasModel.js";
import UserModel from "../models/UserModel.js";

class EmpresasController {

    // REGISTAR UMA NOVA EMPRESA
    static async criarEmpresa(req, res) {
        // OBTER DADOS DA EMPRESA E DO GERENTE PRINCIPAL
        const { empresa, gerente } = req.body;

        const { endereco, ...restoEmpresa } = empresa;

        const dadosEmpresa = {
            ...restoEmpresa,
            ...endereco
        };

        try {
            // VERIFICAR SE O E-MAIL ESTÁ DISPONÍVEL
            const usuarioEmail = UserModel.buscarPorEmail(gerente.email)

            // E-MAIL EM USO
            if (usuarioEmail) {
                res.status(409).json({
                    sucesso: false,
                    mensagem: `O e-mail já está em uso`
                });
            }

            // REGISTRAR EMPRESA
            const resultado = await EmpresasModel.criarEmpresa(dadosEmpresa, gerente)

            // SUCESSO: ENVIAR ID DA EMPRESA
            res.status(201).json({
                sucesso: true,
                mensagem: `Empresa registrada com sucesso - ID ${resultado.id_empresa}`,
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
                mensagem: 'Não foi possível registrar a empresa'
            });
        }
    }

    // LISTAR EMPRESAS (COM PAGINAÇÃO)
    static async listarEmpresas(req, res) {
        // OBTER PAGINAÇÃO
        const { page, limit, status, nome_empresa, estado } = req.validated.query;

        // CALCULANDO OFFSET
        const offset = (page - 1) * limit;

        // FILTROS
        const where = {};
        const like = {};
        const likeOr = {};

        if (status && status !== 'all') {
            status === 'ativa'
                ? where.status = true
                : where.status = false
        }

        if (estado) {
            like.estado = estado
        }

        if (nome_empresa) {
            likeOr.nome_fantasia = nome_empresa;
            likeOr.razao_social = nome_empresa;
        }

        try {
            // OBTER AS EMPRESAS
            const resultado = await EmpresasModel.listarEmpresas(limit, offset, page, where, like, likeOr)

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

        }
        catch (error) {
            // ERROS:
            console.error('Erro ao atualizar a empresa:', error);

            // ERRO DO SERVIDOR
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível atualizar a empresa'
            });
        }


    }

    // EXCLUIR UMA EMPRESA
    static async excluirEmpresa(req, res) {
    }
}

export default EmpresasController;
