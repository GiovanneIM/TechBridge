import { create, read, update, deleteRecord, dadosDashboard, dadosPainelChamados, comparePassword, hashPassword } from '../config/database.js';

class ChamadosModel {

    //  LISTAR CHAMADOS
    static async listarChamados(options) {
        try {
            // Fazendo a consulta
            const chamados = await read("chamados", options);

            // Retornando os chamados
            return { chamados };
        } catch (error) {
            console.error('Erro ao listar chamados:', error);
            throw error;
        }
    }

    //  BUSCAR UM CHAMADO ESPECÍFICO
    static async listarChamado(id) {
        try {
            // Fazendo a consulta
            const chamados = await read("chamados", {where: {id}});
            const chamado = chamados[0]
            
            // Retornando o chamado
            return chamado || null;
        } catch (error) {
            console.error('Erro ao listar chamados:', error);
            throw error;
        }
    }

    //  CRIAR UM CHAMADO
    static async criarChamados(chamado) {
        try {
            // Fazendo a consulta
            const id = await create("chamados", chamado);
            return id;
        } catch (error) {
            console.error('Erro ao listar chamados:', error);
            throw error;
        }
    }

    static async obterDashboard(options) {
        try {
            const dashboard = await dadosDashboard()

            return dashboard;
        } catch (error) {
            console.error('Erro ao obter dados para dashboard:', error)
            throw error;
        }
    }

    //  OBTER DADOS DO PAINEL DE CHAMADOS
    static async painelChamados(options) {
        try {
            // Fazendo a consulta
            const painel = await dadosPainelChamados(options);

            // Retornando os chamados para o painel
            return painel;
        } catch (error) {
            console.error('Erro ao listar chamados:', error);
            throw error;
        }
    }

}

export default ChamadosModel;