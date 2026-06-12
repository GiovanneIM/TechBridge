import MaquinasModel from "../models/Maquinas.js";
import SetoresModel from "../models/Setores.js";
import { pertenceAEmpresa } from "../utils/validacoes.js";

class MaquinaController {
    // REGISTRAR UMA NOVA MÁQUINA
    static async criar(req, res) {
        // OBTER O ID DA EMPRESA E CÓDIGO DO SETOR
        const { id_empresa, cod_setor } = req.params;

        // OBTER DADOS DA MÁQUINA
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
            // PROCURAR PELO SETOR PARA OBTER O ID
            const setor = await SetoresModel.buscarCodigo(id_empresa, cod_setor);

            // SETOR NAO ENCONTRADO
            if (!setor) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Setor não encontrado',
                    mensagem: `O setor não foi encontrado`,
                });
            }

            // REGISTRAR A MÁQUINA
            const resultado = await MaquinasModel.criar(setor.id, dados);

            // SUCESSO: ENVIAR ID DA MAQUINA
            res.status(201).json({
                sucesso: true,
                mensagem: `Máquina registrada com sucesso - ID ${resultado.id_setor}`,
                dados: resultado
            });

        } catch (error) {
            // ERROS:
            console.error('Erro ao registrar uma máquina:', error);

            // ERRO DO SERVIDOR
            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível registrar a máquina na empresa'
            });
        }

    }

    // LISTAR MAQUINAS DE UMA EMPRESA
    static async listarDaEmpresa(req, res) {
        // OBTER PAGINAÇÃO
        const { page, limit, texto, status, cod_setor } = req.validated.query;

        // OBTER O ID DA EMPRESA
        const { id_empresa } = req.params;

        // VERIFICANDO SE O USUÁRIO TEM ACESSO
        const acesso = pertenceAEmpresa(req, id_empresa);
        if (!acesso) {
            return res.status(403).json({
                sucesso: false,
                mensagem: 'Você não tem acesso a essa rota'
            });
        }

        // CALCULANDO OFFSET
        const offset = (page - 1) * limit;

        // FILTROS
        const where = {};
        const like = {};
        const likeOr = {};

        if (status && status !== 'all') {
            status === 'ativa'
                ? where["m.status"] = true
                : where["m.status"] = false
        }

        if (cod_setor) {
            where["s.cod_setor"] = cod_setor
        }

        if (texto) {
            likeOr["m.nome"] = texto;
            likeOr["s.nome"] = texto;
            likeOr["m.cod_maquina"] = texto;
            likeOr["m.descricao"] = texto;
        }

        try {
            // BUSCANDO MAQUINAS
            const resultado = await MaquinasModel.listarDaEmpresa(id_empresa, limit, offset, page, where, like, likeOr);

            // SUCESSO: ENVIAR MÁQUINAS
            return res.status(200).json({
                sucesso: true,
                mensagem: `Empresa ${id_empresa} - Máquinas listadas com sucesso`,
                dados: resultado,
            });
        }
        catch (error) {
            // ERROS:
            console.error('Erro ao obter as máquinas da empresa:', error);

            // ERRO DO SERVIDOR
            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível obter as máquinas da empresa'
            });
        }
    }

    // LISTAR MAQUINAS DE UM SETOR
    static async listarDoSetor(req, res) {
        // OBTER O ID DA EMPRESA E CÓDIGO DO SETOR
        const { id_empresa, cod_setor } = req.params;

        // VERIFICANDO SE O USUÁRIO TEM ACESSO
        const acesso = pertenceAEmpresa(req, id_empresa);
        if (!acesso) {
            return res.status(403).json({
                sucesso: false,
                mensagem: 'Você não tem acesso a essa rota'
            });
        }

        try {
            // PROCURAR PELO SETOR PARA OBTER O ID
            const setor = await SetoresModel.buscarCodigo(id_empresa, cod_setor);

            // SETOR NAO ENCONTRADO
            if (!setor) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Setor não encontrado',
                    mensagem: `O setor não foi encontrado`,
                });
            }

            // REQUISIÇÃO
            const maquinas = await MaquinasModel.listarDoSetor(setor.id);

            // SUCESSO: ENVIAR MÁQUINAS
            return res.status(200).json({
                sucesso: true,
                mensagem: `Empresa ${id_empresa} - Máquinas listadas com sucesso`,
                dados: { maquinas },
            });
        }
        catch (error) {
            // ERROS:
            console.error('Erro ao obter as máquinas da empresa:', error);

            // ERRO DO SERVIDOR
            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível obter as máquinas da empresa'
            });
        }
    }

    // OBTER UMA MÁQUINA DA EMPRESA
    static async obter(req, res) {
        // OBTER O ID DA EMPRESA, CÓDIGO DO SETOR E CÓDIGO DA MÁQUINA
        const { id_empresa, cod_setor, cod_maquina } = req.params;

        // VERIFICANDO SE O USUÁRIO TEM ACESSO
        const acesso = pertenceAEmpresa(req, id_empresa);
        if (!acesso) {
            return res.status(403).json({
                sucesso: false,
                mensagem: 'Você não tem acesso a essa rota'
            });
        }

        try {
            // PROCURAR PELO SETOR PARA OBTER O ID
            const setor = await SetoresModel.buscarCodigo(id_empresa, cod_setor);

            // SETOR NAO ENCONTRADO
            if (!setor) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Setor não encontrado',
                    mensagem: `O setor não foi encontrado`,
                });
            }

            // REQUISIÇÃO
            const maquina = await MaquinasModel.buscarCodigo(setor.id, cod_maquina);

            // SUCESSO: ENVIAR MÁQUINAS
            return res.status(200).json({
                sucesso: true,
                mensagem: `Empresa ${id_empresa} - Máquina listada com sucesso`,
                dados: { maquina },
            });
        }
        catch (error) {
            // ERROS:
            console.error('Erro ao obter a máquina da empresa:', error);

            // ERRO DO SERVIDOR
            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível obter a máquina da empresa'
            });
        }
    }

    // ATUALIZAR UMA MÁQUINA
    static async atualizar(req, res) { }
}

export default MaquinaController;