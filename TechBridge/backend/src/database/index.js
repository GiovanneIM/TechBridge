import * as mysql from './mysql.js';
import * as supabase from './supabase.js';

// LENDO O PROVIDER NO .ENV
const PROVIDER = process.env.DB_PROVIDER;

let database;

switch (PROVIDER) {

    case 'mysql':
        database = mysql;
        break;

    case 'supabase':
        database = supabase;
        break;

    default:
        throw new Error('Provider inválido');
}

export default database;