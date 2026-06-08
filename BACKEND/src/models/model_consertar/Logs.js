import { create, read, update, deleteRecord, comparePassword, hashPassword, getConnection } from '../config/database.js';

class LogModel {
    // TOTAL DE LOGS
    static async total() {
        try {
            const rows = read("logs", { column: ['count(*)'] });

            const total = rows[0];

            return total
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            throw error;
        }
    }
}

export default LogModel;



