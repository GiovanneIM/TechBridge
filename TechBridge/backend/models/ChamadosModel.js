import { create, read, update, deleteRecord, comparePassword, hashPassword, getConnection } from '../config/database.js';

class ChamadosModel {

    //  LISTAR CHAMADOS
    static async listarChamados() {
        try {
            const connection = await getConnection();

            try {
                // Comando para obter as equipes
                const sql = 'SELECT * FROM chamados ORDER BY id';

                // Fazendo a consulta
                const [chamados] = await connection.query(sql);

                // Retornando as equipes
                return { chamados };
            } finally {
                connection.release();
            }

        } catch (error) {
            console.error('Erro ao listar chamados:', error);
            throw error;
        }
    }

}

export default ChamadosModel;