import { create, read, update, deleteRecord, dadosDashboard, dadosPainelChamados, comparePassword, hashPassword } from '../config/database.js';

class EmpresasModel {

    // LISTAR TODAS AS EMPRESAS (Com paginação)
    static async listarEmpresas(limit, offset) {
        try {
            // OBTER AS EMPRESAS
            const empresas = await read('empresas', {
                limit,
                offset
            });

            // TOTAL DE EMPRESAS
            const [{ total }] = await read('COUNT(*) as total');

            // PAGINA ATUAL
            const pagina_atual = Math.floor(offset / limit) + 1;

            // TOTAL DE PAGINAS
            const total_paginas = Math.ceil(total / limit)

            // RETORNAR AS EMPRESAS E INFORMAÇÕES DE PAGINAÇÃO
            return {
                empresas,
                paginacao: {
                    total,
                    page,
                    limit,
                    total_paginas,
                }
            }
        } catch (error) {
            // ERRO
            console.error('Erro ao listar empresas: ', error);
            throw error;
        }
    }

    // REGISTRAR EMPRESA 
    static async criarEmpresa(empresa, gerente) {
        try {
            // REGISTRAR NOVA EMPRESA
            const id_empresa = await create('empresas', empresa);

            // REGISTRAR O 1º GERENTE PRINCIPAL DA EMPRESA
            const id_gerente = await create('usuarios', {
                ...gerente,
                tipo: 2,
                id_empresa
            });

            // RETORNANDO O ID DA EMPRESA
            return id_empresa
        } catch (error) {
            // ERRO
            console.error('Erro ao registrar empresa: ', error);
            throw error;
        }
    }
}

export default EmpresasModel;