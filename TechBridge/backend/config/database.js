// Funções CRUD para o BD

import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Carregando variáveis do arquivo .env
dotenv.config();

// Configuração do pool de conexões
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


// Função para obter uma conexão do pool
async function getConnection() {
    return pool.getConnection();
}


// READ - Função para ler registros (um ou múltiplos)
async function read(table, where = null) {
    const connection = await getConnection();

    try {
        let sql = `SELECT * FROM ${table}`;

        if (where) {
            sql += `WHERE ${where}`;
        }

        const [rows] = await connection.execute(sql);

        return rows;
    }
    finally {
        connection.release();
    }
}

async function readCompleto(table, options = null) {
    // table -> Nome da tabela a ser exibida
    // options -> Objeto com as opções de busca 
    // Ex: { 
    // columns: ["id", "nome"], 
    // where: { ativo: 1}, 
    // like: {nome: "jo"}, 
    // orderBy: "nome ASC", 
    // limit: 10
    // }

    // Criando conexão
    const connection = await getConnection();

    try {
        // Formando o comando
        let sql = "SELECT ";
        const values = [];

        // COLUMNS
        if (options.columns && options.columns.length > 0) {
            sql += options.columns.join(", ");
        } else {
            sql += "*";
        }

        sql += ` FROM ${table}`;

        // WHERE
        if (options.where && Object.keys(options.where).length > 0) {
            const conditions = [];

            for (const [key, value] of Object.entries(options.where)) {
                if (Array.isArray(value)) {
                    const placeholders = value.map(() => "?").join(", ");
                    conditions.push(`${key} IN (${placeholders})`);
                    values.push(...value);
                } else {
                    conditions.push(`${key} = ?`);
                    values.push(value);
                }
            }

            sql += " WHERE " + conditions.join(" AND ");
        }

        // LIKE
        if (options.like && Object.keys(options.like).length > 0) {
            const conditions = [];

            for (const [key, value] of Object.entries(options.like)) {
                conditions.push(`${key} LIKE ?`);
                values.push(`%${value}%`);
            }

            sql += options.where ? " AND " : " WHERE ";
            sql += conditions.join(" AND ");
        }

        // ORDER BY
        if (options.orderBy) {
            sql += ` ORDER BY ${options.orderBy}`;
        }

        // LIMIT
        if (options.limit) {
            sql += ` LIMIT ?`;
            values.push(options.limit);
        }

        // Executando o comando
        const [rows] = await connection.execute(sql, values);

        // Retornando as linhas obtidas
        return rows;

    } finally {
        // Encerrando conexão
        connection.release();
    }
}

// INSERT - Função para inserir um novo registro
async function create(table, data) {
    // table -> Nome da tabela na qual será realizada a inserção
    // data -> Objeto com os dados a serem inseridos

    // Criando a conexão
    const connection = await getConnection();

    try {
        // Obtendo o nome das colunas
        const columns = Object.keys(data).join(', ');

        // Criando o comando
        const placeholders = Array(Object.keys(data).length).fill('?').join(', ');
        const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;

        // Obtendo os valores do registro
        const values = Object.values(data);

        // Executando o comando
        const [result] = await connection.execute(sql, values);

        // Retornando o novo registro
        return result.insertId;
    } finally {
        // Encerrando a conexão
        connection.release();
    }
}

// UPDATE - Função para atualizar um registro
async function update(table, data, where) {
    // Criando a conexão
    const connection = await getConnection();

    try {
        // Colunas a serem alteradas
        const set = Object.keys(data)
            .map(column => `${column} = ?`)
            .join(', ');


        // Where
        const conditions = Object.keys(where)
            .map(column => `${column} = ?`)
            .join(" AND ");

        // Montando o comando
        const sql = `UPDATE ${table} SET ${set} WHERE ${conditions}`;

        // Obtendo os valores do registro e do where
        const values = [
            ...Object.values(data),
            ...Object.values(where)
        ];

        // Executando a conexão
        const [result] = await connection.execute(sql, values);

        // Retornando as linhas afetadas
        return result.affectedRows;
    } finally {
        // Encerrando a conexão
        connection.release();
    }
}

// DELETE - Função para excluir um registro
async function deleteRecord(table, where) {
    // Criando a conexão
    const connection = await getConnection();

    try {
        if (!where || Object.keys(where).length === 0) {
            throw new Error("Where clause cannot be empty");
        }

        // Where
        const conditions = Object.keys(where)
            .map(column => `${column} = ?`)
            .join(" AND ");


        // Criando o comando
        const sql = `DELETE FROM ${table} WHERE ${conditions}`;

        // Obtendo os valores do where
        const values = Object.values(where);

        // Executando o comando
        const [result] = await connection.execute(sql);

        // Retornando as linahs afetadas
        return result.affectedRows;
    } finally {
        // Encerrando a conexão
        connection.release();
    }
}

// Função para comparar senha com hash
async function comparePassword(password, hash) {
    try {
        return await bcrypt.compare(password, hash);
    } catch (error) {
        console.error('Erro ao comparar senha:', error);
        return false;
    }
}

// Função para gerar hash da senha
async function hashPassword(password) {
    try {
        return await bcrypt.hash(password, 10);
    } catch (error) {
        console.error('Erro ao gerar hash da senha:', error);
        throw error;
    }
}

export {
    create,
    read,
    update,
    deleteRecord,
    comparePassword,
    hashPassword,
    getConnection
};
