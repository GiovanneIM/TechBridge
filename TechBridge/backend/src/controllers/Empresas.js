import EmpresasModel from "../models/Empresas.js";
import UserModel from "../models/User.js";
import { pertenceAEmpresa } from "../utils/validacoes.js";


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
            // E-MAIL EM USO
            const usuarioEmail = UserModel.buscarPorEmail(gerente.email)
            if (usuarioEmail) {
                res.status(409).json({
                    sucesso: false,
                    mensagem: `O e-mail já está em uso`
                });
            }

            // CNPJ EM USO
            const empresaCNPJ = UserModel.buscarPorEmail(gerente.email)
            if (empresaCNPJ) {
                res.status(409).json({
                    sucesso: false,
                    mensagem: `O CNPJ já foi registrado no sistema`
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

    // EXCLUIR UMA EMPRESA
    static async excluirEmpresa(req, res) {
    }

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = 

    // OBTER UMA EMPRESA
    static async obterEmpresa(req, res) {
        // OBTER O ID DA EMPRESA
        const { id_empresa } = req.params;

        try {
            // VERIFICANDO SE O USUÁRIO TEM ACESSO
            const acesso = pertenceAEmpresa(req, id_empresa);
            if (!acesso) {
                return res.status(403).json({
                    sucesso: false,
                    mensagem: 'Você não tem acesso a essa rota'
                });
            }

            // FAZER A CONSULTA
            const empresa = await EmpresasModel.buscarPorId(id_empresa);

            // EMPRESA NÃO ENCONTRADA
            if (!empresa) {
                return res.status(404).json({
                    sucesso: false,
                    mensagem: 'Empresa não encontrada'
                });
            }

            // SUCESSO: ENVIAR EMPRESA
            return res.status(200).json({
                sucesso: true,
                mensagem: 'Empresa obtida com sucesso',
                dados: {
                    empresa
                }
            });

        }
        catch (error) {
            // ERROS:
            console.error('Erro ao obter a empresa:', error);

            // ERRO DO SERVIDOR
            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível obter os dados da empresa'
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

        const dadosEmpresa = {}

        if (cnpj) {
            dadosEmpresa = {
                ...dadosEmpresa,
                cnpj
            }
        }

        if (razao_social) {
            dadosEmpresa = {
                ...dadosEmpresa,
                razao_social
            }
        }

        if (nome_fantasia) {
            dadosEmpresa = {
                ...dadosEmpresa,
                nome_fantasia
            }
        }

        if (endereco && Object.keys(endereco).length > 0) {
            dadosEmpresa = {
                ...dadosEmpresa,
                ...endereco
            }
        }

        try {
            // EMPRESA NÃO ENCONTRADA
            const empresa = await EmpresasModel.buscarPorId(id_empresa);
            if (!empresa) {
                res.status(404).json({
                    sucesso: false,
                    mensagem: 'Empresa não encontrada'
                });
            }

            // ATUALIZAR EMPRESA
            const resultado = await EmpresasModel.atualizar(id, dadosAtualizacao);

            // SUCESSO
            res.status(200).json({
                sucesso: true,
                mensagem: 'Empresa atualizada com sucesso',
                dados: resultado
            });
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

    
}

export default EmpresasController;
