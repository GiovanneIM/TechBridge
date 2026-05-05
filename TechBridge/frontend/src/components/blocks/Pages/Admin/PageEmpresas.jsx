'use client'

import { Building2, Warehouse } from "lucide-react";
import HeaderPage from "../../Header/HeaderPage";
import { useEffect, useState } from "react";
import { useEmpresa } from "@/hooks/useEmpresa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
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

export default function PageEmpresas() {

    const {
        empresas,
        loading,
        error,
        obterEmpresas
    } = useEmpresa()

    const [filtro, setFiltro] = useState({
        nome_empresa: '',
        status: null,
        limit: 10,
        page: 1,
    })

    // FETCH AUTOMÁTICO
    useEffect(() => {
        obterEmpresas(filtro)
    }, [filtro.page, filtro.limit, filtro.status])

    // FILTRO MANUAL
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

    const totalPages = empresas?.paginacao?.total_paginas || 1

    function gerarPaginas(page, total) {
        const pages = []
        const delta = 2

        const inicio = Math.max(1, page - delta)
        const fim = Math.min(total, page + delta)

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

        return pages
    }

    const pages = gerarPaginas(filtro.page, totalPages)

    const changePage = (page) => {
        if (page < 1 || page > totalPages) return
        setFiltro((prev) => ({ ...prev, page }))
    }

    return (
        <div className="flex-1 flex flex-col">

            <HeaderPage
                icon={Warehouse}
                title="Procurar Empresa"
            />

            <div className="p-4 flex-1 flex flex-col gap-4">

                {/* =========================
                    FILTROS (AJUSTADO VISUAL)
                ========================= */}
                <Field
                    orientation="horizontal"
                    className="border bg-card p-3 rounded gap-3 items-end flex-wrap"
                >

                    {/* NOME */}
                    <FieldContent className="w-[280px]">
                        <FieldLabel>Procurar Empresa</FieldLabel>
                        <Input
                            className="w-full"
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
                    <FieldContent className="w-[180px]">
                        <FieldLabel>Empresas por página</FieldLabel>
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
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="5">5</SelectItem>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="25">25</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                                <SelectItem value="100">100</SelectItem>
                            </SelectContent>
                        </Select>
                    </FieldContent>

                    {/* STATUS */}
                    <FieldContent className="w-[320px]">
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
                            className="w-full"
                        >
                            <TabsList className="w-full">
                                <TabsTrigger value="all" className="flex-1">Todas</TabsTrigger>
                                <TabsTrigger value="ativa" className="flex-1">Ativa</TabsTrigger>
                                <TabsTrigger value="inativa" className="flex-1">Inativa</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </FieldContent>

                    {/* BOTÃO */}
                    <Button className="text-white h-10" onClick={filtrar}>
                        Procurar
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
                    ESTADOS
                ========================= */}
                {loading.obterEmpresas && <div>Obtendo empresas</div>}
                {error.obterEmpresas && <div>{error.obterEmpresas}</div>}

                {/* =========================
                    GRID
                ========================= */}
                <div className="h-full border bg-card p-3 rounded grid grid-cols-4 gap-3 items-start overflow-y-auto">

                    {empresas?.lista?.map((e) => (
                        <div
                            key={e.id}
                            className="items-center bg-card border rounded shadow-xl p-3 text-xs"
                        >
                            <div className="flex gap-3">

                                <div className="flex items-center justify-center relative border p-2 w-40 h-40">
                                    <Building2 size={40} />

                                    <div className={`absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center ${e.status ? 'bg-ativo' : 'bg-inativo'}`}>
                                        <div className="w-2 h-2 rounded-full bg-white"></div>
                                    </div>
                                </div>

                                <div className="h-30 flex flex-col flex-1 overflow-y-auto">
                                    <div className="font-bold text-xl">{e.nome_fantasia}</div>

                                    <div className="my-1">
                                        Registro em {format(new Date(e.data_criacao), 'dd/MM/yyyy', { locale: ptBR })}
                                    </div>

                                    {!e.status && (
                                        <div className="my-1">
                                            desativada em {format(new Date(e.data_desativacao), 'dd/MM/yyyy', { locale: ptBR })}
                                        </div>
                                    )}

                                    <div className="my-1 text-muted-foreground flex-1 text-md">
                                        {e.razao_social}
                                    </div>
                                </div>

                            </div>

                            <Button asChild className='text-white mt-3 w-full'>
                                <Link href={`/admin/empresas/${e.id}`}>
                                    Ver empresa
                                </Link>
                            </Button>

                        </div>
                    ))}
                </div>

                {/* =========================
                    PAGINAÇÃO FINAL
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

            </div>
        </div>
    )
}