'use client'

import { useMemo, useState } from 'react';

import ErrorPage from '../../Holders/ErrorPage';
import LoadingPage from '../../Holders/LoadingPage';
import HeaderPage from '../../Header/HeaderPage';

import { Grid2X2, RotateCw, Cpu, Search } from 'lucide-react';
import { useMaquinas } from "@/hooks/hooks2/useMaquina";

export default function PageMaquinas({ maquinasIniciais }) {

    const {
        maquinas,
        loading,
        error,
        refetchMaquinas,
    } = useMaquinas({
        initialMachines: maquinasIniciais,
        fetchOnMount: maquinasIniciais?.length === 0,
    });

    const isFirstLoad = loading.fetch && (maquinas ?? []).length === 0;

    // =========================
    // 🔎 FILTRO
    // =========================
    const [search, setSearch] = useState("");

    const filteredMaquinas = useMemo(() => {
        return (maquinas ?? []).filter((m) =>
            m.nome?.toLowerCase().includes(search.toLowerCase())
        );
    }, [maquinas, search]);

    // =========================
    // 📄 PAGINAÇÃO
    // =========================
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const totalPages = Math.ceil(filteredMaquinas.length / itemsPerPage);

    const paginatedMaquinas = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredMaquinas.slice(start, start + itemsPerPage);
    }, [filteredMaquinas, currentPage]);

    // reset page ao buscar
    const handleSearch = (value) => {
        setSearch(value);
        setCurrentPage(1);
    };

    if (isFirstLoad) {
        return (
            <LoadingPage
                loadingTitle="Carregando Máquinas"
                loadingSubtitle={["Organizando painel de operação..."]}
            />
        );
    }

    if (error.fetch) {
        return (
            <ErrorPage
                errorTitle={"Erro ao carregar máquinas"}
                errorSubtitle={[
                    "Não foi possível carregar o painel de máquinas.",
                    "Tente atualizar a página ou verificar a conexão."
                ]}
            />
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-gray-50">

            <HeaderPage
                icon={Grid2X2}
                title="Máquinas em Operação"
                actions={[
                    {
                        icon: <RotateCw className={loading.fetch ? "animate-spin" : ""} />,
                        text: loading.fetch ? "Atualizando..." : "Recarregar",
                        onClick: refetchMaquinas,
                        disabled: loading.fetch,
                    },
                ]}
            />

            {/* =========================
                🔎 INPUT DE BUSCA
            ========================= */}
            <div className="px-6 pt-4">
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Buscar máquina por nome..."
                        className="w-full pl-10 pr-4 py-2 border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>
            </div>

            {/* =========================
                GRID
            ========================= */}
            <div className="p-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                {paginatedMaquinas.map((maquina, i) => (
                    <div
                        key={maquina.id || i}
                        className="
                            group
                            bg-white
                            border border-gray-200
                            rounded-2xl
                            p-5
                            shadow-sm
                            hover:shadow-lg
                            hover:-translate-y-1
                            transition-all duration-200
                        "
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2 text-gray-700">
                                <Cpu size={18} />
                                <span className="font-semibold text-sm">
                                    Máquina
                                </span>
                            </div>

                            <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                                Ativa
                            </span>
                        </div>

                        <h1 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition">
                            {maquina.nome}
                        </h1>

                        {maquina.descricao && (
                            <p className="text-sm text-gray-500 mt-2">
                                {maquina.descricao}
                            </p>
                        )}

                        <div className="mt-4 text-xs text-gray-400">
                            Código: {maquina.cod_maquina}
                        </div>
                    </div>
                ))}
            </div>

            {/* =========================
                📄 PAGINAÇÃO CONTROLS
            ========================= */}
            <div className="flex justify-center items-center gap-2 pb-6">

                <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 bg-white border rounded disabled:opacity-50"
                >
                    Anterior
                </button>

                <span className="text-sm text-gray-600">
                    Página {currentPage} de {totalPages || 1}
                </span>

                <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="px-3 py-1 bg-white border rounded disabled:opacity-50"
                >
                    Próxima
                </button>
            </div>

        </div>
    );
}