import { create, read, update, deleteRecord, comparePassword, hashPassword, getConnection } from '../config/database.js';

class MaquinasModel {

    //  LISTAR CHAMADOS
    static async listarMaquinas() {
        try {
            const connection = await getConnection();

            try {
                // Comando para obter as equipes
                const sql = 'SELECT * FROM maquinas ORDER BY id';

                // Fazendo a consulta
                const [maquinas] = await connection.query(sql);

                // Retornando as equipes
                return { maquinas };
            } finally {
                connection.release();
            }

        } catch (error) {
            console.error('Erro ao listar maquinas:', error);
            throw error;
        }
    }

}

export default MaquinasModel;