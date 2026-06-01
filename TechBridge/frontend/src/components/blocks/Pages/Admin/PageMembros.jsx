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
import CardEmpresas from "@/components/Cards/CardEmpresa/page";
import { useParams } from "next/navigation";
import { CardUsuario } from "@/components/Cards/CardUsuario/page";

export default function PageMembros() {
    const params = useParams();
    const id_empresa = params.id;

    // HOOK
    const {
        loading, error, mensagem,
        empresa, obterEmpresa,
        membros, obterMembros,
    } = useEmpresa()

    // OBTER EMPRESA
    useEffect(() => {
        if (!empresa) {
            obterEmpresa(id_empresa)
        }
    }, [empresa, obterEmpresa])

    // OBTER MEMBROS
    useEffect(() => {
        if (!membros) {
            obterMembros(id_empresa)
        }
    }, [membros, obterMembros])

    // ESTADO PARA FILTROS E PAGINAÇÃO
    const [filtro, setFiltro] = useState({
        texto: "",
        status: null,
        cargo: null,
        limit: 6,
        page: 1,
    })

    // FETCH AUTOMÁTICO PARA FILTRAGEM
    useEffect(() => {
        obterMembros(id_empresa, filtro)
    }, [filtro.page, filtro.limit, filtro.status, filtro.cargo])

    // FILTRO MANUAL (Busca por nome ou email)
    const filtrar = () => {
        setFiltro((prev) => ({
            ...prev,
            page: 1
        }))

        obterMembros(id_empresa, {
            ...filtro,
            page: 1
        })
    }

    // TOTAL DE PÁGINAS
    const totalPages = membros?.paginacao?.total_paginas || 1

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

    if (empresa) return (
        <div className="flex-1 flex flex-col">

            <HeaderPage
                icon={Warehouse}
                title={`Procurar Usuário - ${empresa.nome_fantasia}`}
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

                    {/* NOME OU EMAIL*/}
                    <FieldContent>
                        <FieldLabel>Procurar usuário</FieldLabel>
                        <Input
                            className="w-full h-11"
                            value={filtro.texto}
                            onChange={(e) =>
                                setFiltro((prev) => ({
                                    ...prev,
                                    texto: e.target.value
                                }))
                            }
                            placeholder="Nome ou email"
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
                                <TabsTrigger value="6" className="flex-1">6</TabsTrigger>
                                <TabsTrigger value="12" className="flex-1">12</TabsTrigger>
                                <TabsTrigger value="24" className="flex-1">24</TabsTrigger>
                                <TabsTrigger value="48" className="flex-1">48</TabsTrigger>
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
                                <TabsTrigger value="ativa" className="flex-1">Ativo</TabsTrigger>
                                <TabsTrigger value="inativa" className="flex-1">Inativo</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </FieldContent>

                    {/* CARGO */}
                    <FieldContent>
                        <FieldLabel>Cargo</FieldLabel>

                        <Tabs
                            value={filtro.cargo ?? 'all'}
                            onValueChange={(value) =>
                                setFiltro((prev) => ({
                                    ...prev,
                                    cargo: value === 'all' ? null : value,
                                    page: 1
                                }))
                            }
                            className="w-full bg-muted p-1 rounded-md"
                        >
                            <TabsList className="w-full">
                                <TabsTrigger value="all" className="flex-1">Todos</TabsTrigger>
                                <TabsTrigger value="gerente" className="flex-1">Gerente</TabsTrigger>
                                <TabsTrigger value="tecnico" className="flex-1">Tecnico</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </FieldContent>

                    <div className="w-full h-full flex items-end">
                        {/* BOTÃO */}
                        <Button className="text-white w-full h-10 px-6 bg-techbridge" onClick={filtrar}>
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
                        Exibindo {membros?.lista.length ?? 0} de {membros?.paginacao?.total ?? 0} resultados
                    </p>
                </Pagination>

                {/* DISPLAY */}
                <div className="h-full border bg-card p-3 rounded gap-3 items-start overflow-y-auto">

                    {/* CARREGANDO EMPRESAS */}
                    {loading.obterMembros &&
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

                            <p>Obtendo membros</p>
                        </div>
                    }

                    {/* ERRO AO OBTER EMPRESAS */}
                    {error.obterMembros &&
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

                            <p>{error.obterMembros}</p>
                        </div>
                    }

                    {/* MEMBROS CARREGADAS COM SUCESSO */}
                    {!loading.obterMembros && !error.obterMembros && (
                        membros?.lista.length > 0
                            ? <div
                                className="
                                        grid gap-4 items-start
                                        [grid-template-columns:repeat(auto-fill,minmax(320px,1fr))]
                                    "
                            >
                                {/* LISTANDO EMPRESAS */}
                                {membros?.lista?.map((membro) => (
                                    <CardUsuario key={membro.id} user={membro}/>
                                ))}
                            </div>
                            // SEM MEMBROS
                            : <div className="
                                    h-full w-full 
                                    flex flex-col items-center justify-center gap-4
                                    text-muted-foreground font-semibold text-center
                                ">
                                <Image
                                    height={128}
                                    width={128}
                                    alt="Logo Erro"
                                    src="/TechBridge/Logo.svg"
                                />

                                <p>Nenhum resultado encontrado para a busca</p>
                            </div>
                    )
                    }
                </div>
            </div>
        </div>
    )
}