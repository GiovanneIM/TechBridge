import ChamadosModel from "../models/Chamados.js";
import EmpresasModel from "../models/Empresas.js";
import SetoresModel from "../models/Setores.js";
import MaquinasModel from "../models/Maquinas.js";
import { pertenceAEmpresa } from "../utils/validacoes.js";
import { id_setor } from "../schemas/dados/maquina.js";

class ChamadosController {

    // LISTAR CHAMADOS DE UMA EMPRESA
    static async listar(req, res) {
        // OBTER O ID DA EMPRESA
        const { id_empresa } = req.params;
        const { estado } = req.query;

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
            const where = { "c.id_empresa": id_empresa };

            if (estado) { where.estado = estado }

            // BUSCAR CHAMADOS
            const chamados = await ChamadosModel.listar(where);

            // SUCESSO: ENVIAR SETORES
            res.status(200).json({
                sucesso: true,
                mensagem: `Empresa ${id_empresa} - Chamados listados com sucesso`,
                dados: { chamados },
            });
        }
        catch (error) {
            // ERROS:
            console.error('Erro ao obter os chamados da empresa:', error);

            // ERRO DO SERVIDOR
            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível obter os chamados da empresa'
            });
        }
    }

    // LISTAR CHAMADOS DE UM SETOR
    static async listarDoSetor(req, res) {
        // OBTER O ID DA EMPRESA E O CÓDIGO DO SETOR
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
            // OBTENDO O SETOR
            const setor = await SetoresModel.buscarCodigo(id_empresa, cod_setor)

            // BUSCAR CHAMADOS
            const chamados = await ChamadosModel.listar({
                id_empresa,
                id_setor: setor.id
            });

            // SUCESSO: ENVIAR SETORES
            res.status(200).json({
                sucesso: true,
                mensagem: `Empresa ${id_empresa} - Chamados listados com sucesso`,
                dados: { chamados },
            });
        }
        catch (error) {
            // ERROS:
            console.error('Erro ao obter os chamados do setor:', error);

            // ERRO DO SERVIDOR
            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível obter os chamados do setor'
            });
        }
    }

    // LISTAR CHAMADOS DE UMA MAQUINA
    static async listarDaMaquina(req, res) {
        // OBTER O ID DA EMPRESA, O CÓDIGO DO SETOR E O CÓDIGO DA MÁQUINA
        const { id_empresa, cod_setor, cod_maquina } = req.params;

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
            const setor = await SetoresModel.buscarCodigo(id_empresa, cod_setor)
            const maquina = await MaquinasModel.buscarCodigo(setor.id, cod_maquina)

            // BUSCAR CHAMADOS
            const chamados = await ChamadosModel.listar({
                id_empresa,
                id_setor: setor.id,
                id_maquina: maquina.id
            });

            // SUCESSO: ENVIAR SETORES
            res.status(200).json({
                sucesso: true,
                mensagem: `Empresa ${id_empresa} - Chamados listados com sucesso`,
                dados: { chamados },
            });
        }
        catch (error) {
            // ERROS:
            console.error('Erro ao obter os chamados da maquina:', error);

            // ERRO DO SERVIDOR
            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível obter os chamados da maquina'
            });
        }
    }

    // OBTER CHAMADO POR CÓDIGO
    static async obterPorCodigo(req, res) {
        // OBTER O ID DA EMPRESA, O CÓDIGO DO SETOR, O CÓDIGO DA MÁQUINA E O CÓDIGO DO CHAMADO
        const { id_empresa, cod_setor, cod_maquina, cod_chamado } = req.params;

        // VERIFICAR SE O USUÁRIO TEM ACESSO
        const acesso = pertenceAEmpresa(req, id_empresa);
        if (!acesso) {
            return res.status(403).json({
                sucesso: false,
                erro: 'Erro de permissão',
                mensagem: 'Você não tem acesso a essa rota'
            });
        }

        try {
            const setor = await SetoresModel.buscarCodigo(id_empresa, cod_setor)
            const maquina = await MaquinasModel.buscarCodigo(setor.id, cod_maquina)

            // BUSCAR CHAMADOS
            const chamado = await ChamadosModel.buscarPorCodigo({
                "c.id_empresa": id_empresa,
                "c.id_setor": setor.id,
                "c.id_maquina": maquina.id,
                "c.cod_chamado": cod_chamado
            });

            // VERIFICAR SE O CHAMADO FOI ENCONTRADO
            if (!chamado) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Erro ao buscar chamado',
                    mensagem: 'Chamado não foi encontrado'
                });
            }

            // SUCESSO: ENVIAR SETORES
            res.status(200).json({
                sucesso: true,
                mensagem: `Chamado listado com sucesso`,
                dados: { chamado },
            });
        }
        catch (error) {
            // ERROS:
            console.error('Erro ao obter o chamado da empresa:', error);

            // ERRO DO SERVIDOR
            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível obter o chamado da empresa'
            });
        }
    }

    // OBTER CHAMADO POR ID
    static async obterPorID(req, res) {
        // OBTER O ID DA EMPRESA
        const { id_chamado } = req.params;

        try {
            // BUSCAR CHAMADOS
            const chamado = await ChamadosModel.buscarPorId(id_chamado);

            // VERIFICAR SE O CHAMADO FOI ENCONTRADO
            if (!chamado) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Erro ao buscar chamado',
                    mensagem: 'Chamado não foi encontrado'
                });
            }

            // VERIFICAR SE O USUÁRIO TEM ACESSO
            const acesso = pertenceAEmpresa(req, chamado.id_empresa);
            if (!acesso) {
                return res.status(403).json({
                    sucesso: false,
                    erro: 'Erro de permissão',
                    mensagem: 'Você não tem acesso a essa rota'
                });
            }

            // SUCESSO: ENVIAR SETORES
            res.status(200).json({
                sucesso: true,
                mensagem: `Chamado listado com sucesso`,
                dados: { chamado },
            });
        }
        catch (error) {
            // ERROS:
            console.error('Erro ao obter o chamado da empresa:', error);

            // ERRO DO SERVIDOR
            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível obter o chamado da empresa'
            });
        }
    }

    // CRIAR UM CHAMADO
    static async chamar(req, res) {
        /**
         * RECEBER:
         * id_maquina
         */

        const { id_maquina } = req.params;

        try {
            const maquina = await MaquinasModel.buscarPorId(id_maquina)
            const setor = await SetoresModel.buscarPorId(maquina.id_setor)
            const empresa = await EmpresasModel.buscarPorId(req.id_empresa)

            const chamado = {
                id_empresa: empresa.id,
                id_setor: setor.id,
                id_maquina,
            }

            const id_chamado = await ChamadosModel.chamar(chamado);

            return id_chamado;
        } catch (error) {

        }
    }

    // ATENDER UM CHAMADOS
    static async atender(req, res) {
        const { id_chamado } = req.params;
        const { id_tecnico } = req.body;

        const datahora_atendimento = new Date();

        const affectedRows = await ChamadosModel.atualizar(
            id_chamado,
            {
                id_tecnico,
                datahora_atendimento
            }
        );

        if (!affectedRows) {
            return res.status(404).json({
                sucesso: false,
                mensagem: "Chamado não encontrado"
            });
        }

        return res.status(200).json({
            sucesso: true,
            mensagem: "Chamado atendido com sucesso"
        });
    }

    // CONCLUIR UM CHAMADO
    static async concluir(req, res) {
        const { id_chamado } = req.params;

    }

    static async obterDashboard(req, res) {
        try {
            const { options = {} } = req.body;

            const dashboard = await ChamadosModel.obterDashboard(options);

            return res.status(200).json({
                sucesso: true,
                dados: {
                    dashboard
                }
            });

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: error.message
            });
        }
    }

}


function ajustarIntervalo(data) {
    if (!data) return undefined;

    const de = data?.de
        ? new Date(data.de.setHours(0, 0, 0, 0))
        : undefined;

    const ate = data.ate
        ? new Date(data.ate.setHours(23, 59, 59, 999))
        : undefined;

    return { de, ate };
}

export default ChamadosController;