import { create, read, update, deleteRecord, comparePassword, hashPassword, getConnection } from '../config/database.js';

class SetoresModel {

    //  LISTAR CHAMADOS
    static async listarSetores() {
        try {
            const connection = await getConnection();

            try {
                // Comando para obter as equipes
                const sql = 'SELECT * FROM setores ORDER BY id';

                // Fazendo a consulta
                const [setores] = await connection.query(sql);

                // Retornando as equipes
                return { setores };
            } finally {
                connection.release();
            }

        } catch (error) {
            console.error('Erro ao listar setores:', error);
            throw error;
        }
    }

}

export default SetoresModel;