"use client";

import ErrorPage from "../../Holders/ErrorPage";
import LoadingPage from "../../Holders/LoadingPage";
import HeaderPage from "../../Header/HeaderPage";

import {
    BriefcaseBusiness,
    Network,
    PaintRoller,
    Warehouse,
    Wrench,
    RotateCw,
} from "lucide-react";

import { useSetores } from "@/hooks/hooks2/useSetores";

// Ícones
const icones = {
    Wrench: <Wrench className="h-14 w-14 opacity-90" />,
    PaintRoller: <PaintRoller className="h-14 w-14 opacity-90" />,
    BriefcaseBusiness: <BriefcaseBusiness className="h-14 w-14 opacity-90" />,
    Network: <Network className="h-14 w-14 opacity-90" />,
    default: <Warehouse className="h-14 w-14 opacity-90" />,
};

// 🎨 CORES FIXAS (SEMPRE FUNCIONA)
const coresFixas = [
    "bg-gradient-to-r from-blue-600 to-indigo-600",
    "bg-gradient-to-r from-emerald-600 to-teal-600",
    "bg-gradient-to-r from-purple-600 to-pink-600",
    "bg-gradient-to-r from-orange-500 to-red-500",
    "bg-gradient-to-r from-slate-600 to-slate-800",
    "bg-gradient-to-r from-cyan-600 to-blue-600",
];

// pega cor pelo índice
function getCor(index) {
    return coresFixas[index % coresFixas.length];
}

export default function PageSetores({ setoresIniciais }) {
    const {
        setores,
        loadingSetores,
        errorSetores,
        refetchSetores,
    } = useSetores({
        setoresIniciais,
        fetchOnMount: setoresIniciais?.length === 0,
    });

    const isFirstLoad =
        loadingSetores.fetch && (setores ?? []).length === 0;

    let content;

    if (isFirstLoad) {
        content = (
            <LoadingPage
                loadingTitle="Carregando Setores"
                loadingSubtitle={["Aguarde alguns segundos"]}
            />
        );
    } else if (errorSetores.fetch) {
        content = (
            <ErrorPage
                errorTitle="Erro ao carregar setores"
                errorSubtitle={[
                    "Houve um erro ao carregar setores",
                    "Por favor recarregue a página para tentar novamente",
                ]}
            />
        );
    } else {
        content = (
            <div className="flex-1 px-6 py-6 bg-gray-50 dark:bg-slate-950">
                <div className="max-w-10xl mx-auto">

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                        {setores.map((setor, i) => {
                            const icone =
                                icones[setor.icone] || icones.default;

                            const cor = getCor(i);

                            return (
                                <div
                                    key={setor.id || i}
                                    onClick={() =>
                                        (window.location.href = `/setores/${setor.id}`)
                                    }
                                    className="
                                        group cursor-pointer rounded-2xl overflow-hidden
                                        bg-white dark:bg-slate-900
                                        border border-gray-200 dark:border-slate-800
                                        shadow-sm hover:shadow-xl
                                        transition-all duration-300
                                        hover:-translate-y-1
                                    "
                                >
                                    {/* HEADER */}
                                    <div
                                        className={`
                                            p-6 flex flex-col justify-between
                                            min-h-[170px] text-white relative
                                            ${cor}
                                        `}
                                    >
                                        {/* overlay leve */}
                                        <div className="absolute inset-0 bg-black/10"></div>

                                        <div className="relative">
                                            <div className="group-hover:scale-99 transition-transform duration-300">
                                                {icone}
                                            </div>

                                            <h2 className="text-xl font-bold mt-3">
                                                {setor.nome}
                                            </h2>

                                            {setor.badge && (
                                                <span className="inline-block mt-2 text-xs bg-white/20 px-3 py-1 rounded-full">
                                                    {setor.badge}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* DESCRIÇÃO */}
                                    <div className="p-5">
                                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                            {setor.descricao}
                                        </p>
                                    </div>

                                    {/* FOOTER */}
                                    <div className="px-5 pb-4">
                                        <span className="text-sm text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition">
                                            Ver detalhes →
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-gray-50 dark:bg-slate-950">

            <HeaderPage
                icon={Warehouse}
                title="Setores"
                actions={[
                    loadingSetores.fetch
                        ? {
                              icon: <RotateCw className="animate-spin" />,
                              text: "Carregando",
                              disabled: true,
                          }
                        : {
                              icon: <RotateCw />,
                              text: "Recarregar",
                              onClick: refetchSetores,
                          },
                ]}
            />

            {content}
        </div>
    );
}