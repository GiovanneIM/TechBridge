import ChamadosModel from "../models/ChamadosModel.js";
import { notificarKanban } from "./PainelController.js";

class ChamadosController {

    /* GET /chamados - Rota para listar os chamados 
        • Se o usuário é um admin TechBridge, lista os chamados de todas as empresas
        • Se o usuário é um admin Cliente, lista os chamados que pertencerem à empresa
        • Se o usuário é um técnico, lista os chamados que pertencerem à empresa e que ele tiver atendido
    */
    static async listarChamados(req, res) {
        try {
            // Opções da consulta
            const options = req.body.options || {};
            options.where = options.where || {};

            // Paginação
            options.limit = Math.min(Number(options.limit ?? 15), 100);
            options.page = Math.max(Number(options.page ?? 1), 1);
            options.offset = (options.page - 1) * options.limit;


            // Limitando os chamados de acordo com o tipo de usuário
            switch (req.usuario.tipo_usuario) {
                // ADM Cliente: lista apenas os chamados da empresa dele
                case 2:
                    options.where.id_empresa = req.usuario.id_empresa;
                    break;

                // Técnico: lista apenas os chamados que ele atendeu
                case 3:
                    options.where.id_empresa = req.usuario.id_empresa;
                    options.where.id_tecnico = req.usuario.id;
                    break;

            }

            // Fazendo a consulta
            const resultado = await ChamadosModel.listarChamados(options);

            // Resposta com sucesso
            res.status(200).json({
                sucesso: true,
                dados: {
                    chamados: resultado.chamados,
                    total: resultado.total,
                    totalPaginas: resultado.numPaginas,
                    paginaAtual: options.page,
                    limite: options.limit,
                }
            });

        } catch (error) {
            // Erro do servidor
            console.error('Erro ao listar os chamados:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar os chamados'
            });
        }
    }

    /* GET /chamados/:id - Rota para listar um chamado específico
        • Se o usuário é um admin TechBridge, lista de qualquer jeito
        • Se o usuário é um admin Cliente, lista apenas se pertencer à empresa
        • Se o usuário é um técnico, lista apenas se pertencer à empresa e ele tiver atendido
    */
    static async listarChamado(req, res) {
        try {
            // Obtendo o id
            const id = Number(req.params.id);

            // Se o ID não for número
            if (isNaN(id)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: "ID inválido",
                    mensagem: "O ID deve ser um número"
                });
            }

            options.where.id = id;

            // Limitando os chamados de acordo com o tipo de usuário
            switch (req.usuario.tipo_usuario) {
                // Se é um ADM Cliente, lista apenas os chamados da empresa dele
                case 2:
                    options.where.id_empresa = req.usuario.id_empresa;
                    break;

                // Se é um técnico, lista apenas os chamados que ele atendeu
                case 3:
                    options.where.id_empresa = req.usuario.id_empresa;
                    options.where.id_tecnico = req.usuario.id_usuario;
                    break;
            }

            // Chamando o model para fazer a consulta
            const resultado = await ChamadosModel.listarChamado(options);

            // Obtendo o chamado
            const chamado = resultado.chamados[0];

            // Se o chamado não foi encontrado
            if (!chamado) {
                return res.status(404).json({
                    sucesso: false,
                    erro: "Não encontrado",
                    mensagem: "Chamado não encontrado ou sem permissão"
                });
            }

            // Respondendo a requisição com o chamado
            res.status(200).json({
                sucesso: true,
                dados: { chamado }
            });

        } catch (error) {
            // Erro do servidor
            console.error('Erro ao listar o chamado:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar o chamado'
            });
        }
    }

    /* POST /chamados - Rota para criar um chamado 
        • Dados a receber:
            ► id_maquina
    */
    static async criarChamado(req, res) {
        const id_empresa = req.body.id_empresa;
        const id_setor = req.body.id_setor;
        const id_maquina = req.body.id_maquina;
        const cod_chamado = req.body.cod_chamado;

        const id = await ChamadosModel.criarChamados({
            id_empresa, id_setor, id_maquina, cod_chamado
        })

        if (!id) {
            return res.status(400).json({
                erro: "Não foi possível criar o chamado"
            });
        }

        const chamado = await ChamadosModel.listarChamado(id);

        // Notifica o Kanban (SSE ou WebSocket)
        notificarKanban({
            tipo: "NOVO_CHAMADO",
            chamado
        });

        return res.status(201).json({
            mensagem: "Chamado criado com sucesso",
            chamado
        });
    }

    /* PATCH /chamados/:id/atender - Rota para atualizar o estado de um chamado para "andamento"
        • Dados a receber:
            ► id_tecnico
    */
    static async atenderChamado(req, res) { }
 
    /* PATCH /chamados/:id/concluir - Rota para atualizar o estado de um chamado para "concluido"
        • Dados a receber:
            ► id_causa
            ► descricao_problema
            ► solucao_aplicada
            ► comentario_tecnico
            ► operador
    */
    static async concluirChamado(req, res) { }


    /* PATCH /chamados/:id - Rota para atualizar um chamado 
        • Dados a receber:
            ► id_chamado
    */
    static async atualizarChamado(req, res) {
    }

    static async obterDashboard(req, res) {
        const intervalo = req.params

        // const dashboard = {
        //     "totalChamados": 0,
        //     "chamadosPorStatus": {
        //         "aberto": 0,
        //         "andamento": 0,
        //         "concluido": 0,
        //         "cancelado": 0
        //     },
        //     "tempoMedioEspera": 0,
        //     "tempoMedioReparo": 0,
        // }

        const dashboard = await ChamadosModel.obterDashboard()

        return res.status(200).json({
            sucesso: true,
            dados: {
                dashboard
            }
        })
    }

}

export default ChamadosController;