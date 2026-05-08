'use client'

import { useMemo, useState, useEffect } from 'react';

import ErrorPage from '../../Holders/ErrorPage';
import LoadingPage from '../../Holders/LoadingPage';
import HeaderPage from '../../Header/HeaderPage';

import { Grid2X2, RotateCw, Cpu } from 'lucide-react';
import { useMaquinas } from "@/hooks/hooks2/useMaquina";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

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
    // 📦 FILTROS
    // =========================
    const [filtro, setFiltro] = useState({
        nome_maquina: '',
        status: null,
        limit: 8,
        page: 1,
    });

    // =========================
    // 🔎 FILTRAGEM
    // =========================
    const filteredMaquinas = useMemo(() => {
        return (maquinas ?? []).filter((m) => {

            const matchNome = m.nome
                ?.toLowerCase()
                .includes(filtro.nome_maquina.toLowerCase());

            const matchStatus =
                filtro.status === null || filtro.status === 'all'
                    ? true
                    : String(m.status) === filtro.status;

            return matchNome && matchStatus;
        });
    }, [maquinas, filtro.nome_maquina, filtro.status]);

    // =========================
    // 📄 PAGINAÇÃO
    // =========================
    const totalPages = Math.ceil(filteredMaquinas.length / filtro.limit);

    const paginatedMaquinas = useMemo(() => {
        const start = (filtro.page - 1) * filtro.limit;
        return filteredMaquinas.slice(start, start + filtro.limit);
    }, [filteredMaquinas, filtro.page, filtro.limit]);

    const changePage = (page) => {
        if (page < 1 || page > totalPages) return;
        setFiltro((prev) => ({ ...prev, page }));
    };

    function gerarPaginas(page, total) {
        const pages = [];
        const delta = 2;

        const inicio = Math.max(1, page - delta);
        const fim = Math.min(total, page + delta);

        if (inicio > 1) {
            pages.push(1);
            if (inicio > 2) pages.push('...');
        }

        for (let i = inicio; i <= fim; i++) {
            pages.push(i);
        }

        if (fim < total) {
            if (fim < total - 1) pages.push('...');
            pages.push(total);
        }

        return pages;
    }

    const pages = gerarPaginas(filtro.page, totalPages);

    const filtrar = () => {
        setFiltro((prev) => ({ ...prev, page: 1 }));
    };

    // =========================
    // LOADING / ERROR
    // =========================
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

            {/* =========================
                HEADER
            ========================= */}
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

            <div className="p-4 flex-1 flex flex-col gap-4">

                {/* =========================
                    FILTROS (MESMO PADRÃO DO OUTRO)
                ========================= */}
                <Field
                    orientation="horizontal"
                    className="border bg-card p-3 rounded gap-3 items-end flex-wrap"
                >

                    {/* NOME */}
                    <FieldContent className="w-[280px]">
                        <FieldLabel>Procurar Máquina</FieldLabel>
                        <Input
                            value={filtro.nome_maquina}
                            onChange={(e) =>
                                setFiltro((prev) => ({
                                    ...prev,
                                    nome_maquina: e.target.value
                                }))
                            }
                            placeholder="Nome da máquina..."
                        />
                    </FieldContent>

                    {/* LIMIT */}
                    <FieldContent className="w-[180px]">
                        <FieldLabel>Itens por página</FieldLabel>
                        <Select
                            value={String(filtro.limit)}
                            onValueChange={(value) =>
                                setFiltro((prev) => ({
                                    ...prev,
                                    limit: Number(value),
                                    page: 1
                                }))
                            }
                        >
                            <SelectTrigger className="h-11 w-full text-base">
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="4">4</SelectItem>
                                <SelectItem value="8">8</SelectItem>
                                <SelectItem value="12">12</SelectItem>
                            </SelectContent>
                        </Select>
                    </FieldContent>

                    {/* STATUS (VISUAL, OPCIONAL) */}
                    <FieldContent className="w-[320px]">
                    <Tabs
                        value={filtro.status}
                        onValueChange={(value) =>
                            setFiltro((prev) => ({
                                ...prev,
                                status: value,
                                page: 1
                            }))
                        }
                        className="w-full"
                    >
                        <FieldLabel>Status</FieldLabel>
                        <TabsList className="w-full">
                            <TabsTrigger value="all" className="flex-1">Todas</TabsTrigger>
                            <TabsTrigger value="ativa" className="flex-1">Ativa</TabsTrigger>
                            <TabsTrigger value="inativa" className="flex-1">Inativa</TabsTrigger>
                        </TabsList>
                    </Tabs>
                    </FieldContent>

                    {/* BOTÃO */}
                    <Button onClick={filtrar} className="text-white h-10">
                        Filtrar
                    </Button>

                </Field>

                {/* =========================
                    PAGINAÇÃO TOPO
                ========================= */}
                <Pagination>
                    <PaginationContent>

                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => changePage(filtro.page - 1)}
                                className={filtro.page === 1 ? "pointer-events-none opacity-50" : ""}
                            />
                        </PaginationItem>

                        {pages.map((p, i) => (
                            <PaginationItem key={i}>
                                {p === '...' ? (
                                    <PaginationEllipsis />
                                ) : (
                                    <PaginationLink
                                        isActive={p === filtro.page}
                                        onClick={() => changePage(p)}
                                    >
                                        {p}
                                    </PaginationLink>
                                )}
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationNext
                                onClick={() => changePage(filtro.page + 1)}
                                className={filtro.page === totalPages ? "pointer-events-none opacity-50" : ""}
                            />
                        </PaginationItem>

                    </PaginationContent>
                </Pagination>

                {/* =========================
                    GRID
                ========================= */}
                <div className="p-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                    {paginatedMaquinas.map((maquina, i) => (
                        <div
                            key={maquina.id || i}
                            className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-lg transition"
                        >
                            <div className="flex items-center gap-2 mb-3 text-gray-600">
                                <Cpu size={18} />
                                <span className="font-semibold text-sm">Máquina</span>
                            </div>

                            <h1 className="text-lg font-bold">
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
            </div>
        </div>
    );
}