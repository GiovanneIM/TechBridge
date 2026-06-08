'use client'

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
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

    return (<>
        <div className="flex items-between flex-wrap p-2 gap-2 w-fit">
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

        <p className='text-center font-genty text-xl'>
            {iconeSelecionado}
        </p>

        <Separator className="my-4"/>

        <Test1 />

        <Separator className="my-4"/>

        <Test2 />
    </>);

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



export function IconPicker1({ value, onChange }) {
    return (
        <div className="flex flex-wrap gap-2">
            {iconesValidos.map((icone) => {
                const Icon = LucideIcons[icone] || LucideIcons.Folder

                return (
                    <Button
                        key={icone}
                        type="button"
                        size="icon"
                        variant={value === icone ? 'default' : 'ghost'}
                        className="h-12 w-12"
                        onClick={() => onChange(icone)}
                    >
                        <Icon size={28} />
                    </Button>
                )
            })}
        </div>
    )
}



export function Test1() {
    const [icone, setIcone] = useState('Warehouse')

    return (
        <>
            <IconPicker1 value={icone} onChange={setIcone} />

            <p className="text-center py-4">
                Selecionado: {icone}
            </p>
        </>
    )
}



export function IconPicker2({ value, onChange }) {
    const Icon = LucideIcons[value] || LucideIcons.Folder

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="flex gap-2">
                    {/* <Icon size={28} /> */}
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


export function Test2() {
    const [icone, setIcone] = useState('Warehouse')

    return (
        <>
            <IconPicker2 value={icone} onChange={setIcone} />

            <p className="text-center py-4">
                Selecionado: {icone}
            </p>
        </>
    )
}