'use client'

import { Cpu, PlusCircle, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useEmpresa } from "@/hooks/useEmpresa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
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
import { useParams } from "next/navigation";
import { useHeader } from "@/context/HeaderContext";
import { CardMaquina } from "@/components/Cards/CardMaquina/page";
import { useMaquinas } from "@/hooks/useMaquinas";
import { useSetores } from "@/hooks/useSetores";
import { useEmpresas } from "@/hooks/useEmpresas";

export default function PageMaquinas() {
    const params = useParams();
    const id_empresa = params.id;

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    // HOOKS
    const {
        loading: loadingEmpresas, error: errorEmpresas, mensagem: mensagemEmpresas,
        empresa, obterEmpresa,
    } = useEmpresas()

    const {
        loading: loadingSetores, error: errorSetores, mensagem: mensagemSetores,
        setores, obterSetores,
    } = useSetores()

    const {
        loading: loadingMaquinas, error: errorMaquinas, mensagem: mensagemMaquinas,
        maquinas, obterMaquinas,
    } = useMaquinas()

    // OBTER EMPRESA
    useEffect(() => {
        if (!empresa) {
            obterEmpresa(id_empresa)
        }
    }, [empresa, obterEmpresa])

    // OBTER SETORES
    useEffect(() => {
        if (!setores) {
            obterSetores(id_empresa)
        }
    }, [setores, obterSetores])

    // OBTER MAQUINAS
    useEffect(() => {
        if (!maquinas) {
            obterMaquinas(id_empresa)
        }
    }, [maquinas, obterMaquinas])

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    // FILTRAGEM

    // ESTADO PARA FILTROS E PAGINAÇÃO
    const [filtro, setFiltro] = useState({
        texto: "",
        status: null,
        limit: 10,
        page: 1,
        cod_setor: null,
    })

    // FETCH AUTOMÁTICO PARA FILTRAGEM
    useEffect(() => {
        obterMaquinas(id_empresa, filtro)
    }, [filtro.page, filtro.limit, filtro.status, filtro.cod_setor])

    // FILTRO MANUAL (Busca por descrição, nome ou código)
    const filtrar = () => {
        setFiltro((prev) => ({
            ...prev,
            page: 1
        }))

        obterMaquinas(id_empresa, {
            ...filtro,
            page: 1
        })
    }

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    // PAGINAÇÃO

    // TOTAL DE PÁGINAS
    const totalPages = maquinas?.paginacao?.total_paginas || 1

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

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    // CONTEÚDO
    let content;

    content = (
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

                {/* NOME, DESCRIÇÃO OU CÓDIGO*/}
                <FieldContent>
                    <FieldLabel>Procurar máquina</FieldLabel>
                    <Input
                        className="w-full h-11"
                        value={filtro.texto}
                        onChange={(e) =>
                            setFiltro((prev) => ({
                                ...prev,
                                texto: e.target.value
                            }))
                        }
                        placeholder="Nome, descrição ou código da máquina"
                    />
                </FieldContent>

                {/* LIMIT */}
                <FieldContent>
                    <FieldLabel>Máquinas por página</FieldLabel>

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
                            <TabsTrigger value="5" className="flex-1">5</TabsTrigger>
                            <TabsTrigger value="10" className="flex-1">10</TabsTrigger>
                            <TabsTrigger value="25" className="flex-1">25</TabsTrigger>
                            <TabsTrigger value="50" className="flex-1">50</TabsTrigger>
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

                {/* Setor */}
                <FieldContent className="h-full">
                    <FieldLabel>Setor</FieldLabel>

                    <Select
                        value={filtro.cod_setor ?? 'all'}
                        onValueChange={(value) =>
                            setFiltro((prev) => ({
                                ...prev,
                                cod_setor: value === 'all' ? null : value,
                                page: 1
                            }))
                        }
                    >
                        <SelectTrigger className="w-full h-full">
                            <SelectValue placeholder="Selecione um setor" />
                        </SelectTrigger>

                        <SelectContent className="" position="popper">
                            <SelectItem value="all" className="border">Todos</SelectItem>

                            <div>
                                {setores?.lista.map((s) => (
                                    <SelectItem key={s.id} value={s.cod_setor}>
                                        {s.cod_setor} - {s.nome}
                                    </SelectItem>
                                ))}
                            </div>
                        </SelectContent>
                    </Select>
                </FieldContent>

                {/* BOTÃO DE PROCURA*/}
                <div className="w-full h-full flex items-end">
                    <Button className="text-white w-full h-10 px-6 bg-techbridge" onClick={filtrar}>
                        <Search /> Procurar
                    </Button>
                </div>
            </Field>

            {/* PAGINAÇÃO */}
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
                    Exibindo {maquinas?.lista?.length ?? 0} de {maquinas?.paginacao?.total ?? 0} resultados
                </p>
            </Pagination>

            {/* DISPLAY */}
            <div className="h-full border bg-card p-3 rounded gap-3 items-start overflow-y-auto">

                {/* CARREGANDO EMPRESAS */}
                {loadingMaquinas.obterMaquinas &&
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

                        <p>Obtendo maquinas</p>
                    </div>
                }

                {/* ERRO AO OBTER EMPRESAS */}
                {errorMaquinas.obterMaquinas &&
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

                        <p>{errorMaquinas.obterMaquinas}</p>
                    </div>
                }

                {/* MAQUINAS CARREGADAS COM SUCESSO */}
                {!loadingMaquinas.obterMaquinas && !errorMaquinas.obterMaquinas && (<>
                    {/* <div className="border-b pb-3 mb-3">
                        <Button className="text-white w-full h-10 px-6 button-background border" onClick={() => { }}>
                            <PlusCircle /> Adicionar máquina
                        </Button>
                    </div> */}

                    {maquinas?.lista.length > 0
                        ? <div
                            className="
                                grid gap-4 items-start
                                [grid-template-columns:repeat(auto-fill,minmax(320px,1fr))]
                            "
                        >
                            {/* LISTANDO EMPRESAS */}
                            {maquinas?.lista?.map((maquina) => (
                                <CardMaquina key={maquina.id} maquina={maquina} />
                            ))}
                        </div>

                        // SEM MAQUINAS
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
                    }
                </>)
                }
            </div>
        </div>
    )



    // HEADER
    const { setHeader } = useHeader();

    useEffect(() => {
        setHeader({
            icon: Cpu,
            title: `[#${id_empresa}] ${empresa?.nome_fantasia} - Máquinas da empresa`,

        });
    }, [setHeader, empresa]);

    return content;
}