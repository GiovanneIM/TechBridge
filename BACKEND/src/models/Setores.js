import { create, read, update, deleteRecord, comparePassword, hashPassword, getConnection } from '../config/database.js';

class SetoresModel {
    // REGISTRAR SETOR
    static async criar(id_empresa, dados) {
        try {
            // REGISTRAR SETOR
            const id_setor = await create('setores', {
                ...dados,
                id_empresa
            });

            // RETORNANDO O ID DA EMPRESA E DO SETOR
            return { id_empresa, id_setor }
        } catch (error) {
            // ERRO
            console.error('Erro ao registrar setor:', error);
            throw error;
        }
    }

    // LISTAR SETORES DE UMA EMPRESA
    static async listar(id_empresa, limit, offset, page, where, like, likeOr) {
        try {
            // OBTER OS SETORES
            const setores = await read("setores", {
                where,
                like,
                likeOr,
                limit,
                offset,
            })

            // TOTAL DE SETORES DA BUSCA
            const [{ total }] = await read('usuarios u', {
                columns: ['COUNT(*) as total'],
                where,
                like,
                likeOr
            });

            // TOTAL DE PAGINAS
            const total_paginas = Math.ceil(total / limit)

            // RETORNANDO OS SETORES E INFORMAÇÕES DE PAGINAÇÃO
            return {
                lista: setores,
                paginacao: {
                    total,
                    page,
                    limit,
                    total_paginas,
                }
            }
        } catch (error) {
            console.error('Erro ao listar setores:', error);
            throw error;
        }
    }

    // BUSCAR POR CÓDIGO
    static async buscarCodigo(id_empresa, cod_setor) {
        try {
            // FAZER A CONSULTA
            const setor = await read("setores", {
                where: { id_empresa, cod_setor }
            })

            // RETORNANDO O SETOR
            return setor[0] || null
        } catch (error) {
            console.error('Erro ao buscar setor por código:', error);
            throw error;
        }
    }

    // BUSCAR POR ID
    static async buscarPorId(id_setor) {
        try {
            // FAZER A CONSULTA
            const setor = await read("setores", {
                where: { id_setor }
            })

            // RETORNANDO O SETOR
            return setor[0] || null
        } catch (error) {
            console.error('Erro ao buscar setor por id:', error);
            throw error;
        }
    }
}

export default SetoresModel;
