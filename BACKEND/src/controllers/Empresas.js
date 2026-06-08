import { removerArquivoAntigo, TIPOS_PASTA } from "../middlewares/uploadMiddleware.js";
import EmpresasModel from "../models/Empresas.js";
import UserModel from "../models/User.js";
import { pertenceAEmpresa } from "../utils/validacoes.js";


class EmpresasController {

    // REGISTAR UMA NOVA EMPRESA
    static async criar(req, res) {
        // OBTER DADOS DA EMPRESA E DO GERENTE PRINCIPAL
        const { empresa, gerente } = req.body;

        const { endereco, ...restoEmpresa } = empresa;

        const dadosEmpresa = {
            ...restoEmpresa,
            ...endereco
        };

        try {
            // E-MAIL EM USO
            const usuarioEmail = await UserModel.buscarPorEmail(gerente.email)
            if (usuarioEmail) {
                res.status(409).json({
                    sucesso: false,
                    erro: 'E-mail em uso',
                    mensagem: `O e-mail já está em uso`
                });
            }

            // CNPJ EM USO
            const empresaCNPJ = await EmpresasModel.buscarPorCNPJ(empresa.cnpj)
            if (empresaCNPJ) {
                res.status(409).json({
                    sucesso: false,
                    mensagem: `O CNPJ já foi registrado no sistema`
                });
            }

            // REGISTRAR EMPRESA
            const resultado = await EmpresasModel.criar(dadosEmpresa, gerente)

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
    static async listar(req, res) {
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
            const resultado = await EmpresasModel.listar(limit, offset, page, where, like, likeOr)

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
    static async excluir(req, res) {
    }

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = 

    // OBTER UMA EMPRESA
    static async obter(req, res) {
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
                    empresa: {
                        ...empresa
                    }
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

    // OBTER DADOS GERAIS DA EMPRESA
    static async infosGerais(req, res) {
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
            const infosGerais = await EmpresasModel.infosGerais(id_empresa);

            // SUCESSO: ENVIAR EMPRESA
            return res.status(200).json({
                sucesso: true,
                mensagem: 'Informações gerais obtidos com sucesso',
                dados: {
                    infosGerais
                }
            });

        }
        catch (error) {
            // ERROS:
            console.error('Erro ao obter as informações gerais da empresa:', error);

            // ERRO DO SERVIDOR
            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível obter as informações gerais da empresa'
            });
        }
    }

    // ATUALIZAR UMA EMPRESA
    static async atualizar(req, res) {
        const { id_empresa } = req.params;

        const {
            cnpj,
            razao_social,
            nome_fantasia,
            endereco
        } = req.body;

        let dadosEmpresa = {}

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
            const resultado = await EmpresasModel.atualizar(id_empresa, dadosEmpresa);

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

    // ATUALIZAR A LOGO DE UMA EMPRESA
    static async atualizarLogo(req, res) {
        try {
            // OBTER O ID DA EMPRESA
            const { id_empresa } = req.params;

            // CASO IMAGEM NÃO TENHA SIDO ENVIADA
            if (!req.file) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: "Nenhuma imagem enviada"
                });
            }

            // EXIBIR INFORMAÇÕES DA IMAGEM
            console.log({
                original: req.file.originalname,
                salvo: req.file.filename,
                tipo: req.file.mimetype,
                tamanho: req.file.size
            });

            // OBTER O NOME DA FOTO
            const nomeFoto = req.file.filename;

            // OBTER A LOGO ANTES DE ATUALIZAR (Para excluir a logo antiga)
            const empresa = await EmpresasModel.buscarPorId(id_empresa)

            // ATUALIZAR A LOGO DA EMPRESA NO BANCO
            await EmpresasModel.atualizarLogo(id_empresa, nomeFoto)

            // REMOVER A LOGO ANTIGA DA EMPRESA
            if (empresa.logo && empresa.logo !== nomeFoto) {
                await removerArquivoAntigo(empresa.logo, id_empresa, TIPOS_PASTA.IMAGENS);
            }

            // SUCESSO
            return res.json({
                sucesso: true,
                mensagem: 'Logo atualizada com sucesso',
                foto: nomeFoto
            });

        } catch (error) {
            // Erro do servidor
            console.error('Erro ao atualizar a logo do usuário:', error);
            return res.status(500).json({
                sucesso: false,
                mensagem: 'Erro ao atualizar a logo do usuário'
            });
        }
    }

}

export default EmpresasController;
