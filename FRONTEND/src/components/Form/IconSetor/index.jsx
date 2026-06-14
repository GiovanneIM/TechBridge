import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import * as LucideIcons from 'lucide-react';
import { useEffect, useState } from 'react';

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

export function SelectIconSetor({alterarIcone}) {
    const [icone, setIcone] = useState('Warehouse')

    useEffect(() => {
        alterarIcone(icone);
    }, [icone])

    return (
        <>
            <IconPicker value={icone} onChange={setIcone} />

            {/* <p className="text-center py-4"></p> */}
        </>
    )
}

export function IconPicker({ value, onChange }) {
    const Icon = LucideIcons[value] || LucideIcons.Folder

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="flex gap-2">
                    <IconeSetor icone={value} />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-80">
                <div className="grid grid-cols-6 gap-2">

                    {iconesValidos.map((icone) => {
                        const IconItem = LucideIcons[icone] || LucideIcons.Folder

                        return (
                            <Button
                                key={icone}
                                size="icon"
                                variant={value === icone ? 'default' : 'ghost'}
                                onClick={() => onChange(icone)}
                            >
                                <IconItem size={28} />
                            </Button>
                        )
                    })}
                </div>
            </PopoverContent>
        </Popover>
    )
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