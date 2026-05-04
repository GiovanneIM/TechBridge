'use client'

import { Button } from '@/components/ui/button';
import * as LucideIcons from 'lucide-react';
import { useState } from 'react';

const iconesValidos = [
    // Genéricos / Organizacionais
    'Warehouse',
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

export default function Test() {
    const [iconeSelecionado, setIconeSelecionado] = useState('Warehouse')

    return (

        <div className="flex items-between flex-wrap p-2 gap-2 w-fit border">
            {iconesValidos.map((icone) => (
                <Button
                    key={icone}
                    type="button"
                    size="icon"
                    variant={iconeSelecionado === icone ? 'default' : 'ghost'}
                    className="h-12 w-12"
                    onClick={() => setIconeSelecionado(icone)}
                >
                    <IconeSetor icone={icone} size={32} />
                </Button>
            ))}
        </div>
    );

}


export function IconeSetor({ icone, size = 32, className = '' }) {
    const IconComponent = LucideIcons[icone] || LucideIcons.Folder;

    return (
        <IconComponent
            size={size}
            className={className}
        />
    );
}