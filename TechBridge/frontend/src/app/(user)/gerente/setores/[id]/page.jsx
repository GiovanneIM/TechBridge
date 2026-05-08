"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";

import HeaderPage from "@/components/blocks/Header/HeaderPage";
import LoadingPage from "@/components/blocks/Holders/LoadingPage";
import ErrorPage from "@/components/blocks/Holders/ErrorPage";

import {
    ArrowLeft,
    Warehouse,
    Wrench,
    PaintRoller,
    BriefcaseBusiness,
    Network,
    Hash,
    CalendarDays,
    Info,
    User,
    Mail,
    Phone,
    MapPin,
    Shield,
    AlertTriangle,
} from "lucide-react";

import { useSetores } from "@/hooks/hooks2/useSetores";

// =========================
// ICONES
// =========================

const icones = {
    Wrench: <Wrench className="h-16 w-16 opacity-90" />,
    PaintRoller: <PaintRoller className="h-16 w-16 opacity-90" />,
    BriefcaseBusiness: <BriefcaseBusiness className="h-16 w-16 opacity-90" />,
    Network: <Network className="h-16 w-16 opacity-90" />,
    default: <Warehouse className="h-16 w-16 opacity-90" />,
};

// =========================
// CORES
// =========================

const cores = {
    Azul: "bg-gradient-to-r from-blue-600 to-indigo-600",
    Verde: "bg-gradient-to-r from-emerald-600 to-teal-600",
    Vermelho: "bg-gradient-to-r from-rose-600 to-red-600",
    Amarelo: "bg-gradient-to-r from-amber-500 to-orange-500",
    Roxo: "bg-gradient-to-r from-purple-600 to-pink-600",
    Cinza: "bg-gradient-to-r from-slate-600 to-slate-800",
};

function getCor(cor) {
    return cores[cor] || cores.Cinza;
}

// =========================
// PAGE
// =========================

export default function PageSetorId() {

    const params = useParams();

    const {
        setorAtual,
        fetchSetorById,
        loadingSetores,
        errorSetores,
    } = useSetores();

    useEffect(() => {
        if (params?.id) {
            fetchSetorById(params.id);
        }
    }, [params?.id]);

    // LOADING
    if (loadingSetores.fetchOne) {
        return (
            <LoadingPage
                loadingTitle="Carregando setor"
                loadingSubtitle={["Buscando informações..."]}
            />
        );
    }

    // ERROR
    if (errorSetores.fetchOne) {
        return (
            <ErrorPage
                errorTitle="Erro ao carregar setor"
                errorSubtitle={[errorSetores.fetchOne]}
            />
        );
    }

    if (!setorAtual) {
        return (
            <ErrorPage
                errorTitle="Setor não encontrado"
                errorSubtitle={["Nenhum setor foi encontrado com esse ID"]}
            />
        );
    }

    const icone =
        icones[setorAtual.icone] || icones.default;

    const cor = getCor(setorAtual.cor);

    return (
        <div className="flex flex-col min-h-screen min-w-full bg-gray-50 dark:bg-slate-950">

            {/* HEADER */}
            <HeaderPage
                icon={Warehouse}
                title={setorAtual.nome}
                actions={[
                    {
                        icon: <ArrowLeft />,
                        text: "Voltar",
                        onClick: () => window.history.back(),
                    },
                ]}
            />

            {/* CONTENT */}
            <div className="flex-1 w-full">

                <div className="w-full max-w-screen-2xl mx-auto px-6 py-6 space-y-6">

                    {/* HERO */}
                    <div className={`relative overflow-hidden rounded-3xl p-8 text-white shadow-xl ${cor}`}>
                        <div className="absolute inset-0 bg-black/10" />

                        <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-10">

                            {/* LEFT */}
                            <div className="flex items-center gap-6">
                                <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
                                    {icone}
                                </div>

                                <div>
                                    <h1 className="text-3xl font-bold">
                                        {setorAtual.nome}
                                    </h1>

                                    <p className="text-white/80 mt-2 max-w-xl">
                                        {setorAtual.descricao}
                                    </p>
                                </div>
                            </div>

                            {/* ID */}
                            <div className="bg-white/10 border border-white/20 rounded-2xl p-5 min-w-[220px]">
                                <div className="flex items-center gap-2 text-sm text-white/80">
                                    <Hash className="h-4 w-4" />
                                    Identificação
                                </div>

                                <div className="text-3xl font-bold mt-1">
                                    #{setorAtual.id}
                                </div>

                                <div className="text-sm mt-2 text-white/80">
                                    Código: {setorAtual.cod_setor}
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* GRID */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* INFO PRINCIPAL */}
                        <div className="lg:col-span-2 space-y-6">

                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border shadow-sm">
                                <div className="flex items-center gap-3 mb-4">
                                    <Info className="text-blue-500" />
                                    <h2 className="text-xl font-bold">
                                        Informações
                                    </h2>
                                </div>

                                <p className="text-gray-600 dark:text-gray-300">
                                    {setorAtual.descricao}
                                </p>
                            </div>

                            {/* RESPONSÁVEL */}
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border shadow-sm space-y-4">
                                <h2 className="text-xl font-bold">
                                    Responsável
                                </h2>

                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-gray-500" />
                                    {setorAtual.responsavel || "Não informado"}
                                </div>

                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-gray-500" />
                                    {setorAtual.email_responsavel || "-"}
                                </div>

                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-gray-500" />
                                    {setorAtual.telefone_responsavel || "-"}
                                </div>
                            </div>

                            {/* LOCALIZAÇÃO */}
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border shadow-sm">
                                <h2 className="text-xl font-bold mb-4">
                                    Localização
                                </h2>

                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-gray-500" />
                                    {setorAtual.bloco} - {setorAtual.andar}
                                </div>
                            </div>

                        </div>

                        {/* SIDEBAR */}
                        <div className="space-y-6">

                            {/* STATUS */}
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border shadow-sm">

                                <h2 className="text-xl font-bold mb-4">
                                    Status
                                </h2>

                                <div className="flex flex-col gap-2">

                                    <span
                                        className={`inline-flex w-fit px-3 py-1 rounded-full text-sm font-medium ${Number(setorAtual.status)
                                                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
                                                : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300"
                                            }`}
                                    >
                                        {Number(setorAtual.status) ? "Ativo" : "Inativo"}
                                    </span>

                                    {Boolean(setorAtual.bloqueado) && (
                                        <div className="flex items-center gap-2 text-red-500 text-sm">
                                            <AlertTriangle className="h-4 w-4" />
                                            Bloqueado
                                        </div>
                                    )}

                                </div>

                            </div>

                            {/* CONTROLE */}
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border shadow-sm">

                                <h2 className="text-xl font-bold mb-4">
                                    Controle
                                </h2>

                                <div className="flex items-center gap-2">
                                    <Shield className="h-4 w-4 text-gray-500" />
                                    Nível: {setorAtual.nivel_acesso}
                                </div>

                                <div className="flex items-center gap-2 mt-3">
                                    <CalendarDays className="h-4 w-4 text-gray-500" />
                                    {new Date(setorAtual.data_criacao).toLocaleDateString("pt-BR")}
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}