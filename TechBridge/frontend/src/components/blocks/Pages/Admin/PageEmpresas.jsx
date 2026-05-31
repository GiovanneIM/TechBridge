'use client'

import { Warehouse } from "lucide-react";
import HeaderPage from "../../Header/HeaderPage";
import { useEffect, useState } from "react";
import { useEmpresa } from "@/hooks/useEmpresa";
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
} from "@/components/ui/pagination"
import Image from "next/image";
import CardEmpresas from "@/components/card/CardEmpresas/page";

export default function PageEmpresas() {

    // OBJETO COM OS ESTADOS AGRUPADOS POR REGIÃO
    const estadosPorRegiao = {
        "Norte": ["AC", "AP", "AM", "PA", "RO", "RR", "TO"],
        "Centro-Oeste": ["DF", "GO", "MT", "MS"],
        "Nordeste": ["AL", "BA", "CE", "MA", "PB", "PE", "PI", "RN", "SE"],
        "Sudeste": ["ES", "MG", "RJ", "SP"],
        "Sul": ["PR", "RS", "SC"]
    };

    // HOOK
    const {
        loading, error,
        empresas, obterEmpresas
    } = useEmpresa()

    // OBTENDO EMPRESAS INICIAIS
    useEffect(() => {
        if (!empresas) {
            obterEmpresas()
        }
    }, [empresas, obterEmpresas])

    // ESTADO PARA FILTROS E PAGINAÇÃO
    const [filtro, setFiltro] = useState({
        nome_empresa: "",
        status: null,
        limit: 10,
        page: 1,
        estado: null,
    })

    // FETCH AUTOMÁTICO PARA FILTRAGEM
    useEffect(() => {
        obterEmpresas(filtro)
    }, [filtro.page, filtro.limit, filtro.status])

    // FILTRO MANUAL (Busca por nome)
    const filtrar = () => {
        setFiltro((prev) => ({
            ...prev,
            page: 1
        }))

        obterEmpresas({
            ...filtro,
            page: 1
        })
    }

    // TOTAL DE PÁGINAS
    const totalPages = empresas?.paginacao?.total_paginas || 1

    // GERA VETOR COM O NÚMERO DAS PÁGINAS NA PAGINAÇÃO
    function gerarPaginas(page, total) {
        const pages = []
        const delta = 2     // DISTÂNCIA DE EXIBIÇÃO (Mostra delta páginas antes da atual e delta páginas depois da atual)

        const inicio = Math.max(1, page - delta)        // PÁGINA INICIAL DA PAGINAÇÃO
        const fim = Math.min(total, page + delta)       // PÁGINA FINAL DA PAGINAÇÃO

        // FORMANDO O ARRAY COM O NÚMERO DAS PÁGINAS
        if (inicio > 1) {
            pages.push(1)
            if (inicio > 2) pages.push('...')
        }

        for (let i = inicio; i <= fim; i++) {
            pages.push(i)
        }

        if (fim < total) {
            if (fim < total - 1) pages.push('...')
            pages.push(total)
        }

        // RETORNA O ARRAY
        return pages
    }

    // ARRAY COM O NÚMERO DAS PÁGINAS
    const pages = gerarPaginas(filtro.page, totalPages)

    // FUNÇÃO PARA MUDAR A PÁGINA
    const changePage = (page) => {
        // SE O NÚMERO DA PÁGINA ESTIVER FORA DO ESCOPO
        if (page < 1 || page > totalPages) return

        // ALTERA O FILTRO
        setFiltro((prev) => ({ ...prev, page }))
    }

    return (
        <div className="flex-1 flex flex-col">

            <HeaderPage
                icon={Warehouse}
                title="Procurar Empresa"
            />


            <div className="p-4 flex-1 flex flex-col gap-4">
                {/* FILTRO */}
                <Field
                    orientation="horizontal"
                    className="
                        border bg-card p-4 rounded-lg gap-4
                        grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5
                        items-end
                    "
                >

                    {/* NOME */}
                    <FieldContent>
                        <FieldLabel>Procurar Empresa</FieldLabel>
                        <Input
                            className="w-full h-11"
                            value={filtro.nome_empresa}
                            onChange={(e) =>
                                setFiltro((prev) => ({
                                    ...prev,
                                    nome_empresa: e.target.value
                                }))
                            }
                            placeholder="Nome da empresa..."
                        />
                    </FieldContent>

                    {/* LIMIT */}
                    <FieldContent>
                        <FieldLabel>Empresas por página</FieldLabel>

                        <Tabs
                            value={String(filtro.limit)}
                            onValueChange={(value) =>
                                setFiltro((prev) => ({
                                    ...prev,
                                    limit: Number(value),
                                    page: 1
                                }))
                            }

                            className="w-full bg-muted p-1 rounded-md"
                        >
                            <TabsList className="w-full">
                                <TabsTrigger value="10" className="flex-1">10</TabsTrigger>
                                <TabsTrigger value="25" className="flex-1">25</TabsTrigger>
                                <TabsTrigger value="50" className="flex-1">50</TabsTrigger>
                                <TabsTrigger value="100" className="flex-1">100</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </FieldContent>

                    {/* STATUS */}
                    <FieldContent>
                        <FieldLabel>Status</FieldLabel>

                        <Tabs
                            value={filtro.status ?? 'all'}
                            onValueChange={(value) =>
                                setFiltro((prev) => ({
                                    ...prev,
                                    status: value === 'all' ? null : value,
                                    page: 1
                                }))
                            }
                            className="w-full bg-muted p-1 rounded-md"
                        >
                            <TabsList className="w-full">
                                <TabsTrigger value="all" className="flex-1">Todas</TabsTrigger>
                                <TabsTrigger value="ativa" className="flex-1">Ativa</TabsTrigger>
                                <TabsTrigger value="inativa" className="flex-1">Inativa</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </FieldContent>

                    {/* ESTADO */}
                    <FieldContent className="h-full">
                        <FieldLabel>Estado</FieldLabel>

                        <Select
                            value={filtro.estado ?? 'all'}
                            onValueChange={(value) =>
                                setFiltro((prev) => ({
                                    ...prev,
                                    estado: value === 'all' ? null : value,
                                    page: 1
                                }))
                            }
                        >
                            <SelectTrigger className="w-full h-full">
                                <SelectValue placeholder="Selecione um estado" />
                            </SelectTrigger>

                            <SelectContent className="" position="popper">
                                <SelectItem value="all" className="border">Todos</SelectItem>

                                {/* GRID */}
                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <div>
                                        <div>
                                            <p className="
                                                text-xs font-semibold mb-1
                                                text-foreground/70 tracking-wide
                                                border-b py-1.5 pr-8 pl-2
                                            ">
                                                Norte
                                            </p>

                                            {estadosPorRegiao["Norte"].map((uf) => (
                                                <SelectItem key={uf} value={uf}>
                                                    {uf}
                                                </SelectItem>
                                            ))}
                                        </div>

                                        <div>
                                            <p className="
                                                text-xs font-semibold mb-1
                                                text-foreground/70 tracking-wide
                                                border-b py-1.5 pr-8 pl-2
                                            ">
                                                Nordeste
                                            </p>

                                            {estadosPorRegiao["Nordeste"].map((uf) => (
                                                <SelectItem key={uf} value={uf}>
                                                    {uf}
                                                </SelectItem>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <div>
                                            <p className="
                                                text-xs font-semibold mb-1
                                                text-foreground/70 tracking-wide
                                                border-b py-1.5 pr-8 pl-2
                                            ">
                                                Centro-Oeste
                                            </p>

                                            {estadosPorRegiao["Centro-Oeste"].map((uf) => (
                                                <SelectItem key={uf} value={uf}>
                                                    {uf}
                                                </SelectItem>
                                            ))}
                                        </div>

                                        <div>
                                            <p className="
                                                text-xs font-semibold mb-1
                                                text-foreground/70 tracking-wide
                                                border-b py-1.5 pr-8 pl-2
                                            ">
                                                Sul
                                            </p>

                                            {estadosPorRegiao["Sul"].map((uf) => (
                                                <SelectItem key={uf} value={uf}>
                                                    {uf}
                                                </SelectItem>
                                            ))}
                                        </div>

                                        <div>
                                            <p className="
                                                text-xs font-semibold mb-1
                                                text-foreground/70 tracking-wide
                                                border-b py-1.5 pr-8 pl-2
                                            ">
                                                Sudeste
                                            </p>

                                            {estadosPorRegiao["Sudeste"].map((uf) => (
                                                <SelectItem key={uf} value={uf}>
                                                    {uf}
                                                </SelectItem>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </SelectContent>
                        </Select>
                    </FieldContent>

                    <div className="w-full h-full flex items-end">
                        {/* BOTÃO */}
                        <Button className="text-white w-full h-10 px-6" onClick={filtrar}>
                            Procurar
                        </Button>
                    </div>
                </Field>

                {/* PAGINAÇÃO SUPERIOR */}
                <Pagination className="flex-col items-center gap-2">
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

                    <p className="text-muted-foreground font-semibold text-xs">
                        Exibindo {empresas?.lista.length ?? 0} de {empresas?.paginacao?.total ?? 0} resultados
                    </p>
                </Pagination>

                {/* DISPLAY */}
                <div className="h-full border bg-card p-3 rounded gap-3 items-start overflow-y-auto">

                    {/* CARREGANDO EMPRESAS */}
                    {loading.obterEmpresas &&
                        <div className="
                            h-full w-full 
                            flex flex-col items-center justify-center gap-4
                            text-muted-foreground font-semibold text-center
                        ">
                            <Image
                                height={128}
                                width={128}
                                alt="Logo Erro"
                                src="/TechBridge/Logo.svg"
                                className="animate-pulse"
                            />

                            <p>Obtendo empresas</p>
                        </div>
                    }

                    {/* ERRO AO OBTER EMPRESAS */}
                    {error.obterEmpresas &&
                        <div className="
                            h-full w-full 
                            flex flex-col items-center justify-center gap-4
                            text-muted-foreground font-semibold text-center
                        ">
                            <Image
                                height={128}
                                width={128}
                                alt="Logo Erro"
                                src="/TechBridge/LogoError.svg"
                            />

                            <p>{error.obterEmpresas}</p>
                        </div>
                    }

                    {/* EMPRESAS CARREGADAS COM SUCESSO */}
                    {!loading.obterEmpresas && !error.obterEmpresas &&
                        <div className="
                            h-full w-full 
                            flex flex-wrap justify-center gap-4
                        ">
                            {/* LISTANDO EMPRESAS */}
                            {empresas?.lista?.map((empresa) => (
                                <CardEmpresas key={empresa.id} empresa={empresa} />
                            ))}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}