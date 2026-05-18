import { useEffect, useState } from "react"
import {
    Activity,
    AlertTriangle,
    BarChart3,
    BellRing,
    BrainCircuit,
    Building2,
    CheckCircle2,
    Clock3,
    Cpu,
    Factory,
    Gauge,
    Layers3,
    ShieldCheck,
    Sparkles,
    TrendingUp,
    Wrench,
    Zap,
    Sun,
    Moon,
} from "lucide-react"

import LinhaUm from "./LinhaUm"
import CardsEstados from "./CardsEstados"
import RoscaEstados from "./RoscaEstados"
import LinhaEstados from "./LinhaEstados"

export default function DashboardContent({ dashboard }) {

    const empresasAtivas = dashboard?.empresasAtivas ?? 7
    const setoresAtivos = dashboard?.setoresAtivos ?? 4
    const maquinasAtivas = dashboard?.maquinasAtivas ?? 3
    const chamadosAbertos = dashboard?.chamadosAbertos ?? 2
    const chamadosAndamento = dashboard?.chamadosAndamento ?? 4
    const chamadosConcluidos = dashboard?.chamadosConcluidos ?? 2

    // Tema: 'light' | 'dark'
    const [theme, setTheme] = useState(() => {
        try {
            return localStorage.getItem("theme") || "dark"
        } catch {
            return "dark"
        }
    })

    useEffect(() => {
        try {
            localStorage.setItem("theme", theme)
        } catch {}
        if (typeof document !== "undefined") {
            if (theme === "dark") {
                document.documentElement.classList.add("dark")
            } else {
                document.documentElement.classList.remove("dark")
            }
        }
    }, [theme])

    const toggleTheme = () => setTheme(prev => (prev === "dark" ? "light" : "dark"))

    return (
        <div className="relative min-h-screen overflow-hidden bg-white text-slate-900 dark:bg-sidebar dark:text-white transition-colors duration-300">

            {/* ===================================================== */}
            {/* BACKGROUND */}
            {/* ===================================================== */}

            <div className="absolute inset-0 -z-50">

                {/* GRADIENT */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.06),transparent_30%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.05),transparent_30%),radial-gradient(circle_at_bottom,rgba(59,130,246,0.04),transparent_35%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.12),transparent_30%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.10),transparent_30%),radial-gradient(circle_at_bottom,rgba(59,130,246,0.08),transparent_35%)]" />

                {/* GRID */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-size-[80px_80px] dark:bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)]" />

                {/* NOISE */}
                <div className="absolute inset-0 opacity-[0.02] mix-blend-soft-light [background-image:url('https://grainy-gradients.vercel.app/noise.svg')] dark:opacity-[0.03]" />

                {/* GLOWS */}
                <div className="absolute left-[-200px] top-[-200px] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[160px] dark:bg-cyan-500/20" />
                <div className="absolute right-[-200px] top-[100px] h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-[160px] dark:bg-violet-500/20" />
                <div className="absolute bottom-[-250px] left-[30%] h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[160px] dark:bg-blue-500/20" />
            </div>

            {/* ===================================================== */}
            {/* CONTENT */}
            {/* ===================================================== */}

            <div className="mx-auto max-w-[1700px] space-y-8 p-4 md:p-6 lg:p-8">

                {/* ===================================================== */}
                {/* HEADER */}
                {/* ===================================================== */}

                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                    <div className="space-y-4">

                        <div>

                            <h1 className="text-5xl font-black tracking-[-0.04em] text-slate-900 dark:text-white">
                                Central Operacional
                            </h1>

                            <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                                Monitoramento em tempo real de máquinas,
                                chamados técnicos, setores industriais e
                                indicadores operacionais das empresas
                                cadastradas na plataforma TECHBRIDGE.
                            </p>
                        </div>
                    </div>

                    {/* STATUS + THEME TOGGLE */}
                    <div className="flex flex-wrap items-center gap-4">

                        {/* THEME TOGGLE */}
                        <button
                            onClick={toggleTheme}
                            aria-label="Alternar tema"
                            className="flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition-colors duration-200 border-slate-200 bg-white text-slate-900 hover:bg-slate-50 dark:border-white/10 dark:bg-[#0b1220] dark:text-white"
                        >
                            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                            <span className="hidden sm:inline">
                                {theme === "dark" ? "Modo Escuro" : "Modo Claro"}
                            </span>
                        </button>

                        {/* SISTEMA */}
                        <div className="group relative overflow-hidden rounded-3xl border border-emerald-200 bg-emerald-50 p-5 backdrop-blur-2xl transition-all duration-500 hover:border-emerald-300 dark:border-emerald-500/20 dark:bg-emerald-500/5">

                            <div className="absolute inset-0 bg-linear-to-br from-emerald-100 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                            <div className="relative flex items-center gap-4">

                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 dark:border-emerald-500/20 dark:bg-emerald-500/10">
                                    <ShieldCheck className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
                                </div>

                                <div>

                                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                        Sistema
                                    </p>

                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                        Operacional
                                    </h3>

                                    <div className="mt-1 flex items-center gap-2">

                                        <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />

                                        <span className="text-xs text-emerald-600 dark:text-emerald-300">
                                            Máquinas monitoradas em tempo real
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* IA */}
                        <div className="group relative overflow-hidden rounded-3xl border border-cyan-200 bg-cyan-50 p-5 backdrop-blur-2xl transition-all duration-500 hover:border-cyan-300 dark:border-cyan-500/20 dark:bg-cyan-500/5">

                            <div className="absolute inset-0 bg-linear-to-br from-cyan-100 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                            <div className="relative flex items-center gap-4">

                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-200 bg-cyan-50 dark:border-cyan-500/20 dark:bg-cyan-500/10">
                                    <BrainCircuit className="h-7 w-7 text-cyan-600 dark:text-cyan-400" />
                                </div>

                                <div>

                                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                        Monitoramento Inteligente
                                    </p>

                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                        Ativo
                                    </h3>

                                    <div className="mt-1 flex items-center gap-2">

                                        <Zap className="h-3 w-3 text-cyan-600 dark:text-cyan-400" />

                                        <span className="text-xs text-cyan-600 dark:text-cyan-300">
                                            Análise automática de chamados
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ===================================================== */}
                {/* HERO */}
                {/* ===================================================== */}

                <section className="relative overflow-hidden rounded-[40px] border border-slate-200 bg-slate-50 backdrop-blur-3xl dark:border-white/10 dark:bg-white/5">

                    <div className="absolute inset-0 bg-linear-to-r from-cyan-50 to-violet-50 dark:bg-linear-to-r dark:from-cyan-500/10 dark:to-violet-500/10" />

                    <div className="relative p-6 lg:p-8">

                        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                            <div>

                                <div className="flex items-center gap-3">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-200 bg-cyan-50 dark:border-cyan-500/20 dark:bg-cyan-500/10">

                                        <Gauge className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                                    </div>

                                    <div>

                                        <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                                            Resumo Operacional
                                        </h2>

                                        <p className="text-zinc-600 dark:text-zinc-400">
                                            Indicadores gerais do ambiente industrial
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* MINI CARDS */}
                            <div className="flex flex-wrap gap-3">

                                <div className="rounded-2xl border border-slate-200 bg-white px-5 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-black/20">

                                    <div className="flex items-center gap-3">

                                        <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />

                                        <div>

                                            <p className="text-xs text-zinc-600 dark:text-zinc-400">
                                                Disponibilidade
                                            </p>

                                            <div className="flex items-center gap-2">

                                                <span className="text-lg font-bold text-slate-900 dark:text-white">
                                                    99.2%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-slate-200 bg-white px-5 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-black/20">

                                    <div className="flex items-center gap-3">

                                        <BellRing className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />

                                        <div>

                                            <p className="text-xs text-zinc-600 dark:text-zinc-400">
                                                Chamados Abertos
                                            </p>

                                            <div className="flex items-center gap-2">

                                                <span className="text-lg font-bold text-slate-900 dark:text-white">
                                                    {chamadosAbertos}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-slate-200 bg-white px-5 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-black/20">

                                    <div className="flex items-center gap-3">

                                        <Clock3 className="h-5 w-5 text-violet-600 dark:text-violet-400" />

                                        <div>

                                            <p className="text-xs text-zinc-600 dark:text-zinc-400">
                                                Tempo Médio
                                            </p>

                                            <div className="flex items-center gap-2">

                                                <span className="text-lg font-bold text-slate-900 dark:text-white">
                                                    12 min
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* KPI GRID */}
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

                            {/* EMPRESAS */}
                            <div className="rounded-[28px] border border-slate-200 bg-white p-6 backdrop-blur-2xl dark:border-white/10 dark:bg-black/20">

                                <div className="flex items-center justify-between">

                                    <div>

                                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                            Empresas Ativas
                                        </p>

                                        <h3 className="mt-3 text-4xl font-black text-slate-900 dark:text-white">
                                            {empresasAtivas}
                                        </h3>
                                    </div>

                                    <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-cyan-200 bg-cyan-50 dark:border-cyan-500/20 dark:bg-cyan-500/10">

                                        <Building2 className="h-8 w-8 text-cyan-600 dark:text-cyan-300" />
                                    </div>
                                </div>
                            </div>

                            {/* SETORES */}
                            <div className="rounded-[28px] border border-slate-200 bg-white p-6 backdrop-blur-2xl dark:border-white/10 dark:bg-black/20">

                                <div className="flex items-center justify-between">

                                    <div>

                                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                            Setores Monitorados
                                        </p>

                                        <h3 className="mt-3 text-4xl font-black text-slate-900 dark:text-white">
                                            {setoresAtivos}
                                        </h3>
                                    </div>

                                    <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-violet-200 bg-violet-50 dark:border-violet-500/20 dark:bg-violet-500/10">

                                        <Factory className="h-8 w-8 text-violet-600 dark:text-violet-300" />
                                    </div>
                                </div>
                            </div>

                            {/* MAQUINAS */}
                            <div className="rounded-[28px] border border-slate-200 bg-white p-6 backdrop-blur-2xl dark:border-white/10 dark:bg-black/20">

                                <div className="flex items-center justify-between">

                                    <div>

                                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                            Máquinas Ativas
                                        </p>

                                        <h3 className="mt-3 text-4xl font-black text-slate-900 dark:text-white">
                                            {maquinasAtivas}
                                        </h3>
                                    </div>

                                    <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-emerald-200 bg-emerald-50 dark:border-emerald-500/20 dark:bg-emerald-500/10">

                                        <Cpu className="h-8 w-8 text-emerald-600 dark:text-emerald-300" />
                                    </div>
                                </div>
                            </div>

                            {/* ABERTOS */}
                            <div className="rounded-[28px] border border-slate-200 bg-white p-6 backdrop-blur-2xl dark:border-white/10 dark:bg-black/20">

                                <div className="flex items-center justify-between">

                                    <div>

                                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                            Chamados Abertos
                                        </p>

                                        <h3 className="mt-3 text-4xl font-black text-amber-600 dark:text-amber-300">
                                            {chamadosAbertos}
                                        </h3>
                                    </div>

                                    <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-amber-200 bg-amber-50 dark:border-amber-500/20 dark:bg-amber-500/10">

                                        <AlertTriangle className="h-8 w-8 text-amber-600 dark:text-amber-300" />
                                    </div>
                                </div>
                            </div>

                            {/* ANDAMENTO */}
                            <div className="rounded-[28px] border border-slate-200 bg-white p-6 backdrop-blur-2xl dark:border-white/10 dark:bg-black/20">

                                <div className="flex items-center justify-between">

                                    <div>

                                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                            Em Atendimento
                                        </p>

                                        <h3 className="mt-3 text-4xl font-black text-cyan-600 dark:text-cyan-300">
                                            {chamadosAndamento}
                                        </h3>
                                    </div>

                                    <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-cyan-200 bg-cyan-50 dark:border-cyan-500/20 dark:bg-cyan-500/10">

                                        <Wrench className="h-8 w-8 text-cyan-600 dark:text-cyan-300" />
                                    </div>
                                </div>
                            </div>

                            {/* CONCLUIDOS */}
                            <div className="rounded-[28px] border border-slate-200 bg-white p-6 backdrop-blur-2xl dark:border-white/10 dark:bg-black/20">

                                <div className="flex items-center justify-between">

                                    <div>

                                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                            Concluídos
                                        </p>

                                        <h3 className="mt-3 text-4xl font-black text-emerald-600 dark:text-emerald-300">
                                            {chamadosConcluidos}
                                        </h3>
                                    </div>

                                    <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-emerald-200 bg-emerald-50 dark:border-emerald-500/20 dark:bg-emerald-500/10">

                                        <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-300" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===================================================== */}
                {/* GRID */}
                {/* ===================================================== */}

                <section className="grid grid-cols-1 gap-6 2xl:grid-cols-12">

                    {/* LEFT */}
                    <div className="space-y-6 2xl:col-span-8">

                        {/* CHAMADOS POR SETOR */}
                        <div className="group relative overflow-hidden rounded-[40px] border border-slate-200 bg-slate-50 backdrop-blur-3xl transition-all duration-700 hover:border-cyan-200 dark:border-white/10 dark:bg-white/5 dark:hover:border-cyan-500/20">

                            <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">

                                <div className="absolute inset-0 bg-linear-to-r from-cyan-50 to-violet-50 dark:from-cyan-500/12 dark:to-violet-500/12" />
                            </div>

                            <div className="relative p-6 lg:p-8">

                                <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                                    <div>

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-200 bg-cyan-50 dark:border-cyan-500/20 dark:bg-cyan-500/10">

                                                <Layers3 className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                                            </div>

                                            <div>

                                                <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                                                    Chamados por Setor
                                                </h2>

                                                <p className="text-zinc-600 dark:text-zinc-400">
                                                    Distribuição operacional dos chamados
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="inline-flex items-center gap-2 rounded-2xl border border-cyan-200 bg-cyan-50 px-5 py-3 text-sm text-cyan-600 backdrop-blur-xl dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-300">

                                        <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-500" />

                                        Atualização em tempo real
                                    </div>
                                </div>

                                <div className="rounded-[28px] border border-slate-200 bg-white p-5 backdrop-blur-2xl dark:border-white/10 dark:bg-black/20">

                                    <CardsEstados
                                        totalChamados={dashboard?.totalChamados}
                                        chamadosPorEstados={dashboard?.porEstado}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* HISTORICO */}
                        <div className="group relative overflow-hidden rounded-[40px] border border-slate-200 bg-slate-50 backdrop-blur-3xl transition-all duration-700 hover:border-violet-200 dark:border-white/10 dark:bg-white/5 dark:hover:border-violet-500/20">

                            <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">

                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.06),transparent_40%)] dark:bg-[radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_40%)]" />
                            </div>

                            <div className="relative p-6 lg:p-8">

                                <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                                    <div>

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-200 bg-violet-50 dark:border-violet-500/20 dark:bg-violet-500/10">

                                                <BarChart3 className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                                            </div>

                                            <div>

                                                <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                                                    Histórico de Chamados
                                                </h2>

                                                <p className="text-zinc-600 dark:text-zinc-400">
                                                    Volume operacional dos últimos dias
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-[28px] border border-slate-200 bg-white p-5 backdrop-blur-2xl dark:border-white/10 dark:bg-black/20">

                                    <LinhaEstados
                                        chamadosPorDia={
                                            dashboard?.chamadosPorDia
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="space-y-6 2xl:col-span-4">

                        {/* DONUT */}
                        <div className="group relative overflow-hidden rounded-[40px] border border-slate-200 bg-slate-50 backdrop-blur-3xl transition-all duration-700 hover:border-fuchsia-200 dark:border-white/10 dark:bg-white/5 dark:hover:border-fuchsia-500/20">

                            <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">

                                <div className="absolute inset-0 bg-linear-to-r from-fuchsia-50 to-violet-50 dark:from-fuchsia-500/12 dark:to-violet-500/12" />
                            </div>

                            <div className="relative p-6 lg:p-8 h-full w-full">
                                <div className="mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-fuchsia-200 bg-fuchsia-50 dark:border-fuchsia-500/20 dark:bg-fuchsia-500/10">
                                            <Activity className="h-6 w-6 text-fuchsia-600 dark:text-fuchsia-400" />
                                        </div>

                                        <div>
                                            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                                                Status dos Chamados
                                            </h2>

                                            <p className="text-zinc-600 dark:text-zinc-400">
                                                Distribuição operacional
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-[28px] border border-slate-200 bg-white p-4 backdrop-blur-2xl h-full w-full dark:border-white/10 dark:bg-black/20">
                                    <RoscaEstados
                                        className="h-full w-full"
                                        chamadosPorEstados={dashboard?.porEstado ?? []}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* IA */}
                        <div className="relative overflow-hidden rounded-[40px] border border-cyan-200 bg-linear-to-br from-cyan-50 via-blue-50 to-violet-50 p-8 backdrop-blur-3xl dark:border-cyan-500/20 dark:bg-linear-to-br dark:from-cyan-500/10 dark:via-blue-500/5 dark:to-violet-500/10">

                            <div className="absolute right-[-40px] top-[-40px] h-40 w-40 rounded-full bg-cyan-100 blur-[80px] dark:bg-cyan-400/20" />

                            <div className="relative">

                                <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-cyan-200 bg-cyan-50 dark:border-cyan-500/20 dark:bg-cyan-500/10">

                                    <BrainCircuit className="h-8 w-8 text-cyan-600 dark:text-cyan-300" />
                                </div>

                                <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                                    Inteligência Operacional
                                </h2>

                                <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-400">
                                    O sistema acompanha automaticamente
                                    o fluxo operacional das máquinas,
                                    setores e chamados em tempo real.
                                </p>

                                <div className="mt-8 grid grid-cols-2 gap-4">

                                    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-black/20">

                                        <p className="text-xs text-zinc-600 dark:text-zinc-400">
                                            Tempo Médio
                                        </p>

                                        <h3 className="mt-2 text-2xl font-black text-cyan-600 dark:text-cyan-300">
                                            12 min
                                        </h3>
                                    </div>

                                    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-black/20">

                                        <p className="text-xs text-zinc-600 dark:text-zinc-400">
                                            Disponibilidade
                                        </p>

                                        <h3 className="mt-2 text-2xl font-black text-violet-600 dark:text-violet-300">
                                            99.2%
                                        </h3>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 dark:border-emerald-500/20 dark:bg-emerald-500/10">

                                    <div className="h-3 w-3 animate-pulse rounded-full bg-emerald-500" />

                                    <div>

                                        <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-300">
                                            Sistema operacional sincronizado
                                        </p>

                                        <p className="text-xs text-emerald-600/70 dark:text-emerald-300/70">
                                            Processamento contínuo ativo
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ALERTA */}
                        <div className="relative overflow-hidden rounded-[40px] border border-amber-200 bg-linear-to-br from-amber-50 to-orange-50 p-8 backdrop-blur-3xl dark:border-amber-500/20 dark:bg-linear-to-br dark:from-amber-500/10 dark:to-orange-500/10">

                            <div className="flex items-start gap-4">

                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 dark:border-amber-500/20 dark:bg-amber-500/10">

                                    <AlertTriangle className="h-7 w-7 text-amber-600 dark:text-amber-300" />
                                </div>

                                <div>

                                    <h3 className="text-xl font-black text-slate-900 dark:text-white">
                                        Monitoramento Operacional
                                    </h3>

                                    <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                                        Nenhuma máquina em estado crítico.
                                        Todos os setores operando dentro
                                        dos parâmetros esperados.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
