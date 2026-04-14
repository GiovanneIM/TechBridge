"use client";

import { BriefcaseBusiness, Network, PaintRoller, Warehouse, Wrench } from "lucide-react"
import { Separator } from "../../../ui/separator"
import { useSetores } from "@/hooks/useSetores"

export default function PageSetores({
    setoresIniciais = []
}) {

    const {
        setores,
        loadingSetores,
        errorSetores,
        refetchSetores
    } = useSetores({
        setoresIniciais: setoresIniciais,
        fetchOnMount: setoresIniciais?.length === 0
    })


    const icones = {
        "Wrench": <Wrench className="h-20 w-20 text-white" />,
        "PaintRoller": <PaintRoller className="h-20 w-20 text-white" />,
        "BriefcaseBusiness": <BriefcaseBusiness className="h-20 w-20 text-white" />,
        "Network": <Network className="h-20 w-20 text-white" />
    }

    return (
        <div className="flex-1 flex flex-col bg-gray-50">
            {/* Header */}
            <div className="flex h-14 items-center border-b bg-white/80 backdrop-blur px-6">
                <div className="flex items-center gap-3">
                    <Warehouse className="w-5 h-5 text-gray-700" />

                    <Separator orientation="vertical" className="h-6" />

                    <h1 className="text-lg font-semibold text-gray-800 tracking-tight">
                        Setores
                    </h1>
                </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
                {setores.map((setor, i) => (
                    <div
                        key={i}
                        className="
                    group rounded-2xl overflow-hidden
                    bg-white shadow-sm hover:shadow-2xl
                    transition-all duration-300 hover:-translate-y-2
                    border border-gray-100
                "
                        onClick={() => window.location.href = `/setores/${setor.id}`}
                        style={{ '--i': i }}
                    >
                        {/* Header */}
                        <div
                            className={`
                        p-6 min-h-45 flex flex-col gap-5 text-white
                        bg-linear-to-r ${setor.cor}
                    `}
                        >
                            {/* Ícone */}
                            <div className="text-4xl opacity-90 transition-transform">
                                {icones[setor.icone]}
                            </div>

                            {/* Título + Badge */}
                            <div className="flex items-start justify-between">
                                <h2 className="text-2xl font-bold leading-tight">
                                    {setor.nome}
                                </h2>

                                {setor.badge && (
                                    <span className="
                                bg-white/20 backdrop-blur
                                text-xs font-medium px-3 py-1
                                rounded-full border border-white/30
                            ">
                                        {setor.badge}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Conteúdo */}
                        <div className="p-6">
                            <p className="text-lg font-semibold text-gray-800">
                                {setor.nome}
                            </p>

                            <p className="mt-3 text-gray-600 leading-relaxed">
                                {setor.descricao}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}