"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuth } from "@/context/AuthContext";
import { useEmpresa } from "@/hooks/useEmpresa";

import ErrorPage from "../../../Holders/ErrorPage";
import LoadingPage from "../../../Holders/LoadingPage";
import HeaderPage from "../../../Header/HeaderPage";

import {
    Warehouse, RotateCw, Plus,
    Wrench, Hammer, Cog, Factory, Truck, Users, Shield, Database,
    PaintRoller, BriefcaseBusiness, Network,
} from "lucide-react";

import ModalAddSetor from "@/components/modals/addSetor";

// ===============================
// ÍCONES — idêntico ao ModalAddSetor e PageSetorId
// ===============================
const icones = {
    Wrench:            <Wrench className="h-14 w-14 opacity-90" />,
    Hammer:            <Hammer className="h-14 w-14 opacity-90" />,
    Cog:               <Cog className="h-14 w-14 opacity-90" />,
    Factory:           <Factory className="h-14 w-14 opacity-90" />,
    Truck:             <Truck className="h-14 w-14 opacity-90" />,
    Users:             <Users className="h-14 w-14 opacity-90" />,
    Shield:            <Shield className="h-14 w-14 opacity-90" />,
    Database:          <Database className="h-14 w-14 opacity-90" />,
    PaintRoller:       <PaintRoller className="h-14 w-14 opacity-90" />,
    BriefcaseBusiness: <BriefcaseBusiness className="h-14 w-14 opacity-90" />,
    Network:           <Network className="h-14 w-14 opacity-90" />,
    Warehouse:         <Warehouse className="h-14 w-14 opacity-90" />,
    default:           <Warehouse className="h-14 w-14 opacity-90" />,
};

// ===============================
// CORES — idêntico ao ModalAddSetor e PageSetorId
// ===============================
const cores = {
    Azul:     "bg-gradient-to-r from-blue-600 to-indigo-600",
    Verde:    "bg-gradient-to-r from-emerald-600 to-teal-600",
    Amarelo:  "bg-gradient-to-r from-amber-500 to-orange-500",
    Vermelho: "bg-gradient-to-r from-rose-600 to-red-600",
    Roxo:     "bg-gradient-to-r from-purple-600 to-pink-600",
    Cinza:    "bg-gradient-to-r from-slate-600 to-slate-800",
};

function getCor(cor) {
    return cores[cor] || cores.Cinza;
}

export default function PageSetores() {
    const router = useRouter();
    const { user } = useAuth();

    const {
        loading, error,
        setores, obterSetores,
    } = useEmpresa({});

    useEffect(() => {
        if (!setores) obterSetores(user.id_empresa);
    }, [setores, obterSetores]);

    const isFirstLoad = loading.obterSetores && (setores ?? []).length === 0;

    let content;

    if (isFirstLoad) {
        content = (
            <LoadingPage
                loadingTitle="Carregando Setores"
                loadingSubtitle={["Aguarde alguns segundos"]}
            />
        );
    } else if (error.obterSetores) {
        content = (
            <ErrorPage
                errorTitle="Erro ao carregar setores"
                errorSubtitle={[
                    "Houve um erro ao carregar setores",
                    "Por favor recarregue a página para tentar novamente",
                ]}
            />
        );
    } else if (loading.obterSetores) {
        content = (
            <LoadingPage
                loadingTitle="Carregando setores"
                loadingSubtitle={[]}
            />
        );
    } else {
        content = (
            <div className="flex-1 px-6 py-6 bg-gray-50 dark:bg-sidebar">
                <div className="max-w-10xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(setores ?? []).map((setor, i) => {
                            const icone = icones[setor?.icone] || icones.default;
                            const cor = getCor(setor?.cor);

                            return (
                                <div
                                    key={setor?.id || i}
                                    onClick={() => {
                                        if (setor?.cod_setor) {
                                            router.push(`/gerente/setores/${setor.cod_setor}`);
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
                                    <div className={`p-6 flex flex-col justify-between min-h-[170px] text-white relative ${cor}`}>
                                        <div className="absolute inset-0 bg-black/10" />
                                        <div className="relative">
                                            <div>{icone}</div>
                                            <h2 className="text-xl font-bold mt-3">{setor?.nome}</h2>
                                            {setor?.badge && (
                                                <span className="inline-block mt-2 text-xs bg-white/20 px-3 py-1 rounded-full">
                                                    {setor.badge}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* DESCRIÇÃO */}
                                    <div className="p-5">
                                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                            {setor?.descricao}
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
                        })}
                    </div>
                </div>

                <ModalAddSetor />
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-gray-50 dark:bg-slate-950">
            <HeaderPage
                icon={Warehouse}
                title="Setores"
                actions={[
                    loading.obterSetores
                        ? { icon: <RotateCw className="animate-spin" />, text: "Carregando", disabled: true }
                        : { icon: <RotateCw />, text: "Recarregar", onClick: () => obterSetores(user.id_empresa) },
                    {
                        icon: <Plus />,
                        text: "Novo setor",
                        disabled: loading.obterSetores,
                        onclick: () => {},
                    },
                ]}
            />
            {content}
        </div>
    );
}