"use client"

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useEmpresas } from "@/hooks/useEmpresas";
import { useSetores } from "@/hooks/useSetores";
import { useHeader } from "@/context/HeaderContext";
import LoadingPage from "../../../Holders/LoadingPage";
import ErrorPage from "../../../Holders/ErrorPage";
import { User2, icons, Calendar, Pencil, CheckCircle2, MinusCircle, Warehouse, Cpu, Siren } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GraficoLinha from "@/components/Graficos/GraficoLinha";
import GraficoRosca from "@/components/Graficos/GraficoRosca";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PageMembro() {
    const { id: id_empresa, cod_setor } = useParams();

    const [Icon, setIcon] = useState(icons['Warehouse']);

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    // HOOKS

    // EMPRESAS
    const {
        loading: loadingEmpresas, error: errorEmpresas, mensagem: mensagemEmpresas,
        empresa, obterEmpresa,
    } = useEmpresas();

    // SETORES
    const {
        loading: loadingSetores, error: errorSetores, mensagem: mensagemSetores,
        setor, obterSetor,
        infosSetor, obterInfosSetor,
    } = useSetores();

    // OBTER EMPRESA
    useEffect(() => {
        if (!empresa) {
            obterEmpresa(id_empresa)
        }
    }, [empresa, obterEmpresa])

    // OBTER SETOR
    useEffect(() => {
        if (!setor) {
            obterSetor(id_empresa, cod_setor)
            obterInfosSetor(id_empresa, cod_setor)
        }
    }, [setor, obterSetor]);

    useEffect(() => {
        if (setor) {
            setIcon(icons[setor.icone]);
        }
    }, [setor]);

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    // FUNÇÕES AUXILIARES

    // TRANSFORMAR MINUTOS EM HORAS OU DIAS
    function minutosParaHoras(minutos) {
        const d = Math.floor(minutos / (60 * 24));
        minutos = minutos % (60 * 24);

        const h = Math.floor(minutos / 60);
        minutos = minutos % (60);

        const min = minutos % 60;

        if (d > 0) { return `${d} dias` }
        if (h > 0) { return `${h}h ${min}min` }
        else { return `${min}min` }
    }

    // SÉRIE DO GRÁFICO DE ROSCA - Chamados por estado no mês
    const [mesSelecionado, setMesSelecionado] = useState("")

    const serieSelecionada = useMemo(() => {
        const data = infosSetor?.chamadosPorEstadoMes?.find(
            item => item.mes === mesSelecionado
        )

        if (!data) {
            return [
                { estado: "aberto", total: 0 },
                { estado: "andamento", total: 0 },
                { estado: "concluido", total: 0 }
            ]
        }

        return Object.entries(data)
            .filter(([key]) => key !== "mes")
            .map(([estado, total]) => ({
                estado,
                total: Number(total)
            }))
    }, [infosSetor?.chamadosPorEstadoMes, mesSelecionado])

    useEffect(() => {
        if (infosSetor?.chamadosPorEstadoMes?.length > 0) {
            setMesSelecionado(
                infosSetor.chamadosPorEstadoMes[infosSetor?.chamadosPorEstadoMes?.length - 1].mes
            )
        }
    }, [infosSetor?.chamadosPorEstadoMes])

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    // CONTEÚDO
    let content;

    // CARREGANDO SETOR
    if (loadingSetores.obterMembro && !membro) {
        content = <LoadingPage loadingTitle="Carregando setor..." loadingSubtitle={[]} />;
    }

    // ERRO AO CARREGAR SETOR
    else if (errorSetores.obterMembro) {
        content = (
            <ErrorPage
                errorTitle="Erro ao carregar setor"
                errorSubtitle={[
                    "Não foi possível carregar os dados do setor.",
                    "Tente novamente mais tarde."
                ]}
            />
        );
    }

    // SETOR CARREGADO
    else if (setor) {
        content = (
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
                                {setor.status
                                    ? (<p className="text-green-700 dark:text-green-500">Ativa</p>)
                                    : (<p className="text-red-700 dark:text-red-500">Inativa</p>)
                                }
                            </div>
                        </div>

                        <div className="rounded-xl border bg-muted/30 p-3 sm:w-50">
                            <p className="text-sm text-muted-foreground">
                                Setor registrado em
                            </p>

                            <p className="flex items-center gap-2 font-semibold break-words">
                                <Calendar size={14} />
                                <span>{format(new Date(setor.data_criacao), 'dd/MM/yyyy', { locale: ptBR })} </span>
                            </p>
                        </div>

                        {!setor.status && (
                            <div className="rounded-xl border bg-muted/30 p-3 sm:w-50">
                                <p className="text-sm text-muted-foreground">
                                    Setor desativada em
                                </p>

                                <p className="flex items-center gap-2 font-semibold break-words text-red-700 dark:text-red-500">
                                    <Calendar size={14} />
                                    <span>{format(new Date(setor.data_criacao), 'dd/MM/yyyy', { locale: ptBR })} </span>
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="
                        flex flex-wrap gap-3 items-center
                        rounded-xl
                    ">
                        <Button className="button-background border w-full sm:w-50" asChild>
                            <Link href={`/admin/empresas/${id_empresa}/setores/${cod_setor}/editar`}>
                                <Pencil /> Editar setor
                            </Link>
                        </Button>

                        {!setor.status
                            ? (<Button className="
                                    bg-green-700 hover:bg-green-600
                                    dark:bg-green-600 dark:hover:bg-green-700
                                    text-white
                                    w-full sm:w-50"
                            >
                                <CheckCircle2 /> Reativar setor
                            </Button>)
                            : (<Button className="
                                    bg-red-700 hover:bg-red-600 
                                    dark:bg-red-600 dark:hover:bg-red-700
                                    text-white
                                    w-full sm:w-50"
                            >
                                <MinusCircle /> Desativar setor
                            </Button>)
                        }
                    </div>
                </Card>

                {/* ICONE, NOME E CÓDIGO */}
                <Card
                    className="
                        w-full p-5 border-0
                        flex flex-col gap-4 overflow-hidden
                    "
                    style={{
                        backgroundColor: `#${setor.cor_fundo}`,
                        color: `#${setor.cor_texto}`,
                    }}
                >
                    <div className="flex gap-4">
                        {/* ICONE */}
                        <div
                            className="
                            flex items-center justify-center
                            w-16 h-16 rounded-xl
                            bg-black/10
                            shrink-0
                        "
                        >
                            <Icon size={36} />
                        </div>

                        {/* NOME E CÓDIGO */}
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-col font-genty">
                                <h1 className="text-3xl truncate">
                                    {setor?.nome}
                                </h1>

                                <span
                                    className="
                                    w-fit text-xs
                                    px-2 py-1 rounded-full
                                    bg-black/10
                                "
                                >
                                    # {setor?.cod_setor}
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* DESCRIÇÃO */}
                <Card
                    className="
                        w-full border p-5
                        flex flex-col gap-4 overflow-hidden
                    "
                >
                    <div className="w-full sm:flex justify-between items-end sm:border-b sm:pb-1">
                        <p className="font-genty text-xl border-b sm:border-0 pb-1 mb-2 sm:mb-0">
                            Descrição
                        </p>
                    </div>

                    {setor.descricao}
                </Card>

                {/* INFORMAÇÕES GERAIS */}
                <div className="
                    grid grid-cols-1
                    2xl:grid-cols-2
                    gap-4
                ">
                    {/* MAQUINAS */}
                    <Card className="border p-4 gap-4">
                        <div className="flex flex-col gap-4">
                            {/* TITULO */}
                            <div className="w-full sm:flex justify-between items-end sm:border-b sm:pb-1">
                                <p className="font-genty text-xl border-b sm:border-0 pb-1 mb-2 sm:mb-0">
                                    Máquinas do setor
                                </p>
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
                                    <div className="flex-1 flex items-center justify-between">
                                        <p className="text-sm text-muted-foreground font-medium">
                                            Total de Máquinas
                                        </p>

                                        <Cpu size={18} className="text-muted-foreground" />
                                    </div>

                                    <p className="text-3xl font-bold leading-none">
                                        {infosSetor?.maquinas.total ?? 0}
                                    </p>
                                </div>

                                {/* ATIVAS */}
                                <div className="
                                    rounded-xl border bg-green-500/10
                                    p-4
                                    flex flex-col gap-2
                                    transition hover:bg-green-500/15
                                ">
                                    <div className="flex-1 flex items-center justify-between">
                                        <p className="text-sm text-muted-foreground font-medium">
                                            Máquinas ativas
                                        </p>

                                        <Cpu size={18} className="text-green-600" />
                                    </div>

                                    <p className="text-3xl font-bold leading-none text-green-600">
                                        {infosSetor?.maquinas.ativas ?? 0}
                                    </p>
                                </div>

                                {/* INATIVAS */}
                                <div className="
                                        rounded-xl border bg-orange-500/10
                                        p-4
                                        flex flex-col gap-2
                                        transition hover:bg-orange-500/15
                                    ">
                                    <div className="flex-1 flex items-center justify-between">
                                        <p className="text-sm text-muted-foreground font-medium">
                                            Máquinas inativas
                                        </p>

                                        <Cpu size={18} className="text-orange-600" />
                                    </div>

                                    <p className="text-3xl font-bold leading-none text-orange-600">
                                        {infosSetor?.maquinas.inativas ?? 0}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* CHAMADOS */}
                    <Card className="border p-4 gap-4">
                        <div className="flex flex-col gap-4">
                            {/* TITULO */}
                            <div className="w-full sm:flex justify-between items-end sm:border-b sm:pb-1">
                                <p className="font-genty text-xl border-b sm:border-0 pb-1 mb-2 sm:mb-0">
                                    Chamados do setor
                                </p>
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
                                        {infosSetor?.chamados.total ?? 0}
                                    </p>
                                </div>

                                {/* AGUARDANDO */}
                                <div className="
                                    rounded-xl border bg-blue-500/10
                                    p-4
                                    flex flex-col gap-2
                                    transition hover:bg-blue-500/15
                                ">
                                    <div className="flex-1 flex items-center justify-between">
                                        <p className="text-sm text-muted-foreground font-medium">
                                            Aguardando
                                        </p>

                                        <Siren size={18} className="text-blue-600" />
                                    </div>

                                    <p className="text-3xl font-bold leading-none text-blue-600">
                                        {infosSetor?.chamados.aguardando ?? 0}
                                    </p>
                                </div>

                                {/* EM ANDAMENTO */}
                                <div className="
                                    rounded-xl border bg-yellow-500/10
                                    p-4
                                    flex flex-col gap-2
                                    transition hover:bg-yellow-500/15
                                ">
                                    <div className="flex-1 flex items-center justify-between">
                                        <p className="text-sm text-muted-foreground font-medium">
                                            Em andamento
                                        </p>

                                        <Siren size={18} className="text-yellow-600" />
                                    </div>

                                    <p className="text-3xl font-bold leading-none text-yellow-600">
                                        {infosSetor?.chamados.andamento ?? 0}
                                    </p>
                                </div>

                                {/* CONCLUÍDOS */}
                                <div className="
                                    rounded-xl border bg-green-500/10
                                    p-4
                                    flex flex-col gap-2
                                    transition hover:bg-green-500/15
                                ">
                                    <div className="flex-1 flex items-center justify-between">
                                        <p className="text-sm text-muted-foreground font-medium">
                                            Concluídos
                                        </p>

                                        <Siren size={18} className="text-green-600" />
                                    </div>

                                    <p className="text-3xl font-bold leading-none text-green-600">
                                        {infosSetor?.chamados.concluidos ?? 0}
                                    </p>
                                </div>

                            </div>

                            {/* TITULO TEMPO */}
                            <div className="w-full sm:flex justify-between items-end sm:border-b sm:pb-1">
                                <p className="font-genty text-xl border-b sm:border-0 pb-1 mb-2 sm:mb-0">
                                    Tempo médio
                                </p>
                            </div>

                            {/* TEMPOS MÉDIOS */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">

                                {/* ESPERA */}
                                <div className="
                                    rounded-xl border bg-slate-500/10
                                    p-4
                                    flex flex-col gap-2
                                    transition hover:bg-slate-500/15
                                ">
                                    <div className="flex-1 flex items-center justify-between">
                                        <p className="text-sm text-muted-foreground font-medium">
                                            Espera
                                        </p>

                                        <Siren size={18} className="text-slate-600" />
                                    </div>

                                    <p className="text-2xl font-bold leading-none text-slate-600">
                                        {minutosParaHoras(infosSetor?.tempo_medio?.espera) ?? 0}
                                    </p>
                                </div>

                                {/* AGUARDANDO */}
                                <div className="
                                    rounded-xl border bg-slate-500/10
                                    p-4
                                    flex flex-col gap-2
                                    transition hover:bg-slate-500/15
                                ">
                                    <div className="flex-1 flex items-center justify-between">
                                        <p className="text-sm text-muted-foreground font-medium">
                                            Atendimento
                                        </p>

                                        <Siren size={18} className="text-slate-600" />
                                    </div>

                                    <p className="text-2xl font-bold leading-none text-slate-600">
                                        {minutosParaHoras(infosSetor?.tempo_medio?.atendimento) ?? 0}
                                    </p>
                                </div>

                                {/* PARADO */}
                                <div className="
                                    rounded-xl border bg-slate-500/10
                                    p-4
                                    flex flex-col gap-2
                                    transition hover:bg-slate-500/15
                                ">
                                    <div className="flex-1 flex items-center justify-between">
                                        <p className="text-sm text-muted-foreground font-medium">
                                            Paralisação
                                        </p>

                                        <Siren size={18} className="text-slate-600" />
                                    </div>

                                    <p className="text-2xl font-bold leading-none text-slate-600">
                                        {minutosParaHoras(infosSetor?.tempo_medio?.maquina_parada) ?? 0}
                                    </p>
                                </div>

                            </div>
                        </div>
                    </Card>
                </div>

                {/* GRÁFICOS */}
                <Card
                    className="
                        w-full border p-5
                        flex flex-col gap-4 overflow-hidden
                    "
                >
                    <div className="w-full sm:flex justify-between items-end sm:border-b sm:pb-1">
                        <p className="font-genty text-xl border-b sm:border-0 pb-1 mb-2 sm:mb-0">
                            Gráficos
                        </p>
                    </div>

                    <div className="grid xl:grid-cols-2 gap-3">

                        {/* LINHA - CHAMADOS POR MÊS */}
                        <Card className="flex flex-col gap-2 border rounded p-4">
                            <CardTitle>Volume de Chamados por Mês</CardTitle>
                            <CardDescription>
                                Quantidade de chamados criados, atendidos e concluídos ao longo dos últimos meses
                            </CardDescription>

                            <GraficoLinha
                                selects={true}
                                data={infosSetor?.ultimosMeses}
                                xDataKey="mes"
                                linhas={[
                                    {
                                        dataKey: "abertos",
                                        name: "Abertos",
                                        color: "#155dfc",
                                    },
                                    {
                                        dataKey: "atendidos",
                                        name: "Atendidos",
                                        color: "#d08700",
                                    },
                                    {
                                        dataKey: "concluidos",
                                        name: "Concluidos",
                                        color: "#00a63e",
                                    },
                                ]}
                            />
                        </Card>

                        {/* ROSCA - CHAMADOS POR ESTADO NO MÊS */}
                        <Card className="flex flex-col gap-2 border rounded p-4">
                            <CardTitle>Chamados por estado no mês</CardTitle>
                            <CardDescription>
                                Estados dos chamados abertos no mês selecionado
                            </CardDescription>

                            <Select
                                value={mesSelecionado}
                                onValueChange={(mes) => setMesSelecionado(mes)}
                            >
                                <SelectTrigger className="w-full h-full">
                                    <SelectValue placeholder="Selecione um mês" />
                                </SelectTrigger>

                                <SelectContent className="" position="popper">
                                    {infosSetor?.chamadosPorEstadoMes.map((data, i) => {
                                        return (
                                            <SelectItem
                                                key={data.mes}
                                                value={data.mes}
                                            >
                                                {data.mes}
                                            </SelectItem>
                                        )
                                    })}
                                </SelectContent>
                            </Select>

                            <GraficoRosca
                                selects={true}
                                data={serieSelecionada}
                                series={[
                                    { dataKey: "aberto", name: "Abertos", color: "#155dfc" },
                                    { dataKey: "andamento", name: "Atendidos", color: "#d08700" },
                                    { dataKey: "concluido", name: "Concluídos", color: "#00a63e" },
                                ]}
                            />
                        </Card>

                    </div>
                </Card>

                {/* DEBUG (opcional) */}
                {/* <pre>{JSON.stringify(setor, null, 2)}</pre> */}
                <pre>{JSON.stringify(infosSetor, null, 2)}</pre>

            </div>
        )
    }

    // HEADER
    const { setHeader } = useHeader();

    useEffect(() => {
        setHeader({
            icon: User2,
            title: `[${id_empresa}] ${empresa?.nome_fantasia} - [${cod_setor}] ${setor?.nome}`,
        });
    }, [setHeader, empresa, setor]);

    return content;
}

/*
✅ 1. 📊 Chamados por Estado (Atual)
🎯 O que mostra
Distribuição atual:

aberto
andamento
concluído

📈 Tipo
👉 Pizza ou barra horizontal
✅ SQL
SQLSELECT estado, COUNT(*) as totalFROM chamadosWHERE id_empresa = ?AND id_setor = ?GROUP BY estado;Mostrar mais linhas

💡 Valor
👉 responde:

“como está o sistema agora?”


✅ 2. 📉 Backlog ao longo do tempo (🔥 MUITO IMPORTANTE)
🎯 Ideia
Mostrar:
backlog = criados - concluídos (acumulado)

📈 Tipo
👉 linha

💡 Valor
👉 responde:

“estamos acumulando chamados ou resolvendo?”

👉 Esse é um dos KPIs mais importantes

✅ 6. ⚠️ Chamados por máquina
🎯 SQL
SQLSELECT m.nome, COUNT(*) as totalFROM chamados cJOIN maquinas m ON m.id = c.id_maquinaGROUP BY m.nomeORDER BY total DESC;Mostrar mais linhas

📈 Tipo
👉 barras

💡 Valor

“qual máquina dá mais problema?”

🔥 Esse é MUITO importante


✅ 7. 🧠 Chamados por causa
🎯 SQL
SQLSELECT ca.descricao, COUNT(*) as totalFROM chamados cJOIN causas ca ON ca.id = c.id_causaGROUP BY ca.descricao;Mostrar mais linhas

💡 Valor

“quais são os principais problemas?”

✅ 8. 📅 Distribuição por dia da semana
🎯 SQL
SQLSELECT DAYNAME(datahora_abertura) as dia, COUNT(*) as totalFROM chamadosGROUP BY dia;``Mostrar mais linhas

💡 Valor

“tem dias com mais problemas?”


✅ 9. ⏳ Tempo parado (sem atendimento)
👉 chamados abertos sem atendimento
SQLSELECT COUNT(*) FROM chamadosWHERE estado = 'aberto'AND datahora_atendimento IS NULL;Mostrar mais linhas

💡 Valor

“quantos chamados estão esquecidos?”
 */