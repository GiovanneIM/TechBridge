'use client'

import { useEmpresa } from "@/hooks/useEmpresa";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { ArrowRightCircle, Building2, Calendar, CheckCircle2, Cpu, Factory, MinusCircle, Pencil, Siren, User2, Warehouse } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useHeader } from "@/context/HeaderContext";
import { API_URL } from "@/lib/api";

export default function PageEmpresa() {
    const params = useParams();
    const id_empresa = params.id;

    // OBTENDO EMPRESA
    const {
        loading, error,
        empresa, obterEmpresa,
        obterInfosGerais
    } = useEmpresa()

    useEffect(() => {
        if (!empresa) obterEmpresa(id_empresa)
    }, [empresa, obterEmpresa])

    // OBTENDO INFORMAÇÕES GERAIS
    const [infosGerais, setInfosGerais] = useState(null)

    useEffect(() => {
        async function carregarInfos() {
            const infos = await obterInfosGerais(empresa.id);
            setInfosGerais(infos);
        }

        if (empresa && !infosGerais) {
            carregarInfos();
        }
    }, [empresa, infosGerais, obterInfosGerais])

    

    // CONTEÚDO
    let content;

    // EMPRESA CARREGADA
    if (empresa) {
        content = (<>
            <div className="w-full p-4 flex-1 flex flex-col gap-4">
                {/* CONTROLE */}
                <Card className="
                    w-full border p-4
                    flex justify-between flex-col 2xl:flex-row
                    gap-3
                    overflow-hidden
                ">
                    <div className="flex flex-col sm:flex-row gap-3 font-semibold">
                        <div className="rounded-xl border bg-muted/30 p-3 sm:w-50">
                            <p className="text-sm text-muted-foreground">
                                Status
                            </p>

                            <div className="flex flex-wrap items-center gap-2 font-semibold">
                                {empresa.status
                                    ? (<p className="text-green-700 dark:text-green-500">Ativa</p>)
                                    : (<p className="text-red-700 dark:text-red-500">Inativa</p>)
                                }
                            </div>
                        </div>

                        <div className="rounded-xl border bg-muted/30 p-3 sm:w-50">
                            <p className="text-sm text-muted-foreground">
                                Empresa registrada em
                            </p>

                            <p className="flex items-center gap-2 font-semibold break-words">
                                <Calendar size={14} />
                                <span>{format(new Date(empresa.data_criacao), 'dd/MM/yyyy', { locale: ptBR })} </span>
                            </p>
                        </div>

                        {!empresa.status && (
                            <div className="rounded-xl border bg-muted/30 p-3 sm:w-50">
                                <p className="text-sm text-muted-foreground">
                                    Empresa desativada em
                                </p>

                                <p className="flex items-center gap-2 font-semibold break-words text-red-700 dark:text-red-500">
                                    <Calendar size={14} />
                                    <span>{format(new Date(empresa.data_desativacao), 'dd/MM/yyyy', { locale: ptBR })} </span>
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="
                        flex flex-wrap gap-3 items-center
                        rounded-xl
                    ">
                        <Button className="button-background border w-full sm:w-50" asChild>
                            <Link href={`/admin/empresas/${empresa.id}/editar`}>
                                <Pencil /> Editar empresa
                            </Link>
                        </Button>

                        {!empresa.status
                            ? (<Button className="
                                    bg-green-700 hover:bg-green-600
                                    dark:bg-green-600 dark:hover:bg-green-700
                                    text-white
                                    w-full sm:w-50"
                                >
                                    <CheckCircle2 /> Reativar empresa
                                </Button>)
                            : (<Button className="
                                    bg-red-700 hover:bg-red-600 
                                    dark:bg-red-600 dark:hover:bg-red-700
                                    text-white
                                    w-full sm:w-50"
                                >
                                    <MinusCircle /> Desativar empresa
                                </Button>)
                        }
                    </div>
                </Card>

                {/* DADOS DA EMPRESA */}
                <Card className="
                    w-full border p-4
                    flex flex-col 2xl:flex-row
                    gap-6
                    overflow-hidden
                ">
                    <div className="
                        w-full sm:w-100 aspect-square
                        border rounded-xl bg-muted
                        shrink-0
                        mx-auto
                        flex items-center justify-center
                        overflow-hidden
                    ">
                        {empresa?.logo
                            ? (<img
                                src={API_URL + `/uploads/imagens/empresas/${empresa.id}/logo/${empresa.logo}`}
                                className="object-cover w-full h-full"
                                alt={empresa.nome_fantasia}
                            />)
                            : (<Building2 size={100} className="text-muted-foreground" />)
                        }
                    </div>

                    <div className="
                        flex-1
                        min-w-0
                        grid sm:grid-cols-2 xl:grid-cols-1
                        gap-4
                    ">
                        <div className="rounded-xl border bg-muted/30 p-3">
                            <p className="text-sm text-muted-foreground">
                                Razão Social
                            </p>

                            <p className="font-semibold break-words">
                                {empresa?.razao_social ?? "- - - - - - - - - -"}
                            </p>
                        </div>

                        <div className="rounded-xl border bg-muted/30 p-3">
                            <p className="text-sm text-muted-foreground">
                                Nome Fantasia
                            </p>

                            <p className="font-semibold break-words">
                                {empresa?.nome_fantasia ?? "- - - - - - - - - -"}
                            </p>
                        </div>

                        <div className="rounded-xl border bg-muted/30 p-3">
                            <p className="text-sm text-muted-foreground">
                                CNPJ
                            </p>

                            <p className="font-semibold break-words">
                                {empresa?.cnpj ?? "- - - - - - - - - -"}
                            </p>
                        </div>

                        <div className="rounded-xl border bg-muted/30 p-3">
                            <p className="text-sm text-muted-foreground">
                                ID
                            </p>

                            <p className="font-semibold break-words">
                                # {empresa?.id ?? "- - - - - - - - - -"}
                            </p>
                        </div>
                    </div>

                    <div className="
                        flex-2
                        min-w-0
                        grid grid-cols-1 sm:grid-cols-2
                        gap-4
                    ">
                        <div className="rounded-xl border bg-muted/30 p-3">
                            <p className="text-sm text-muted-foreground">
                                CEP
                            </p>

                            <p className="font-semibold break-words">
                                {empresa?.cep ?? "- - - - - - - - - -"}
                            </p>
                        </div>

                        <div className="rounded-xl border bg-muted/30 p-3">
                            <p className="text-sm text-muted-foreground">
                                Rua
                            </p>

                            <p className="font-semibold break-words">
                                {empresa?.rua ?? "- - - - - - - - - -"}
                            </p>
                        </div>

                        <div className="rounded-xl border bg-muted/30 p-3">
                            <p className="text-sm text-muted-foreground">
                                Número
                            </p>

                            <p className="font-semibold break-words">
                                {empresa?.numero ?? "- - - - - - - - - -"}
                            </p>
                        </div>

                        <div className="rounded-xl border bg-muted/30 p-3">
                            <p className="text-sm text-muted-foreground">
                                Complemento
                            </p>

                            <p className="font-semibold break-words">
                                {empresa?.complemento ?? "- - - - - - - - - -"}
                            </p>
                        </div>

                        <div className="rounded-xl border bg-muted/30 p-3">
                            <p className="text-sm text-muted-foreground">
                                Bairro
                            </p>

                            <p className="font-semibold break-words">
                                {empresa?.bairro ?? "- - - - - - - - - -"}
                            </p>
                        </div>

                        <div className="rounded-xl border bg-muted/30 p-3">
                            <p className="text-sm text-muted-foreground">
                                Cidade
                            </p>

                            <p className="font-semibold break-words">
                                {empresa?.cidade ?? "- - - - - - - - - -"}
                            </p>
                        </div>

                        <div className="rounded-xl border bg-muted/30 p-3">
                            <p className="text-sm text-muted-foreground">
                                Estado
                            </p>

                            <p className="font-semibold break-words">
                                {empresa?.estado ?? "- - - - - - - - - -"}
                            </p>
                        </div>
                    </div>
                </Card>

                <div className="
                    grid grid-cols-1
                    2xl:grid-cols-2
                    gap-4
                ">
                    <div className="flex flex-col gap-4">
                        {/* MEMBROS DA EMPRESA */}
                        <Card className="border p-4 gap-4">
                            {/* TITULO */}
                            <div className="w-full sm:flex justify-between items-end sm:border-b sm:pb-1">
                                <p className="font-genty text-xl border-b sm:border-0 pb-1 mb-2 sm:mb-0">Integrantes da empresa</p>

                                <Button variant="outline" className="w-full sm:w-50" asChild>
                                    <Link href={`/admin/empresas/${empresa.id}/membros`}>
                                        Ver Integrantes <ArrowRightCircle className="inline" />
                                    </Link>
                                </Button>
                            </div>

                            {/* INFOS */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">

                                {/* TOTAL */}
                                <div className="
                                    rounded-xl border bg-muted/20
                                    p-4
                                    flex flex-col gap-2
                                    transition hover:bg-muted/40
                                ">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-muted-foreground font-medium">
                                            Total de membros
                                        </p>

                                        <User2 size={18} className="text-muted-foreground" />
                                    </div>

                                    <p className="text-3xl font-bold leading-none">
                                        {infosGerais?.usuarios?.total ?? 0}
                                    </p>
                                </div>

                                {/* ATIVOS */}
                                <div className="
                                    rounded-xl border bg-green-500/10
                                    p-4
                                    flex flex-col gap-2
                                    transition hover:bg-green-500/15
                                ">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-muted-foreground font-medium">
                                            Membros ativos
                                        </p>

                                        <User2 size={18} className="text-green-600" />
                                    </div>

                                    <p className="text-3xl font-bold leading-none text-green-600">
                                        {infosGerais?.usuarios?.ativos ?? 0}
                                    </p>
                                </div>

                                {/* GERENTES */}
                                <div className="
                                    rounded-xl border bg-blue-500/10
                                    p-4
                                    flex flex-col gap-2
                                    transition hover:bg-blue-500/15
                                ">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-muted-foreground font-medium">
                                            Gerentes
                                        </p>

                                        <User2 size={18} className="text-blue-600" />
                                    </div>

                                    <p className="text-3xl font-bold leading-none text-blue-600">
                                        {infosGerais?.usuarios?.gerentes ?? 0}
                                    </p>
                                </div>

                                {/* TÉCNICOS */}
                                <div className="
                                    rounded-xl border bg-orange-500/10
                                    p-4
                                    flex flex-col gap-2
                                    transition hover:bg-orange-500/15
                                ">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-muted-foreground font-medium">
                                            Técnicos
                                        </p>

                                        <User2 size={18} className="text-orange-600" />
                                    </div>

                                    <p className="text-3xl font-bold leading-none text-orange-600">
                                        {infosGerais?.usuarios?.tecnicos ?? 0}
                                    </p>
                                </div>

                            </div>

                            {/* GERENTE */}
                            <div className="flex flex-col gap-3">
                                <p className="font-semibold text-muted-foreground">
                                    Gerente principal
                                </p>

                                <div className="
                                    border rounded-2xl p-4
                                    bg-muted/20
                                    flex flex-col sm:flex-row
                                    gap-5
                                    transition hover:border-primary/30 hover:shadow-sm
                                ">
                                    {/* FOTO */}
                                    <div className="
                                        relative w-28 h-28
                                        shrink-0
                                        rounded-2xl
                                        overflow-hidden
                                        border
                                        bg-muted
                                        flex items-center justify-center
                                        mx-auto sm:mx-0
                                    ">
                                        {infosGerais?.gerente?.foto_perfil ? (
                                            <img
                                                src={`http://localhost:3000/uploads/imagens/usuarios/${infosGerais.gerente.id}/${infosGerais.gerente.foto_perfil}`}
                                                alt={`${infosGerais?.gerente?.nome} perfil`}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <User2 size={50} className="text-muted-foreground" />
                                        )}
                                    </div>

                                    {/* INFORMAÇÕES */}
                                    <div className="flex-1 flex flex-col gap-4">
                                        {/* NOME */}
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Nome do gerente
                                            </p>

                                            <h3 className="text-xl font-bold break-words">
                                                {infosGerais?.gerente?.nome ?? '- - - - -'}
                                            </h3>
                                        </div>

                                        {/* DADOS */}
                                        <div className="
                                            grid grid-cols-1 md:grid-cols-2
                                            gap-3
                                        ">
                                            {/* EMAIL */}
                                            <div className="
                                                rounded-xl border
                                                bg-background
                                                p-3
                                            ">
                                                <p className="text-sm text-muted-foreground">
                                                    E-mail
                                                </p>

                                                <p className="font-semibold break-all">
                                                    {infosGerais?.gerente?.email ?? '- - - - -'}
                                                </p>
                                            </div>

                                            {/* TELEFONE */}
                                            <div className="
                                                rounded-xl border
                                                bg-background
                                                p-3
                                            ">
                                                <p className="text-sm text-muted-foreground">
                                                    Telefone
                                                </p>

                                                <p className="font-semibold">
                                                    {infosGerais?.gerente?.telefone ?? '(--) ----------'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* SETORES E MÁQUINAS */}
                        <Card className="border p-4 gap-4">
                            {/* SETORES */}
                            <div className="flex flex-col gap-4">
                                {/* TITULO */}
                                <div className="w-full sm:flex justify-between items-end sm:border-b sm:pb-1">
                                    <p className="font-genty text-xl border-b sm:border-0 pb-1 mb-2 sm:mb-0">Setores da empresa</p>

                                    <Button variant="outline" className="w-full sm:w-50" asChild>
                                        <Link href={`/admin/empresas/${empresa.id}/setores`}>
                                            Ver Setores <ArrowRightCircle className="inline" />
                                        </Link>
                                    </Button>
                                </div>

                                {/* INFOS */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">

                                    {/* TOTAL */}
                                    <div className="
                                        rounded-xl border bg-muted/20
                                        p-4
                                        flex flex-col gap-2
                                        transition hover:bg-muted/40
                                    ">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm text-muted-foreground font-medium">
                                                Total de setores
                                            </p>

                                            <Warehouse size={18} className="text-muted-foreground" />
                                        </div>

                                        <p className="text-3xl font-bold leading-none">
                                            {infosGerais?.setores?.total ?? 0}
                                        </p>
                                    </div>

                                    {/* ATIVOS */}
                                    <div className="
                                        rounded-xl border bg-green-500/10
                                        p-4
                                        flex flex-col gap-2
                                        transition hover:bg-green-500/15
                                    ">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm text-muted-foreground font-medium">
                                                Setores ativos
                                            </p>

                                            <Warehouse size={18} className="text-green-600" />
                                        </div>

                                        <p className="text-3xl font-bold leading-none text-green-600">
                                            {infosGerais?.setores?.ativos ?? 0}
                                        </p>
                                    </div>

                                    {/* INATIVOS */}
                                    <div className="
                                        rounded-xl border bg-orange-500/10
                                        p-4
                                        flex flex-col gap-2
                                        transition hover:bg-orange-500/15
                                    ">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm text-muted-foreground font-medium">
                                                Setores inativos
                                            </p>

                                            <Warehouse size={18} className="text-orange-600" />
                                        </div>

                                        <p className="text-3xl font-bold leading-none text-orange-600">
                                            {infosGerais?.setores?.inativos ?? 0}
                                        </p>
                                    </div>

                                </div>
                            </div>

                            {/* MAQUINAS */}
                            <div className="flex flex-col gap-4">
                                {/* TITULO */}
                                <div className="w-full sm:flex justify-between items-end sm:border-b sm:pb-1">
                                    <p className="font-genty text-xl border-b sm:border-0 pb-1 mb-2 sm:mb-0">Máquinas da empresa</p>

                                    <Button variant="outline" className="w-full sm:w-50" asChild>
                                        <Link href={`http://localhost:3001/admin/empresas/${empresa.id}/maquinas`}>
                                            Ver Máquinas <ArrowRightCircle className="inline" />
                                        </Link>
                                    </Button>
                                </div>

                                {/* INFOS */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">

                                    {/* TOTAL */}
                                    <div className="
                                        rounded-xl border bg-muted/20
                                        p-4
                                        flex flex-col gap-2
                                        transition hover:bg-muted/40
                                    ">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm text-muted-foreground font-medium">
                                                Total de Máquinas
                                            </p>

                                            <Cpu size={18} className="text-muted-foreground" />
                                        </div>

                                        <p className="text-3xl font-bold leading-none">
                                            {infosGerais?.maquinas?.total ?? 0}
                                        </p>
                                    </div>

                                    {/* ATIVAS */}
                                    <div className="
                                        rounded-xl border bg-green-500/10
                                        p-4
                                        flex flex-col gap-2
                                        transition hover:bg-green-500/15
                                    ">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm text-muted-foreground font-medium">
                                                Máquinas ativas
                                            </p>

                                            <Cpu size={18} className="text-green-600" />
                                        </div>

                                        <p className="text-3xl font-bold leading-none text-green-600">
                                            {infosGerais?.maquinas?.ativas ?? 0}
                                        </p>
                                    </div>

                                    {/* INATIVAS */}
                                    <div className="
                                        rounded-xl border bg-orange-500/10
                                        p-4
                                        flex flex-col gap-2
                                        transition hover:bg-orange-500/15
                                    ">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm text-muted-foreground font-medium">
                                                Máquinas inativas
                                            </p>

                                            <Cpu size={18} className="text-orange-600" />
                                        </div>

                                        <p className="text-3xl font-bold leading-none text-orange-600">
                                            {infosGerais?.maquinas?.inativas ?? 0}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* CHAMADOS */}
                    <Card className="border p-4 gap-4">
                        {/* TITULO */}
                        <div className="w-full sm:flex justify-between items-end sm:border-b sm:pb-1">
                            <p className="font-genty text-xl border-b sm:border-0 pb-1 mb-2 sm:mb-0">Chamados da empresa</p>

                            <Button variant="outline" className="w-full sm:w-50">
                                <Link href={`/admin/empresas/${empresa.id}/chamados`}>
                                    Ver Chamados <ArrowRightCircle className="inline" />
                                </Link>
                            </Button>
                        </div>

                        {/* INFOS */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">

                            {/* TOTAL */}
                            <div className="
                                    rounded-xl border bg-muted/20
                                    p-4
                                    flex flex-col gap-2
                                    transition hover:bg-muted/40
                                ">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-muted-foreground font-medium">
                                        Total de Chamados
                                    </p>

                                    <Siren size={18} className="text-muted-foreground" />
                                </div>

                                <p className="text-3xl font-bold leading-none">
                                    {infosGerais?.chamados?.total ?? 0}
                                </p>
                            </div>

                            {/* AGUARDANDO */}
                            <div className="
                                    rounded-xl border bg-blue-500/10
                                    p-4
                                    flex flex-col gap-2
                                    transition hover:bg-blue-500/15
                                ">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-muted-foreground font-medium">
                                        Aguardando
                                    </p>

                                    <Siren size={18} className="text-blue-600" />
                                </div>

                                <p className="text-3xl font-bold leading-none text-blue-600">
                                    {infosGerais?.chamados?.aguardando ?? 0}
                                </p>
                            </div>

                            {/* EM ANDAMENTO */}
                            <div className="
                                    rounded-xl border bg-yellow-500/10
                                    p-4
                                    flex flex-col gap-2
                                    transition hover:bg-yellow-500/15
                                ">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-muted-foreground font-medium">
                                        Em andamento
                                    </p>

                                    <Siren size={18} className="text-yellow-600" />
                                </div>

                                <p className="text-3xl font-bold leading-none text-yellow-600">
                                    {infosGerais?.chamados?.andamento ?? 0}
                                </p>
                            </div>

                            {/* CONCLUÍDOS */}
                            <div className="
                                    rounded-xl border bg-green-500/10
                                    p-4
                                    flex flex-col gap-2
                                    transition hover:bg-green-500/15
                                ">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-muted-foreground font-medium">
                                        Concluídos
                                    </p>

                                    <Siren size={18} className="text-green-600" />
                                </div>

                                <p className="text-3xl font-bold leading-none text-green-600">
                                    {infosGerais?.chamados?.concluidos ?? 0}
                                </p>
                            </div>

                        </div>

                        {/* ULTIMOS CHAMADOS */}
                        <div className="flex-1 flex flex-col">
                            <p className="font-semibold text-muted-foreground">Últimos chamados</p>
                            <div className="flex-1 border rounded-xl p-3 flex flex-col gap-3 overflow-y-auto bg-muted/20 max-h-[500px]">
                                {!infosGerais?.ultimosChamados?.length && (
                                    <div className="flex items-center justify-center h-40 text-muted-foreground">
                                        Nenhum chamado encontrado
                                    </div>
                                )}

                                {infosGerais?.ultimosChamados?.map((ch) => (
                                    <div
                                        key={ch.id}
                                        className="
                                            border rounded-xl p-4
                                            bg-background
                                            flex flex-col gap-4
                                            transition hover:border-primary/40 hover:shadow-sm
                                        "
                                    >
                                        {/* TOPO */}
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                            <div>
                                                <p className="text-lg font-bold">
                                                    {ch.cod_setor}-{ch.cod_maquina}-{ch.cod_chamado}
                                                </p>

                                                <p className="text-sm text-muted-foreground">
                                                    #{ch.id}
                                                </p>
                                            </div>

                                            {/* STATUS */}
                                            <Badge
                                                className={`
                                                    w-fit text-white
                                                    ${ch.estado === 'aberto'
                                                        ? 'bg-blue-600'
                                                        : ch.estado === 'andamento'
                                                            ? 'bg-yellow-500'
                                                            : 'bg-green-600'
                                                    }
                                                `}
                                            >
                                                {ch.estado === 'aberto' && 'Aguardando'}
                                                {ch.estado === 'andamento' && 'Em andamento'}
                                                {ch.estado === 'concluido' && 'Concluído'}
                                            </Badge>
                                        </div>

                                        {/* DATAS */}
                                        <div className="grid sm:grid-cols-3 gap-3 text-sm">
                                            <div className="rounded-lg border bg-muted/30 p-3">
                                                <p className="text-muted-foreground font-medium">
                                                    Abertura
                                                </p>

                                                <p className="font-semibold">
                                                    {format(
                                                        new Date(ch.datahora_abertura),
                                                        'dd/MM/yyyy HH:mm',
                                                        { locale: ptBR }
                                                    )}
                                                </p>
                                            </div>

                                            <div className="rounded-lg border bg-muted/30 p-3">
                                                <p className="text-muted-foreground font-medium">
                                                    Atendimento
                                                </p>

                                                <p className="font-semibold">
                                                    {ch.datahora_atendimento
                                                        ? format(
                                                            new Date(ch.datahora_atendimento),
                                                            'dd/MM/yyyy HH:mm',
                                                            { locale: ptBR }
                                                        )
                                                        : '--/--/---- --:--'}
                                                </p>
                                            </div>

                                            <div className="rounded-lg border bg-muted/30 p-3">
                                                <p className="text-muted-foreground font-medium">
                                                    Conclusão
                                                </p>

                                                <p className="font-semibold">
                                                    {ch.datahora_conclusao
                                                        ? format(
                                                            new Date(ch.datahora_conclusao),
                                                            'dd/MM/yyyy HH:mm',
                                                            { locale: ptBR }
                                                        )
                                                        : '--/--/---- --:--'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </>)
    }



    // HEADER
    const { setHeader } = useHeader();

    useEffect(() => {
        setHeader({
            icon: Factory,
            title: `[#${id_empresa}] ${empresa?.nome_fantasia} - Dados`
        });
    }, [setHeader, empresa]);

    // RETORNO
    return content;
}