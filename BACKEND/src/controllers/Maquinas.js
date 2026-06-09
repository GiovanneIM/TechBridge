import MaquinasModel from "../models/Maquinas.js";
import SetoresModel from "../models/Setores.js";
import { pertenceAEmpresa } from "../utils/validacoes.js";

class MaquinaController {
    // REGISTRAR UMA NOVA MÁQUINA
    static async criar(req, res) {
        const { id_empresa, cod_setor } = req.params;
        const dados = req.body;

        const acesso = pertenceAEmpresa(req, id_empresa);
        if (!acesso) {
            return res.status(403).json({
                sucesso: false,
                erro: 'Permissão insuficiente',
                mensagem: 'Você não pertence a essa empresa'
            });
        }

        try {
            const setor = await SetoresModel.buscarCodigo(id_empresa, cod_setor);

            if (!setor) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Setor não encontrado',
                    mensagem: `O setor não foi encontrado`,
                });
            }

            const resultado = await MaquinasModel.criar(setor.id, dados);

            res.status(201).json({
                sucesso: true,
                mensagem: `Máquina registrada com sucesso - ID ${resultado.id_setor}`,
                dados: resultado
            });

        } catch (error) {
            console.error('Erro ao registrar uma máquina:', error);
            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível registrar a máquina na empresa'
            });
        }
    }

    // LISTAR MAQUINAS DE UMA EMPRESA
    static async listarDaEmpresa(req, res) {
        const { id_empresa } = req.params;

        const acesso = pertenceAEmpresa(req, id_empresa);
        if (!acesso) {
            return res.status(403).json({
                sucesso: false,
                mensagem: 'Você não tem acesso a essa rota'
            });
        }

        try {
            const maquinas = await MaquinasModel.listarDaEmpresa(id_empresa);
            return res.status(200).json({
                sucesso: true,
                mensagem: `Empresa ${id_empresa} - Máquinas listadas com sucesso`,
                dados: { maquinas },
            });
        } catch (error) {
            console.error('Erro ao obter as máquinas da empresa:', error);
            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível obter as máquinas da empresa'
            });
        }
    }

    // LISTAR MAQUINAS DE UM SETOR
    static async listarDoSetor(req, res) {
        const { id_empresa, cod_setor } = req.params;

        const acesso = pertenceAEmpresa(req, id_empresa);
        if (!acesso) {
            return res.status(403).json({
                sucesso: false,
                mensagem: 'Você não tem acesso a essa rota'
            });
        }

        try {
            const setor = await SetoresModel.buscarCodigo(id_empresa, cod_setor);

            if (!setor) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Setor não encontrado',
                    mensagem: `O setor não foi encontrado`,
                });
            }

            const maquinas = await MaquinasModel.listarDoSetor(setor.id);

            return res.status(200).json({
                sucesso: true,
                mensagem: `Empresa ${id_empresa} - Máquinas listadas com sucesso`,
                dados: { maquinas },
            });
        } catch (error) {
            console.error('Erro ao obter as máquinas da empresa:', error);
            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível obter as máquinas da empresa'
            });
        }
    }

    // OBTER UMA MÁQUINA DA EMPRESA
    static async obter(req, res) {
        const { id_empresa, cod_setor, cod_maquina } = req.params;

        const acesso = pertenceAEmpresa(req, id_empresa);
        if (!acesso) {
            return res.status(403).json({
                sucesso: false,
                mensagem: 'Você não tem acesso a essa rota'
            });
        }

        try {
            const setor = await SetoresModel.buscarCodigo(id_empresa, cod_setor);

            if (!setor) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Setor não encontrado',
                    mensagem: `O setor não foi encontrado`,
                });
            }

            const maquina = await MaquinasModel.buscarCodigo(setor.id, cod_maquina);

            return res.status(200).json({
                sucesso: true,
                mensagem: `Empresa ${id_empresa} - Máquina listada com sucesso`,
                dados: { maquina },
            });
        } catch (error) {
            console.error('Erro ao obter a máquina da empresa:', error);
            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível obter a máquina da empresa'
            });
        }
    }

    // ATUALIZAR UMA MÁQUINA
    static async atualizar(req, res) { }

    // DELETAR UMA MÁQUINA (Adicionado)
    static async deletar(req, res) {
        const { id_empresa, id_maquina } = req.params;

        const acesso = pertenceAEmpresa(req, id_empresa);
        if (!acesso) {
            return res.status(403).json({
                sucesso: false,
                mensagem: 'Você não tem acesso a essa rota'
            });
        }

        try {
            // Assumindo que seu MaquinasModel possui o método deletar/excluir por ID
            await MaquinasModel.deletar(id_maquina); 

            return res.status(200).json({
                sucesso: true,
                mensagem: 'Máquina deletada com sucesso do banco de dados'
            });
        } catch (error) {
            console.error('Erro ao deletar máquina:', error);
            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível deletar a máquina'
            });
        }
    }
}

export default MaquinaController;