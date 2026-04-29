import { create, read, update, deleteRecord, comparePassword, hashPassword, getConnection } from '../config/database.js';

class SetoresModel {

    //  LISTAR CHAMADOS
    static async listarSetores() {
        try {
            const connection = await getConnection();

            try {
                // Comando para obter os setores
                const sql = 'SELECT * FROM setores ORDER BY id';

                // Fazendo a consulta
                const [setores] = await connection.query(sql);

                // Retornando os setores
                return { setores };
            } finally {
                connection.release();
            }

        } catch (error) {
            console.error('Erro ao listar setores:', error);
            throw error;
        }
    }

    // LISTAR UM SETOR ESPECÍFICO
    static async listarSetor(idSetor) {
        try {
            const connection = await getConnection();

            try {
                // Comando para obter o setor com id = idSetor
                const sql = `SELECT * FROM setores WHERE id = ${idSetor}`;

                // Fazendo a consulta
                const [[setores]] = await connection.query(sql);

                // Retornando o setor
                return { setores };
            } finally {
                connection.release();
            }

        } catch (error) {
            console.error('Erro ao listar setor:', error);
            throw error;
        }
    }

}

export default SetoresModel;