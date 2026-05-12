import { supabase } from './supabase.js';

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

    let query = supabase
        .from(table)
        .select(options.columns || '*');

    // WHERE
    if (options.where) {

        for (const [key, value] of Object.entries(options.where)) {

            if (value === null) {
                query = query.is(key, null);

            } else if (Array.isArray(value)) {
                query = query.in(key, value);

            } else {
                query = query.eq(key, value);
            }
        }
    }

    // LIKE
    if (options.like) {

        for (const [key, value] of Object.entries(options.like)) {

            query = query.ilike(key, `%${value}%`);
        }
    }

    // ORDER BY
    if (options.orderBy) {

        query = query.order(
            options.orderBy.column,
            {
                ascending: options.orderBy.ascending
            }
        );
    }

    // LIMIT
    if (options.limit) {
        query = query.limit(options.limit);
    }

    // OFFSET
    if (options.offset) {
        query = query.range(
            options.offset,
            options.offset + options.limit - 1
        );
    }

    const { data, error } = await query;

    if (error) {
        throw error;
    }

    return data;
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

    const { data: result, error } = await supabase
        .from(table)
        .insert(data)
        .select();

    if (error) {
        throw error;
    }

    return result;
}

// UPDATE - Função para atualizar um registro
async function update(table, data, where) {

    let query = supabase
        .from(table)
        .update(data);

    for (const [key, value] of Object.entries(where)) {
        query = query.eq(key, value);
    }

    const { data: result, error } = await query.select();

    if (error) {
        throw error;
    }

    return result;
}

// DELETE - Função para excluir um registro
async function deleteRecord(table, where) {

    let query = supabase
        .from(table)
        .delete();

    for (const [key, value] of Object.entries(where)) {
        query = query.eq(key, value);
    }

    const { error } = await query;

    if (error) {
        throw error;
    }

    return true;
}