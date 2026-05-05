import { create, read, update, deleteRecord, comparePassword, hashPassword, getConnection } from '../config/database.js';

class SetoresModel {
    // OBTER SETORES DE UMA EMPRESA
    static async obterSetores(id_empresa) {
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
}

export default SetoresModel;
