import SetoresModel from "../models/Setores.js";
import { pertenceAEmpresa } from "../utils/validacoes.js";

class SetoresController {
    // REGISTRAR SETOR
    static async criar(req, res) {
        // OBTER O ID DA EMPRESA
        const { id_empresa } = req.params;

        // OBTER DADOS DA EMPRESA
        const dados = req.body;

        // VERIFICANDO SE O USUÁRIO TEM ACESSO
        const acesso = pertenceAEmpresa(req, id_empresa);
        if (!acesso) {
            return res.status(403).json({
                sucesso: false,
                erro: 'Permissão insuficiente',
                mensagem: 'Você não pertence a esssa empresa'
            });
        }

        try {
            // CÓDIGO EM USO NA EMPRESA
            const setorCod = await SetoresModel.buscarCodigo(id_empresa, dados.cod_setor);
            if (setorCod) {
                return res.status(409).json({
                    sucesso: false,
                    erro: 'Código em uso',
                    mensagem: 'O código já está em uso por outro setor'
                });
            }

            // REGISTRAR O SETOR
            const setor = await SetoresModel.criar(id_empresa, dados);

            // SUCESSO: ENVIAR ID DO SETOR
            res.status(201).json({
                sucesso: true,
                mensagem: `Setor registrado com sucesso`,
                dados: setor
            });

        } catch (error) {
            // ERROS:
            console.error('Erro ao registrar um setor:', error);

            // ERRO DO SERVIDOR
            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível registrar o setor na empresa'
            });
        }

    }

    // LISTAR SETORES DE UMA EMPRESA
    static async listar(req, res) {
        // OBTER PAGINAÇÃO
        const { page, limit, texto, status } = req.validated.query;

        // OBTER O ID DA EMPRESA
        const { id_empresa } = req.params;

        // VERIFICANDO SE O USUÁRIO TEM ACESSO
        const acesso = pertenceAEmpresa(req, id_empresa);
        if (!acesso) {
            return res.status(403).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Você não tem acesso a essa rota'
            });
        }

        // CALCULANDO OFFSET
        const offset = (page - 1) * limit;

        // FILTROS
        const where = { "id_empresa": id_empresa };
        const like = {};
        const likeOr = {};

        if (status && status !== 'all') {
            status === 'ativa'
                ? where["status"] = true
                : where["status"] = false
        }

        if (texto) {
            likeOr["nome"] = texto;
            likeOr["cod_setor"] = texto;
            likeOr["descricao"] = texto;
        }

        try {
            // BUSCAR SETORES
            const resultado = await SetoresModel.listar(id_empresa, limit, offset, page, where, like, likeOr);

            // SUCESSO: ENVIAR SETORES
            res.status(200).json({
                sucesso: true,
                mensagem: `Empresa ${id_empresa} - Setores listados com sucesso`,
                dados: resultado,
            });
        }
        catch (error) {
            // ERROS:
            console.error('Erro ao obter os setores da empresa:', error);

            // ERRO DO SERVIDOR
            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível obter os setores da empresa'
            });
        }
    }

    // OBTER UM SETOR DE UMA EMPRESA
    static async obter(req, res) {
        // OBTER O ID DA EMPRESA
        const { id_empresa, cod_setor } = req.params;

        // VERIFICANDO SE O USUÁRIO TEM ACESSO
        const acesso = pertenceAEmpresa(req, id_empresa);
        if (!acesso) {
            return res.status(403).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Você não tem acesso a essa rota'
            });
        }

        try {
            // BUSCAR SETOR
            const setor = await SetoresModel.buscarCodigo(id_empresa, cod_setor);

            // SETOR NAO ENCONTRADO
            if (!setor) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Setor não encontrado',
                    mensagem: `O setor procurado não foi encontrado`,
                });
            }

            // SUCESSO: ENVIAR SETORES
            res.status(200).json({
                sucesso: true,
                mensagem: `Empresa ${id_empresa} - Setor ${cod_setor} obtido com sucesso`,
                dados: setor,
            });
        }
        catch (error) {
            // ERROS:
            console.error('Erro ao obter o setor da empresa:', error);

            // ERRO DO SERVIDOR
            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível obter os setores da empresa'
            });
        }
    }

    // ATUALIZAR UM SETOR
    static async atualizar(req, res) { }

    // OBTER DADOS GERAIS DA EMPRESA
    static async infosGerais(req, res) {
        // OBTER O ID DA EMPRESA E CÓDIGO DO SETOR
        const { id_empresa, cod_setor } = req.params;

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
            const infosGerais = await SetoresModel.infosGerais(id_empresa, cod_setor);

            // SUCESSO: ENVIAR EMPRESA
            return res.status(200).json({
                sucesso: true,
                mensagem: 'Informações gerais do setor obtidas com sucesso',
                dados: {
                    infosGerais
                }
            });

        }
        catch (error) {
            // ERROS:
            console.error('Erro ao obter as informações gerais do setor:', error);

            // ERRO DO SERVIDOR
            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível obter as informações gerais do setor'
            });
        }
    }
}

export default SetoresController;