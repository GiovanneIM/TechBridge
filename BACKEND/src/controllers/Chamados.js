import ChamadosModel from "../models/Chamados.js";
import EmpresasModel from "../models/Empresas.js";
import SetoresModel from "../models/Setores.js";
import MaquinasModel from "../models/Maquinas.js";
import UserModel from "../models/User.js";
import { pertenceAEmpresa } from "../utils/validacoes.js";

class ChamadosController {

    // LISTAR CHAMADOS DE UMA EMPRESA
    static async listar(req, res) {
        const { id_empresa } = req.params;
        const { estado } = req.query;

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

            const chamados = await ChamadosModel.listar(where);

            res.status(200).json({
                sucesso: true,
                mensagem: `Empresa ${id_empresa} - Chamados listados com sucesso`,
                dados: { chamados },
            });
        }
        catch (error) {
            console.error('Erro ao obter os chamados da empresa:', error);
            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível obter os chamados da empresa'
            });
        }
    }

    // LISTAR CHAMADOS DE UM SETOR
    static async listarDoSetor(req, res) {
        const { id_empresa, cod_setor } = req.params;

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

            const chamados = await ChamadosModel.listar({
                id_empresa,
                id_setor: setor.id
            });

            res.status(200).json({
                sucesso: true,
                mensagem: `Empresa ${id_empresa} - Chamados listados com sucesso`,
                dados: { chamados },
            });
        }
        catch (error) {
            console.error('Erro ao obter os chamados do setor:', error);
            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível obter os chamados do setor'
            });
        }
    }

    // LISTAR CHAMADOS DE UMA MAQUINA
    static async listarDaMaquina(req, res) {
        const { id_empresa, cod_setor, cod_maquina } = req.params;

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

            const chamados = await ChamadosModel.listar({
                id_empresa,
                id_setor: setor.id,
                id_maquina: maquina.id
            });

            res.status(200).json({
                sucesso: true,
                mensagem: `Empresa ${id_empresa} - Chamados listados com sucesso`,
                dados: { chamados },
            });
        }
        catch (error) {
            console.error('Erro ao obter os chamados da maquina:', error);
            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível obter os chamados da maquina'
            });
        }
    }

    // OBTER CHAMADO POR CÓDIGO
    static async obterPorCodigo(req, res) {
        const { id_empresa, cod_setor, cod_maquina, cod_chamado } = req.params;

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

            const chamado = await ChamadosModel.buscarPorCodigo({
                "c.id_empresa": id_empresa,
                "c.id_setor": setor.id,
                "c.id_maquina": maquina.id,
                "c.cod_chamado": cod_chamado
            });

            if (!chamado) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Erro ao buscar chamado',
                    mensagem: 'Chamado não foi encontrado'
                });
            }

            res.status(200).json({
                sucesso: true,
                mensagem: `Chamado listado com sucesso`,
                dados: { chamado },
            });
        }
        catch (error) {
            console.error('Erro ao obter o chamado da empresa:', error);
            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível obter o chamado da empresa'
            });
        }
    }

    // OBTER CHAMADO POR ID
    static async obterPorID(req, res) {
        const { id_chamado } = req.params;

        try {
            const chamado = await ChamadosModel.buscarPorId(id_chamado);

            if (!chamado) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Erro ao buscar chamado',
                    mensagem: 'Chamado não foi encontrado'
                });
            }

            const acesso = pertenceAEmpresa(req, chamado.id_empresa);
            if (!acesso) {
                return res.status(403).json({
                    sucesso: false,
                    erro: 'Erro de permissão',
                    mensagem: 'Você não tem acesso a essa rota'
                });
            }

            res.status(200).json({
                sucesso: true,
                mensagem: `Chamado listado com sucesso`,
                dados: { chamado },
            });
        }
        catch (error) {
            console.error('Erro ao obter o chamado da empresa:', error);
            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível obter o chamado da empresa'
            });
        }
    }

    // CRIAR UM CHAMADO
    static async chamar(req, res) {
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
            console.error('Erro ao criar chamado:', error);
        }
    }

    // ATENDER UM CHAMADO
    static async atender(req, res) {
        const { id_chamado } = req.params;
        const { id_tecnico } = req.body;

        const datahora_atendimento = new Date();

        const affectedRows = await ChamadosModel.atualizar(
            id_chamado,
            { id_tecnico, datahora_atendimento }
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
                dados: { dashboard }
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

    // EDITAR UM CHAMADO
    static async editar(req, res) {
        const { id_chamado } = req.params;

        const {
            descricao_problema,
            estado,
            id_tecnico,       // pode chegar como cod_usuario (string) ou id (number)
            solucao_aplicada,
            comentario_tecnico,
            operador
        } = req.body;

        try {
            const chamado = await ChamadosModel.buscarPorId(id_chamado);

            if (!chamado) {
                return res.status(404).json({
                    sucesso: false,
                    mensagem: "Chamado não encontrado"
                });
            }

            const acesso = pertenceAEmpresa(req, chamado.id_empresa);
            if (!acesso) {
                return res.status(403).json({
                    sucesso: false,
                    mensagem: "Você não tem acesso a esse chamado"
                });
            }

            const novosDados = {};

            if (descricao_problema !== undefined)
                novosDados.descricao_problema = descricao_problema;

            if (solucao_aplicada !== undefined)
                novosDados.solucao_aplicada = solucao_aplicada;

            if (comentario_tecnico !== undefined)
                novosDados.comentario_tecnico = comentario_tecnico;

            if (operador !== undefined)
                novosDados.operador = operador;

            // RESOLVER id_tecnico: aceita cod_usuario (string) ou id (number)
            if (id_tecnico !== undefined) {
                const idNumerico = Number(id_tecnico);

                if (!isNaN(idNumerico) && Number.isInteger(idNumerico)) {
                    // JÁ É UM ID NUMÉRICO — USA DIRETO
                    novosDados.id_tecnico = idNumerico;
                } else {
                    // É UM cod_usuario — BUSCA O ID REAL
                    const tecnico = await UserModel.buscarPorCodigo(id_tecnico);

                    if (!tecnico) {
                        return res.status(404).json({
                            sucesso: false,
                            mensagem: `Técnico com código '${id_tecnico}' não encontrado`
                        });
                    }

                    novosDados.id_tecnico = tecnico.id;
                }
            }

            // REGRA AUTOMÁTICA DE STATUS
            if (estado !== undefined && estado !== chamado.estado) {
                novosDados.estado = estado;

                const agora = new Date();

                if (estado === "andamento") {
                    novosDados.datahora_atendimento = agora;
                }

                if (estado === "concluido") {
                    novosDados.datahora_conclusao = agora;
                }
            }

            const affectedRows = await ChamadosModel.atualizar(
                id_chamado,
                novosDados
            );

            return res.status(200).json({
                sucesso: true,
                mensagem: "Chamado atualizado com sucesso",
                dados: { affectedRows }
            });

        } catch (error) {
            console.error("Erro ao editar chamado:", error);
            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro interno do servidor"
            });
        }
    }

    // EXCLUIR UM CHAMADO
    static async excluir(req, res) {
        const { id_chamado } = req.params;

        try {
            const chamado = await ChamadosModel.buscarPorId(id_chamado);

            if (!chamado) {
                return res.status(404).json({
                    sucesso: false,
                    mensagem: "Chamado não encontrado"
                });
            }

            const acesso = pertenceAEmpresa(req, chamado.id_empresa);
            if (!acesso) {
                return res.status(403).json({
                    sucesso: false,
                    mensagem: "Você não tem acesso a esse chamado"
                });
            }

            const affectedRows = await ChamadosModel.excluir(id_chamado);

            if (!affectedRows) {
                return res.status(404).json({
                    sucesso: false,
                    mensagem: "Nada foi deletado"
                });
            }

            return res.status(200).json({
                sucesso: true,
                mensagem: "Chamado excluído com sucesso"
            });

        } catch (error) {
            console.error("Erro ao excluir chamado:", error);
            return res.status(500).json({
                sucesso: false,
                mensagem: error.message,
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