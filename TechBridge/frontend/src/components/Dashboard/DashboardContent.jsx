import {
    Activity,
    AlertCircle,
    ArrowUpRight,
    BarChart3,
    Bell,
    BrainCircuit,
    Globe2,
    Layers3,
    ShieldCheck,
    Sparkles,
    TrendingUp,
    Zap,
} from "lucide-react"

import LinhaUm from "./LinhaUm"
import CardsEstados from "./CardsEstados"
import RoscaEstados from "./RoscaEstados"
import LinhaEstados from "./LinhaEstados"

export default function DashboardContent({ dashboard }) {
    return (
        <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white">

            {/* ===================================================== */}
            {/* BACKGROUND SYSTEM */}
            {/* ===================================================== */}

            <div className="absolute inset-0 -z-50">

                {/* Main Gradient */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.12),transparent_30%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.10),transparent_30%),radial-gradient(circle_at_bottom,rgba(59,130,246,0.08),transparent_35%)]" />

                {/* Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />

                {/* Noise */}
                <div className="absolute inset-0 opacity-[0.03] mix-blend-soft-light [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]" />

                {/* Glow Orbs */}
                <div className="absolute left-[-200px] top-[-200px] h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[160px]" />
                <div className="absolute right-[-200px] top-[100px] h-[500px] w-[500px] rounded-full bg-violet-500/20 blur-[160px]" />
                <div className="absolute bottom-[-250px] left-[30%] h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[160px]" />
            </div>

            {/* ===================================================== */}
            {/* CONTENT */}
            {/* ===================================================== */}

            <div className="mx-auto max-w-[1700px] space-y-8 p-4 md:p-6 lg:p-8">

                {/* ===================================================== */}
                {/* TOP NAV */}
                {/* ===================================================== */}

                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                    <div className="space-y-3">

                        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300 backdrop-blur-xl">
                            <Sparkles className="h-4 w-4" />
                            Next Generation Analytics Platform
                        </div>

                        <div>
                            <h1 className="text-5xl font-black tracking-[-0.04em] text-white">
                                Operations Intelligence
                            </h1>

                            <p className="mt-3 max-w-2xl text-base text-zinc-400">
                                Plataforma avançada de monitoramento operacional
                                com analytics em tempo real, inteligência
                                preditiva e visualização enterprise-grade.
                            </p>
                        </div>
                    </div>

                    {/* STATUS */}
                    <div className="flex flex-wrap gap-4">

                        <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/4 p-5 backdrop-blur-2xl transition-all duration-500 hover:border-emerald-500/30 hover:bg-emerald-500/4">

                            <div className="absolute inset-0 bg-linear-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                            <div className="relative flex items-center gap-4">

                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                                    <ShieldCheck className="h-7 w-7 text-emerald-400" />
                                </div>

                                <div>
                                    <p className="text-sm text-zinc-400">
                                        Status
                                    </p>

                                    <h3 className="text-xl font-bold text-white">
                                        Operacional
                                    </h3>

                                    <div className="mt-1 flex items-center gap-2">
                                        <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

                                        <span className="text-xs text-emerald-300">
                                            Todos sistemas online
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/4 p-5 backdrop-blur-2xl transition-all duration-500 hover:border-cyan-500/30 hover:bg-cyan-500/4">

                            <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                            <div className="relative flex items-center gap-4">

                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
                                    <BrainCircuit className="h-7 w-7 text-cyan-400" />
                                </div>

                                <div>
                                    <p className="text-sm text-zinc-400">
                                        IA Insights
                                    </p>

                                    <h3 className="text-xl font-bold text-white">
                                        Ativado
                                    </h3>

                                    <div className="mt-1 flex items-center gap-2">
                                        <Zap className="h-3 w-3 text-cyan-400" />

                                        <span className="text-xs text-cyan-300">
                                            Predição em tempo real
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ===================================================== */}
                {/* HERO KPIs */}
                {/* ===================================================== */}

                <section className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/3 backdrop-blur-3xl">

                    <div className="absolute inset-0 bg-linear-to-r from-cyan-500/8 to-violet-500/8" />

                    <div className="relative p-6 lg:p-8">

                        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                            <div>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
                                        <Activity className="h-6 w-6 text-cyan-400" />
                                    </div>

                                    <div>
                                        <h2 className="text-3xl font-black tracking-tight">
                                            Executive Overview
                                        </h2>

                                        <p className="text-zinc-400">
                                            Indicadores globais da operação
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3">

                                <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-3 backdrop-blur-xl">
                                    <div className="flex items-center gap-3">

                                        <TrendingUp className="h-5 w-5 text-emerald-400" />

                                        <div>
                                            <p className="text-xs text-zinc-500">
                                                Crescimento
                                            </p>

                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold text-white">
                                                    +18.2%
                                                </span>

                                                <ArrowUpRight className="h-4 w-4 text-emerald-400" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-3 backdrop-blur-xl">
                                    <div className="flex items-center gap-3">

                                        <Bell className="h-5 w-5 text-yellow-400" />

                                        <div>
                                            <p className="text-xs text-zinc-500">
                                                Alertas
                                            </p>

                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold text-white">
                                                    03
                                                </span>

                                                <span className="text-xs text-yellow-300">
                                                    monitorando
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-3 backdrop-blur-xl">
                                    <div className="flex items-center gap-3">

                                        <Layers3 className="h-5 w-5 text-violet-400" />

                                        <div>
                                            <p className="text-xs text-zinc-500">
                                                Processos
                                            </p>

                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold text-white">
                                                    24/7
                                                </span>

                                                <span className="text-xs text-violet-300">
                                                    ativo
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* KPI GRID */}
                        <div className="rounded-[32px] border border-white/10 bg-black/20 p-4 backdrop-blur-2xl">
                            <LinhaUm dashboard={dashboard} />
                        </div>
                    </div>
                </section>

                {/* ===================================================== */}
                {/* ANALYTICS GRID */}
                {/* ===================================================== */}

                <section className="grid grid-cols-1 gap-6 2xl:grid-cols-12">

                    {/* LEFT */}
                    <div className="space-y-6 2xl:col-span-8">

                        {/* MAP / STATES */}
                        <div className="group relative overflow-hidden rounded-[40px] border border-white/10 bg-white/3 backdrop-blur-3xl transition-all duration-700 hover:border-cyan-500/20">

                            <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                                <div className="absolute inset-0 bg-linear-to-r from-cyan-500/12 to-violet-500/12" />
                            </div>

                            <div className="relative p-6 lg:p-8">

                                <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                                    <div>
                                        <div className="flex items-center gap-3">

                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
                                                <Globe2 className="h-6 w-6 text-cyan-400" />
                                            </div>

                                            <div>
                                                <h2 className="text-2xl font-black">
                                                    Geographical Analytics
                                                </h2>

                                                <p className="text-zinc-400">
                                                    Distribuição inteligente de chamados
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="inline-flex items-center gap-2 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-5 py-3 text-sm text-cyan-300 backdrop-blur-xl">
                                        <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
                                        Atualização em tempo real
                                    </div>
                                </div>

                                <div className="rounded-[28px] border border-white/10 bg-black/20 p-5 backdrop-blur-2xl">
                                    <CardsEstados
                                        totalChamados={dashboard?.totalChamados}
                                        chamadosPorEstados={dashboard?.porEstado}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* TIMELINE */}
                        <div className="group relative overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.03] backdrop-blur-3xl transition-all duration-700 hover:border-violet-500/20">

                            <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_40%)]" />
                            </div>

                            <div className="relative p-6 lg:p-8">

                                <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                                    <div>
                                        <div className="flex items-center gap-3">

                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 border border-violet-500/20">
                                                <BarChart3 className="h-6 w-6 text-violet-400" />
                                            </div>

                                            <div>
                                                <h2 className="text-2xl font-black">
                                                    Predictive Timeline
                                                </h2>

                                                <p className="text-zinc-400">
                                                    Evolução operacional e tendências
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">

                                        <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-3 text-sm text-zinc-300 backdrop-blur-xl">
                                            Últimos 30 dias
                                        </div>

                                        <div className="rounded-2xl border border-violet-500/20 bg-violet-500/10 px-5 py-3 text-sm text-violet-300 backdrop-blur-xl">
                                            IA Analytics
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-[28px] border border-white/10 bg-black/20 p-5 backdrop-blur-2xl">
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
                        <div className="group relative overflow-hidden rounded-[40px] border border-white/10 bg-white/3 backdrop-blur-3xl transition-all duration-700 hover:border-fuchsia-500/20">

                            <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                                <div className="absolute inset-0 bg-linear-to-r from-fuchsia-500/12 to-violet-500/12" />
                            </div>

                            <div className="relative p-6 lg:p-8">

                                <div className="mb-8">
                                    <div className="flex items-center gap-3">

                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/20">
                                            <Activity className="h-6 w-6 text-fuchsia-400" />
                                        </div>

                                        <div>
                                            <h2 className="text-2xl font-black">
                                                Smart Distribution
                                            </h2>

                                            <p className="text-zinc-400">
                                                Participação regional
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-[28px] border border-white/10 bg-black/20 p-5 backdrop-blur-2xl">
                                    <RoscaEstados
                                        chamadosPorEstados={
                                            dashboard?.porEstado ?? []
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        {/* AI CARD */}
                        <div className="relative overflow-hidden rounded-[40px] border border-cyan-500/20 bg-linear-to-br from-cyan-500/10 via-blue-500/5 to-violet-500/10 p-8 backdrop-blur-3xl">

                            <div className="absolute right-[-40px] top-[-40px] h-40 w-40 rounded-full bg-cyan-400/20 blur-[80px]" />

                            <div className="relative">

                                <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-cyan-500/20 bg-cyan-500/10">
                                    <BrainCircuit className="h-8 w-8 text-cyan-300" />
                                </div>

                                <h2 className="mt-6 text-3xl font-black tracking-tight">
                                    AI Operational Layer
                                </h2>

                                <p className="mt-4 leading-relaxed text-zinc-300">
                                    Sistema inteligente analisando padrões
                                    operacionais, comportamento de chamados e
                                    tendências preditivas em tempo real.
                                </p>

                                <div className="mt-8 grid grid-cols-2 gap-4">

                                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                                        <p className="text-xs text-zinc-500">
                                            Precisão IA
                                        </p>

                                        <h3 className="mt-2 text-2xl font-black text-cyan-300">
                                            99.2%
                                        </h3>
                                    </div>

                                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                                        <p className="text-xs text-zinc-500">
                                            Latência
                                        </p>

                                        <h3 className="mt-2 text-2xl font-black text-violet-300">
                                            12ms
                                        </h3>
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4">

                                    <div className="h-3 w-3 animate-pulse rounded-full bg-emerald-400" />

                                    <div>
                                        <p className="text-sm font-semibold text-emerald-300">
                                            Modelo operacional sincronizado
                                        </p>

                                        <p className="text-xs text-emerald-200/70">
                                            Processamento contínuo ativo
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ALERTS */}
                        <div className="relative overflow-hidden rounded-[40px] border border-amber-500/20 bg-linear-to-br from-amber-500/10 to-orange-500/10 p-8 backdrop-blur-3xl">

                            <div className="flex items-start gap-4">

                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10">
                                    <AlertCircle className="h-7 w-7 text-amber-300" />
                                </div>

                                <div>
                                    <h3 className="text-xl font-black">
                                        Operational Monitoring
                                    </h3>

                                    <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                                        Nenhuma anomalia crítica detectada.
                                        Performance operacional dentro dos
                                        parâmetros ideais.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===================================================== */}
                {/* FOOTER */}
                {/* ===================================================== */}

                <footer className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/3 p-8 backdrop-blur-3xl">

                    <div className="absolute inset-0 bg-linear-to-r from-cyan-500/3 via-transparent to-violet-500/3" />

                    <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                        <div>
                            <h3 className="text-2xl font-black">
                                Enterprise Intelligence Platform
                            </h3>

                            <p className="mt-2 text-zinc-400">
                                Arquitetura visual premium inspirada em Stripe,
                                Linear, Vercel, Datadog e Framer.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4">

                            <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-3 backdrop-blur-xl">
                                <p className="text-xs text-zinc-500">
                                    Uptime
                                </p>

                                <h3 className="text-xl font-black text-emerald-300">
                                    99.99%
                                </h3>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-3 backdrop-blur-xl">
                                <p className="text-xs text-zinc-500">
                                    Infraestrutura
                                </p>

                                <h3 className="text-xl font-black text-cyan-300">
                                    Global
                                </h3>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-3 backdrop-blur-xl">
                                <p className="text-xs text-zinc-500">
                                    Sync
                                </p>

                                <h3 className="text-xl font-black text-violet-300">
                                    Real-Time
                                </h3>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}