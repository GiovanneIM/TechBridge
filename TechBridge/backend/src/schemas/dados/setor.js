import { z } from 'zod';
import { helperCodigo } from '../helpers/helperCodigo';


// CÓDIGO DE SETOR
export const cod_setor = helperCodigo('Código do setor');

// NOME
export const nome = z
    .string({
        required_error: 'O nome do setor é obrigatório',
        invalid_type_error: 'O nome deve ser um texto'
    })
    .trim()
    .min(1, 'O nome do setor deve ter no mínimo 1 carácteres')
    .max(150, 'O nome do setor deve ter no máximo 150 carácteres');

// DESCRICAO
export const descricao = z
    .string({
        invalid_type_error: 'O nome deve ser um texto'
    })
    .trim()
    .max(300, 'A descrição do setor pode ter no máximo 300 carácteres');





const iconesValidos = [
    // Genéricos / Organizacionais
    'Album',
    'Archive',
    'Folder',
    'Layers',
    'LayoutGrid',
    'Building',
    'Building2',

    // Produção / Operação
    'Factory',
    'Cog',
    'Cogs',
    'Wrench',
    'Hammer',
    'Tool',

    // Tecnologia / TI
    'Cpu',
    'Server',
    'Database',
    'HardDrive',
    'Monitor',

    // Logística / Estoque
    'Boxes',
    'Box',
    'Package',
    'Truck',
    'Clipboard',

    // Pessoas / Administrativo
    'Users',
    'User',
    'Briefcase',
    'IdCard',
    'FileText',

    // Qualidade / Inspeção
    'CheckCircle',
    'ClipboardCheck',
    'ShieldCheck',

    // Energia / Infraestrutura
    'Zap',
    'Plug',
    'Power',

    // Segurança / Controle
    'Shield',
    'Lock',
    'Eye'
];