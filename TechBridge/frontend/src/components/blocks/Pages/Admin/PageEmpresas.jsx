'use client'

import { Building2, Warehouse } from "lucide-react";
import HeaderPage from "../../Header/HeaderPage";
import { useEffect, useState } from "react";
import { useEmpresa } from "@/hooks/useEmpresa";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    let content;

    const [filtro, setFiltro] = useState({
        nome: '',
        status: null,
        limit: 10,
        page: 1,
    })

    const {
        empresas,
        loading,
        error,
        obterEmpresas
    } = useEmpresa()

    useEffect(() => {
        if (!empresas) { obterEmpresas() }
    }, [empresas])



    const pages = gerarPaginas(
        filtro.page,
        empresas?.paginacao?.total_paginas || 1
    );


    useEffect(() => {
        obterEmpresas(filtro)
    }, [filtro.page, filtro.limit, filtro.status])


    content = (
        <div className="flex-1 flex flex-col gap-4">
            {/* FILTRO */}
            <Field
                orientation="horizontal"
                className="border bg-card p-3 rounded gap-3"
            >
                {/* FILTRO POR NOME */}
                <FieldContent>
                    <FieldLabel>Procurar Empresa</FieldLabel>
                    <Input type='text'
                        value={filtro.nome}
                        onChange={(e) => {
                            setFiltro((prev) => ({
                                ...prev,
                                nome: e.target.value
                            }))
                        }}
                    />
                </FieldContent>

                {/* EMPRESAS POR PAGINA */}
                <FieldContent>
                    <FieldLabel>Empresas por página</FieldLabel>
                    <Select
                        value={String(filtro.limit)}
                        onValueChange={(value) => {
                            setFiltro((prev) => ({
                                ...prev,
                                limit: Number(value),
                                page: 1
                            }))
                        }}
                    >
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Por página" />
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
                <FieldContent >
                    <FieldLabel>Status</FieldLabel>
                    <Tabs
                        value={filtro.status ?? 'all'}
                        className="w-[400px]"
                        onValueChange={(value) => {
                            setFiltro((prev) => ({
                                ...prev,
                                status: value === 'all' ? null : value
                            }))
                        }}
                    >
                        <TabsList>
                            <TabsTrigger value="all">Todas</TabsTrigger>
                            <TabsTrigger value="ativa">Ativa</TabsTrigger>
                            <TabsTrigger value="inativa">Inativa</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </FieldContent>

                <Button className='text-white'>Procurar</Button>
            </Field>


            {/* PAGINAÇÃO SUPERIOR*/}
            <Pagination>
                <PaginationContent>
                    {/* ANTERIOR */}
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() =>
                                setFiltro((prev) => ({ ...prev, page: prev.page - 1 }))
                            }
                            disabled={filtro.page === 1}
                        />
                    </PaginationItem>

                    {/* PAGINAS */}
                    {pages.map((p, index) => (
                        <PaginationItem key={index}>
                            {p === '...' ? (
                                <PaginationEllipsis />
                            ) : (
                                <PaginationLink
                                    isActive={p === filtro.page}
                                    onClick={() =>
                                        setFiltro((prev) => ({ ...prev, page: p }))
                                    }
                                >
                                    {p}
                                </PaginationLink>
                            )}
                        </PaginationItem>
                    ))}

                    {/* NEXT */}
                    <PaginationItem>
                        <PaginationNext
                            onClick={() =>
                                setFiltro((prev) => ({ ...prev, page: prev.page + 1 }))
                            }
                            disabled={
                                filtro.page === empresas?.paginacao?.total_paginas
                            }
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>


            {/* CONTEÚDO */}
            {loading.obterEmpresas && <>Obtendo empresas</>}
            {error.obterEmpresas && <>{error.obterEmpresas}</>}

            <div className="h-full border bg-card p-3 rounded grid grid-cols-4 gap-3 items-start overflow-y-auto">
                {/* // CARD EMPRESAS */}
                {empresas?.lista?.map((e) => {
                    return <div
                        key={e.id}
                        className="
                            items-center
                            bg-card border rounded shadow-xl
                            p-3 text-xs

                        "
                    >
                        {/* IMAGEM */}
                        <div className="flex gap-3">
                            {/* IMAGEM DA EMPRESA */}
                            <div className="
                            flex items-center justify-center relative
                            border p-2 w-40 h-40 
                        ">
                                {/* IMAGEM */}
                                <Building2 size={'lg'} />

                                {/* STATUS */}
                                <div
                                    className={`
                                    absolute top-1 right-1
                                    w-5 h-5 rounded-full
                                    flex items-center justify-center
                                    ${e.status ? 'bg-ativo' : 'bg-inativo'}
                                `}
                                >
                                    <div className={`w-2 h-2 rounded-full bg-white`}></div>
                                </div>
                            </div>

                            {/* DADOS DA EMPRESA */}
                            <div className="h-30 flex flex-col flex-1 overflow-y-auto">
                                <div className="font-bold text-xl">{e.nome_fantasia}</div>
                                <div className="my-1">Registro em {format(e.data_criacao, 'dd/MM/yyyy', { locale: ptBR })}</div>
                                {!e.status && <div className="my-1">desativada em {format(e.data_desativacao, 'dd/MM/yyyy', { locale: ptBR })}</div>}
                                <div className="my-1 text-muted-foreground flex-1 text-md">{e.razao_social}</div>
                            </div>
                        </div>

                        {/* VER EMPRESA */}
                        <Button asChild className='text-white mt-3 w-full'>
                            <Link href={`/admin/empresas/${e.id}`}>Ver empresa</Link>
                        </Button>
                    </div>
                })}
            </div>


            {/* PAGINAÇÃO INFERIOR*/}
            <Pagination>
                <PaginationContent>
                    {/* ANTERIOR */}
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() =>
                                setFiltro((prev) => ({ ...prev, page: prev.page - 1 }))
                            }
                            disabled={filtro.page === 1}
                        />
                    </PaginationItem>

                    {/* PAGINAS */}
                    {pages.map((p, index) => (
                        <PaginationItem key={index}>
                            {p === '...' ? (
                                <PaginationEllipsis />
                            ) : (
                                <PaginationLink
                                    isActive={p === filtro.page}
                                    onClick={() =>
                                        setFiltro((prev) => ({ ...prev, page: p }))
                                    }
                                >
                                    {p}
                                </PaginationLink>
                            )}
                        </PaginationItem>
                    ))}

                    {/* NEXT */}
                    <PaginationItem>
                        <PaginationNext
                            onClick={() =>
                                setFiltro((prev) => ({ ...prev, page: prev.page + 1 }))
                            }
                            disabled={
                                filtro.page === empresas?.paginacao?.total_paginas
                            }
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )

    return (
        <div className="flex-1 flex flex-col">
            {/* Header da página */}
            <HeaderPage
                icon={Warehouse}
                title="Procurar Empresa"
            />

            <div className="p-4 flex-1 flex">
                {content}
            </div>

            {/* <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto border">
                <p>FILTRO</p>
                {JSON.stringify(filtro, null, 2)}
            </pre> */}
        </div>
    );
}










function gerarPaginas(page, total) {
    const pages = [];

    const delta = 2; // quantas páginas antes/depois

    const inicio = Math.max(1, page - delta);
    const fim = Math.min(total, page + delta);

    // sempre inclui a primeira
    if (inicio > 1) {
        pages.push(1);
        if (inicio > 2) pages.push('...');
    }

    for (let i = inicio; i <= fim; i++) {
        pages.push(i);
    }

    // sempre inclui a última
    if (fim < total) {
        if (fim < total - 1) pages.push('...');
        pages.push(total);
    }

    return pages;
}