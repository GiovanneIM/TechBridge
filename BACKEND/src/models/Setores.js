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
    static async listar(id_empresa) {
        try {
            // FAZER A CONSULTA
            const setores = await read("setores", {
                where: { id_empresa }
            })

            // RETORNANDO OS SETORES
            return setores
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
