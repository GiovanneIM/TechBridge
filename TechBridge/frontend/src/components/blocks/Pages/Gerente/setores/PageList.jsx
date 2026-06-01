"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuth } from "@/context/AuthContext";
import { useEmpresa } from "@/hooks/useEmpresa";

import ErrorPage from "../../../Holders/ErrorPage";
import LoadingPage from "../../../Holders/LoadingPage";
import HeaderPage from "../../../Header/HeaderPage";

import {
    BriefcaseBusiness,
    Network,
    PaintRoller,
    Warehouse,
    Wrench,
    RotateCw,
    Plus,
} from "lucide-react";


import ModalAddSetor from "@/components/modals/addSetor";


// ===============================
// ÍCONES
// ===============================
const icones = {
    Wrench: <Wrench className="h-14 w-14 opacity-90" />,
    PaintRoller: <PaintRoller className="h-14 w-14 opacity-90" />,
    BriefcaseBusiness: (
        <BriefcaseBusiness className="h-14 w-14 opacity-90" />
    ),
    Network: <Network className="h-14 w-14 opacity-90" />,
    default: <Warehouse className="h-14 w-14 opacity-90" />,
};

// ===============================
// CORES FIXAS
// ===============================
const coresFixas = [
    "bg-gradient-to-r from-blue-600 to-indigo-600",
    "bg-gradient-to-r from-emerald-600 to-teal-600",
    "bg-gradient-to-r from-rose-600 to-red-600",
    "bg-gradient-to-r from-amber-500 to-orange-500",
    "bg-gradient-to-r from-purple-600 to-pink-600",
    "bg-gradient-to-r from-slate-600 to-slate-800",
];

// ===============================
// PEGA COR PELO ÍNDICE
// ===============================
function getCor(index) {
    return coresFixas[index % coresFixas.length];
}

export default function PageSetores() {
    const router = useRouter();

    const {
        user
    } = useAuth()

    const {
        loading, error,
        setores, obterSetores,
    } = useEmpresa({});

    useEffect(() => {
        if (!setores) obterSetores(user.id_empresa)
    }, [setores, obterSetores])


    const isFirstLoad = loading.obterSetores && (setores ?? []).length === 0;

    let content;

    // FIRST LOAD
    if (isFirstLoad) {
        content = (
            <LoadingPage
                loadingTitle="Carregando Setores"
                loadingSubtitle={[
                    "Aguarde alguns segundos",
                ]}
            />
        );
    }

    // ERROR
    else if (error.obterSetores) {
        content = (
            <ErrorPage
                errorTitle="Erro ao carregar setores"
                errorSubtitle={[
                    "Houve um erro ao carregar setores",
                    "Por favor recarregue a página para tentar novamente",
                ]}
            />
        );
    }

    // RELOADING
    else if (loading.obterSetores) {
        content = (
            <LoadingPage
                loadingTitle="Carregando setores"
                loadingSubtitle={[]}
            />
        );
    }

    // CONTEÚDO
    else {
        content = (
            <div className="flex-1 px-6 py-6 bg-gray-50 dark:bg-sidebar">
                <div className="max-w-10xl mx-auto">

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                        {(setores ?? []).map(
                            (setor, i) => {
                                const icone =
                                    icones[
                                    setor?.icone
                                    ] || icones.default;

                                const cor = getCor(i);

                                return (
                                    <div
                                        key={
                                            setor?.id || i
                                        }
                                        onClick={() => {
                                            if (
                                                setor?.id
                                            ) {
                                                router.push(
                                                    `/gerente/${user.id_empresa}/setores/${setor.id}`
                                                );
                                            }
                                        }}
                                        className="
                                            group cursor-pointer rounded-2xl overflow-hidden
                                            bg-white dark:bg-sidebar
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
                                                min-h-[170px]
                                                text-white
                                                relative
                                                ${cor}
                                            `}
                                        >
                                            {/* overlay */}
                                            <div className="absolute inset-0 bg-black/10"></div>

                                            <div className="relative">
                                                <div className="">
                                                    {
                                                        icone
                                                    }
                                                </div>

                                                <h2 className="text-xl font-bold mt-3">
                                                    {
                                                        setor?.nome
                                                    }
                                                </h2>

                                                {setor?.badge && (
                                                    <span className="inline-block mt-2 text-xs bg-white/20 px-3 py-1 rounded-full">
                                                        {
                                                            setor.badge
                                                        }
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* DESCRIÇÃO */}
                                        <div className="p-5">
                                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                                {
                                                    setor?.descricao
                                                }
                                            </p>
                                        </div>

                                        {/* FOOTER */}
                                        <div className="px-5 pb-4">
                                            <span className="text-sm text-blue-600 dark:text-white font-medium opacity-0 group-hover:opacity-100 transition">
                                                Ver detalhes →
                                            </span>
                                        </div>
                                    </div>
                                );
                            }
                        )}
                    </div>
                </div>


                <ModalAddSetor />

            </div>
        );
    }

    // PAGE
    return (
        <div className="flex-1 flex flex-col bg-gray-50 dark:bg-slate-950">

            <HeaderPage
                icon={Warehouse}
                title="Setores"
                actions={[
                    loading.obterSetores
                        ? {
                            icon: (
                                <RotateCw className="animate-spin" />
                            ),
                            text: "Carregando",
                            disabled: true,
                        }
                        : {
                            icon: <RotateCw />,
                            text: "Recarregar",
                            onClick: () => obterSetores(user.id_empresa),
                        },
                    {
                        icon: (
                            <Plus />
                        ),
                        text: "Novo setor",
                        disabled: loading.obterSetores,
                        onclick: () => { }
                    }
                ]}
            />

            {content}
        </div>
    );
}