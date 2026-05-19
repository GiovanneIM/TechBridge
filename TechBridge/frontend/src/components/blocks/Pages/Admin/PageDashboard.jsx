'use client';

import { useMemo } from "react"
import {
    Users,
    Building2,
    Shield,
    Database,
    Activity,
    AlertTriangle,
    Server,
    UserCheck,
    Lock,
    Globe,
    Cpu,
    HardDrive,
    BarChart3,
    TrendingUp,
    Clock,
    FileWarning,
    KeyRound,
    Wifi,
} from "lucide-react"

import { useChamados } from "@/hooks/hooks2/useChamados"
import { useMaquinas } from "@/hooks/hooks2/useMaquina"
import { useSetores } from "@/hooks/hooks2/useSetores"

export default function AdminDashboardContent() {

    // =========================
    // DADOS GERAIS
    // =========================
    const { chamados } = useChamados()
    const { maquinas } = useMaquinas()
    const { setores } = useSetores({ fetchOnMount: true })

    // =========================
    // MOCK / EXEMPLOS DE ADMIN KPIs
    // (substituir por hooks reais depois)
    // =========================
    const totalUsuarios = 128
    const usuariosAtivos = 96
    const empresasAtivas = 14
    const acessosHoje = 842
    const logsSistema = 12034

    // =========================
    // KPIs DERIVADOS
    // =========================

    const totalChamados = chamados?.length ?? 0
    const totalMaquinas = maquinas?.length ?? 0
    const totalSetores = setores?.length ?? 0

    const maquinasOffline = useMemo(
        () => maquinas.filter(m => m.status !== "ativa").length,
        [maquinas]
    )

    const taxaErroSistema = useMemo(() => {
        if (!logsSistema) return 0
        return (Math.random() * 2).toFixed(2) // placeholder
    }, [])

    // =========================
    // UI
    // =========================

    return (
        <div className="relative w-full min-h-screen bg-white text-slate-900 dark:bg-sidebar dark:text-white">

            {/* BACKGROUND */}
            <div className="absolute inset-0 -z-50 opacity-40">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.08),transparent_40%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.08),transparent_40%)]" />
            </div>

            <div className="mx-auto max-w-[1700px] space-y-8 p-6">

                {/* HEADER */}
                <div className="space-y-2">
                    <h1 className="text-4xl font-black">Admin Control Center</h1>
                    <p className="text-zinc-500">
                        Visão global da plataforma, usuários, empresas e infraestrutura
                    </p>
                </div>

                {/* KPI GRID */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

                    {/* USUÁRIOS */}
                    <div className="rounded-2xl border p-5 dark:border-white/10">
                        <Users className="h-6 w-6 text-indigo-500" />
                        <p className="mt-2 text-sm text-zinc-500">Usuários Totais</p>
                        <h2 className="text-3xl font-black">{totalUsuarios}</h2>
                        <p className="text-xs text-green-500">{usuariosAtivos} ativos</p>
                    </div>

                    {/* EMPRESAS */}
                    <div className="rounded-2xl border p-5 dark:border-white/10">
                        <Building2 className="h-6 w-6 text-cyan-500" />
                        <p className="mt-2 text-sm text-zinc-500">Empresas</p>
                        <h2 className="text-3xl font-black">{empresasAtivas}</h2>
                        <p className="text-xs text-zinc-500">ativas na plataforma</p>
                    </div>

                    {/* SISTEMA */}
                    <div className="rounded-2xl border p-5 dark:border-white/10">
                        <Server className="h-6 w-6 text-emerald-500" />
                        <p className="mt-2 text-sm text-zinc-500">Chamados Totais</p>
                        <h2 className="text-3xl font-black">{totalChamados}</h2>
                        <p className="text-xs text-zinc-500">operações registradas</p>
                    </div>

                    {/* INFRA */}
                    <div className="rounded-2xl border p-5 dark:border-white/10">
                        <Database className="h-6 w-6 text-purple-500" />
                        <p className="mt-2 text-sm text-zinc-500">Logs do Sistema</p>
                        <h2 className="text-3xl font-black">{logsSistema}</h2>
                        <p className="text-xs text-zinc-500">eventos registrados</p>
                    </div>
                </div>

                {/* SECOND ROW */}
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

                    {/* INFRA STATUS */}
                    <div className="rounded-2xl border p-6 dark:border-white/10">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            <Cpu className="h-5 w-5" />
                            Infraestrutura
                        </h3>

                        <div className="mt-4 space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span>Máquinas Online</span>
                                <span>{totalMaquinas - maquinasOffline}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Máquinas Offline</span>
                                <span className="text-red-500">{maquinasOffline}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Setores Ativos</span>
                                <span>{totalSetores}</span>
                            </div>
                        </div>
                    </div>

                    {/* SECURITY */}
                    <div className="rounded-2xl border p-6 dark:border-white/10">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            Segurança
                        </h3>

                        <div className="mt-4 space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span>Acessos hoje</span>
                                <span>{acessosHoje}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Usuários ativos</span>
                                <span>{usuariosAtivos}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Taxa de erro</span>
                                <span className="text-yellow-500">{taxaErroSistema}%</span>
                            </div>
                        </div>
                    </div>

                    {/* ALERTAS */}
                    <div className="rounded-2xl border p-6 dark:border-white/10">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                            Alertas do Sistema
                        </h3>

                        <div className="mt-4 space-y-3 text-sm">
                            <div className="flex items-center justify-between">
                                <span>Chamados críticos</span>
                                <span className="text-amber-500">
                                    {Math.floor(totalChamados * 0.1)}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span>Falhas recentes</span>
                                <span className="text-red-500">2</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span>Status geral</span>
                                <span className="text-green-500">Saudável</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* AUDITORIA / LOGS */}
                <div className="rounded-2xl border p-6 dark:border-white/10">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <FileWarning className="h-5 w-5" />
                        Auditoria do Sistema
                    </h3>

                    <div className="mt-4 space-y-2 text-sm text-zinc-500">
                        <p>• Login admin realizado</p>
                        <p>• Novo usuário criado</p>
                        <p>• Alteração de permissões em empresa</p>
                        <p>• Sincronização de máquinas concluída</p>
                    </div>
                </div>

                {/* FOOTER KPIS */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                    <div className="rounded-xl border p-4 dark:border-white/10">
                        <TrendingUp className="h-5 w-5 text-green-500" />
                        <p className="text-sm text-zinc-500">Crescimento mensal</p>
                        <p className="text-2xl font-black">+12%</p>
                    </div>

                    <div className="rounded-xl border p-4 dark:border-white/10">
                        <Globe className="h-5 w-5 text-cyan-500" />
                        <p className="text-sm text-zinc-500">Disponibilidade API</p>
                        <p className="text-2xl font-black">99.98%</p>
                    </div>

                    <div className="rounded-xl border p-4 dark:border-white/10">
                        <Clock className="h-5 w-5 text-purple-500" />
                        <p className="text-sm text-zinc-500">Uptime</p>
                        <p className="text-2xl font-black">30 dias</p>
                    </div>
                </div>
            </div>
        </div>
    )
}