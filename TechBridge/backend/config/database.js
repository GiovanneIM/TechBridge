// Funções CRUD para o BD

import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { join } from 'path';

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


// READ - Função para ler registros
async function read(table, options = {}) {
    /*
        • table → Nome da tabela a ser exibida
        • options → Objeto com as opções de busca 
        
        Ex: read("usuarios u", { 
            columns: ["u.id", "u.nome", "tu.descricao as cargo"],
            join: [
                {type: "INNER", table: "tipoUsuario tu", on: "tu.id = u.id_tipoUsuario"}
            ] 
            where: { ativo: 1}, 
            like: {nome: "jo"}, 
            groupBy: ["tu.descricao"]
            orderBy: "n.nome ASC", 
            limit: 10,
            offset: 20
        })
    */

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

        // JOIN
        if (options?.join && Array.isArray(options.join)) {
            for (const j of options.join) {
                if (!j.type || !j.table || !j.on) continue;

                sql += ` ${j.type.toUpperCase()} JOIN ${j.table} ON ${j.on}`;
            }
        }

        // WHERE
        if (options.where && Object.keys(options.where).length > 0) {
            const conditions = [];

            for (const [key, value] of Object.entries(options.where)) {
                if (value === null) {
                    conditions.push(`${key} IS NULL`);
                }
                else if (value === 'NOT_NULL') {
                    conditions.push(`${key} IS NOT NULL`);
                }
                else if (Array.isArray(value)) {
                    const placeholders = value.map(() => "?").join(", ");
                    conditions.push(`${key} IN (${placeholders})`);
                    values.push(...value);
                }
                else {
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

        // GROUP BY
        if (options?.groupBy) {
            if (Array.isArray(options.groupBy)) {
                sql += ` GROUP BY ${options.groupBy.join(', ')}`;
            } else {
                sql += ` GROUP BY ${options.groupBy}`;
            }
        }

        // ORDER BY
        if (options.orderBy) {
            if (Array.isArray(options.orderBy)) {
                sql += ` ORDER BY ${options.orderBy.join(', ')}`;
            } else {
                sql += ` ORDER BY ${options.orderBy}`;
            }
        }

        // LIMIT
        if (options.limit !== undefined) {
            sql += ` LIMIT ?`;
            values.push(options.limit);
        }


        // OFFSET
        if (options.offset !== undefined) {
            sql += ` OFFSET ?`;
            values.push(options.offset);
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


// CREATE - Função para inserir um novo registro em uma tabela
async function create(table, data) {
    /*
        • table → Nome da tabela na qual será realizada a inserção
        • data → Objeto com os dados a serem inseridos

        Ex: create("usuarios", {
            nome: "usuario teste",
            email: "teste@email.com",
            senha: "12345",
            tipo_usuario: 2,
            id_empresa: 3
        })
    */

    // Criando a conexão
    const connection = await getConnection();

    try {
        // Obtendo o nome das colunas
        const columns = Object.keys(data).join(', ');

        // Criando placeholder para os valores
        const placeholders = Array(Object.keys(data).length)
            .fill('?')
            .join(', ');

        // Criando o comando
        const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;

        // Obtendo os valores do registro
        const values = Object.values(data);

        // Executando o comando
        const [result] = await connection.execute(sql, values);

        // Retornando o id do novo registro
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

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Obter chamados por dia
async function obterPorDia() {
    // Criando conexão
    const connection = await getConnection();

    try {
        let sql = `
            SELECT data,
                SUM(abertos) as abertos,
                SUM(atendidos) as atendidos,
                SUM(concluidos) as concluidos
            FROM (
                SELECT DATE(datahora_abertura) as data, COUNT(*) as abertos, 0 as atendidos, 0 as concluidos
                FROM chamados
                GROUP BY DATE(datahora_abertura)

                UNION ALL

                SELECT DATE(datahora_atendimento), 0, COUNT(*), 0
                FROM chamados
                WHERE datahora_atendimento IS NOT NULL
                GROUP BY DATE(datahora_atendimento)

                UNION ALL

                SELECT DATE(datahora_conclusao), 0, 0, COUNT(*)
                FROM chamados
                WHERE datahora_conclusao IS NOT NULL
                GROUP BY DATE(datahora_conclusao)
            ) as dados
            GROUP BY data
            ORDER BY data;
        `
        const values = []

        // Executando o comando
        const [rows] = await connection.execute(sql, values);

        // Retornando as linhas obtidas
        return rows;

    } finally {
        // Encerrando conexão
        connection.release();
    }
}

// Obter dados para o dashboard
async function dadosDashboard(id_empresa) {

    // TOTAL DE CHAMADOS
    const totalChamados = (
        await read('chamados', {
            columns: ['COUNT(*) AS total']
        })
    )[0]?.total ?? 0;

    // TOTAL POR ESTADO
    const porEstado = (
        await read('chamados', {
            columns: ['estado', 'COUNT(*) AS total'],
            groupBy: ['estado']
        })
    )
    const porEstadoMap = Object.fromEntries(
        porEstado.map(item => [item.estado, item.total])
    );

    // TOTAL POR SETOR
    const porSetor = (
        await read('setores s', {
            columns: ['s.nome', 'COUNT(c.id) AS total'],
            join: [{
                type: "LEFT",
                table: "chamados c",
                on: "s.id = c.id_setor"
            }],
            groupBy: ['s.nome']
        })
    )

    // TEMPO MÉDIO DE ESPERA
    const tempMedioEspera = (
        await read('chamados', {
            columns: ['AVG( TIMESTAMPDIFF(SECOND, datahora_abertura, datahora_atendimento) ) AS tempo_medio_espera'],
            where: {
                datahora_atendimento: 'NOT_NULL'
            }
        })
    )[0]?.tempo_medio_espera ?? 0;

    // TEMPO MÉDIO DE ESPERA
    const tempMedioAtendimento = (
        await read('chamados', {
            columns: ['AVG( TIMESTAMPDIFF(SECOND, datahora_atendimento, datahora_conclusao) ) AS tempo_medio_atendimento'],
            where: {
                datahora_atendimento: 'NOT_NULL'
            }
        })
    )[0]?.tempo_medio_atendimento ?? 0;

    // CHAMADOS POR DIA
    const chamadosPorDia = (
        await obterPorDia()
    )

    return {
        totalChamados,
        porEstado: porEstadoMap,
        porSetor,
        tempMedioEspera,
        tempMedioAtendimento,
        chamadosPorDia,
    }
}

async function dadosPainelChamados(params) {
    const painel = await read("chamados c", {
        columns: [
            "c.estado",
            "TIMESTAMPDIFF(MINUTE, datahora_abertura, NOW()) as temp_espera",
            "s.nome as nome_setor",
            "m.nome as nome_maquina",
            "u.nome as nome_tecnico"
        ],
        join: [
            { type: "INNER", table: "setores s", on: "s.id = c.id_setor" },
            { type: "INNER", table: "maquinas m", on: "m.id = c.id_maquina" },
            { type: "LEFT", table: "usuarios u", on: "u.id = c.id_tecnico" }
        ]
    })


    return painel;
}


export {
    create,
    read,
    update,
    deleteRecord,
    comparePassword,
    hashPassword,
    getConnection,
    
    dadosDashboard,
    dadosPainelChamados,
};
