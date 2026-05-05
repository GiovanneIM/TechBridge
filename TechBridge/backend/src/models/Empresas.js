import { create, read, update, deleteRecord, dadosDashboard, dadosPainelChamados, comparePassword, hashPassword } from '../config/database.js';
import UserModel from './User.js';

class EmpresasModel {

    // REGISTRAR EMPRESA 
    static async criar(empresa, gerente) {
        try {
            // REGISTRAR NOVA EMPRESA
            const id_empresa = await create('empresas', empresa);

            // REGISTRAR O 1º GERENTE PRINCIPAL DA EMPRESA
            const id_gerente = await UserModel.criar(gerente, id_empresa);

            // RETORNANDO O ID DA EMPRESA E DO GERENTE
            return { id_empresa, id_gerente }
        } catch (error) {
            // ERRO
            console.error('Erro ao registrar empresa:', error);
            throw error;
        }
    }

    // LISTAR TODAS AS EMPRESAS (Com paginação)
    static async listar(limit, offset, page, where, like, likeOr) {
        try {
            // OBTER AS EMPRESAS
            const empresas = await read('empresas', {
                limit,
                offset,
                where,
                like,
                likeOr
            });

            // TOTAL DE EMPRESAS
            const [{ total }] = await read('empresas', {
                columns: ['COUNT(*) as total'],
                where,
                like,
                likeOr
            });

            // TOTAL DE PAGINAS
            const total_paginas = Math.ceil(total / limit)

            // RETORNAR AS EMPRESAS E INFORMAÇÕES DE PAGINAÇÃO
            return {
                lista: empresas,
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

    // BUSCAR POR CNPJ
    static async buscarPorEmail(cnpj) {
        try {
            // FAZER A CONSULTA
            const rows = await read('empresas');

            // RETORNAR O PRIMEIRO DADO ENCONTRADO
            return rows[0] || null;
        } catch (error) {
            console.error('Erro ao buscar empresa por CNPJ:', error);
            throw error;
        }
    }

    // BUSCAR POR ID
    static async buscarPorId(id) {
        try {
            // FAZER A CONSULTA
            const rows = await read('empresas', {
                where: { id }
            });

            // RETORNAR O PRIMEIRO DADO ENCONTRADO
            return rows[0] || null;
        } catch (error) {
            console.error('Erro ao buscar usuário por ID:', error);
            throw error;
        }
    }

    // ATUALIZAR EMPRESA
    static async atualizar(id, dadosEmpresa) {
        try {
            return await update('empresas', dadosEmpresa, { id });
        } catch (error) {
            console.error('Erro ao atualizar empresa:', error);
            throw error;
        }
    }
}

export default EmpresasModel;