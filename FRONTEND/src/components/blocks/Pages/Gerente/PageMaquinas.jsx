'use client'

import { useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from 'react';

import { useEmpresa } from '@/hooks/useEmpresa';
import { useAuth } from '@/context/AuthContext';
import { apiFetch } from '@/lib/api';

import ErrorPage from '../../Holders/ErrorPage';
import LoadingPage from '../../Holders/LoadingPage';
import HeaderPage from '../../Header/HeaderPage';

import { Grid2X2, RotateCw, Cpu } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue
} from "@/components/ui/select";

import {
    Pagination, PaginationContent, PaginationEllipsis,
    PaginationItem, PaginationLink, PaginationNext, PaginationPrevious,
} from "@/components/ui/pagination";


const STATUS_STYLES = {
    ativa:         'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
    inativa:       'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300',
    em_manutencao: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
    arquivada:     'bg-gray-100 text-gray-600 dark:bg-gray-500/20 dark:text-gray-300',
};

const STATUS_LABELS = {
    ativa:         'Ativa',
    inativa:       'Inativa',
    em_manutencao: 'Em manutenção',
    arquivada:     'Arquivada',
};


export default function PageMaquinas() {

    const { user } = useAuth();

    const {
        loading, error,
        maquinas, obterMaquinas,
    } = useEmpresa({});

    const [loadingStatus, setLoadingStatus] = useState(null); // id da máquina sendo atualizada

    useEffect(() => {
        if (!maquinas) obterMaquinas(user.id_empresa);
    }, [maquinas, obterMaquinas]);

    const isFirstLoad = loading.obterMaquinas && (maquinas ?? []).length === 0;

    const [filtro, setFiltro] = useState({
        nome_maquina: '',
        status: null,
        limit: 8,
        page: 1,
    });

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
        for (let i = inicio; i <= fim; i++) pages.push(i);
        if (fim < total) {
            if (fim < total - 1) pages.push('...');
            pages.push(total);
        }
        return pages;
    }

    const pages = gerarPaginas(filtro.page, totalPages);

    const filtrar = () => setFiltro((prev) => ({ ...prev, page: 1 }));

    const alterarStatus = async (maquina, novoStatus) => {
        setLoadingStatus(maquina.id);
        try {
            await apiFetch(
                `/empresas/${user.id_empresa}/setores/${maquina.cod_setor}/maquinas/${maquina.cod_maquina}`,
                {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: novoStatus }),
                }
            );
            await obterMaquinas(user.id_empresa);
        } catch (err) {
            console.error('Erro ao alterar status:', err);
        } finally {
            setLoadingStatus(null);
        }
    };

    // FIRST LOAD
    if (isFirstLoad) {
        return (
            <LoadingPage
                loadingTitle="Carregando Máquinas"
                loadingSubtitle={["Organizando painel de operação..."]}
            />
        );
    }

    // ERROR
    if (error.obterMaquinas) {
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

    const content = (
        <div className="p-4 flex-1 flex flex-col gap-4">

            {/* FILTROS */}
            <Field
                orientation="horizontal"
                className="border bg-card p-3 rounded gap-3 items-end flex-wrap"
            >
                <FieldContent className="w-[280px]">
                    <FieldLabel>Procurar Máquina</FieldLabel>
                    <Input
                        value={filtro.nome_maquina}
                        onChange={(e) =>
                            setFiltro((prev) => ({ ...prev, nome_maquina: e.target.value }))
                        }
                        placeholder="Nome da máquina..."
                    />
                </FieldContent>

                <FieldContent className="w-[180px]">
                    <FieldLabel>Itens por página</FieldLabel>
                    <Select
                        value={String(filtro.limit)}
                        onValueChange={(value) =>
                            setFiltro((prev) => ({ ...prev, limit: Number(value), page: 1 }))
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

                <FieldContent className="w-xs">
                    <Tabs
                        value={filtro.status}
                        onValueChange={(value) =>
                            setFiltro((prev) => ({ ...prev, status: value, page: 1 }))
                        }
                        className="w-full"
                    >
                        <FieldLabel>Status</FieldLabel>
                        <TabsList className="w-full">
                            <TabsTrigger value="all"    className="flex-1">Todas</TabsTrigger>
                            <TabsTrigger value="ativa"  className="flex-1">Ativa</TabsTrigger>
                            <TabsTrigger value="inativa" className="flex-1">Inativa</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </FieldContent>

                <Button onClick={filtrar} className="text-white h-10">
                    Filtrar
                </Button>
            </Field>

            {/* PAGINAÇÃO */}
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

            {/* CARDS */}
            <div className="p-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {paginatedMaquinas.map((maquina, i) => (
                    <div
                        key={maquina.id || i}
                        className="bg-white dark:bg-sidebar border rounded-2xl p-5 shadow-sm hover:shadow-lg transition"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-2 mb-3 text-gray-600">
                                    <Cpu className="dark:text-white" size={18} />
                                    <span className="font-semibold dark:text-white text-sm">Máquina</span>
                                </div>

                                <h1 className="text-lg font-bold dark:text-white">
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

                            {/* BADGE / SELECT DE STATUS */}
                            <Select
                                value={maquina.status}
                                onValueChange={(novoStatus) => alterarStatus(maquina, novoStatus)}
                                disabled={loadingStatus === maquina.id}
                            >
                                <SelectTrigger className={`w-fit h-7 text-xs font-medium rounded-full border-0 px-3 ${STATUS_STYLES[maquina.status] ?? ''}`}>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(STATUS_LABELS).map(([value, label]) => (
                                        <SelectItem key={value} value={value}>
                                            {label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="flex-1 flex flex-col bg-gray-50 dark:bg-sidebar">
            <HeaderPage
                icon={Grid2X2}
                title="Máquinas em Operação"
                actions={[
                    {
                        icon: <RotateCw className={loading.obterMaquinas ? "animate-spin" : ""} />,
                        text: loading.obterMaquinas ? "Atualizando..." : "Recarregar",
                        onClick: () => obterMaquinas(user?.id_empresa),
                        disabled: loading.obterMaquinas,
                    },
                ]}
            />
            {content}
        </div>
    );
}