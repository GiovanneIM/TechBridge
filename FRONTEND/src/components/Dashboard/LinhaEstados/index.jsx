'use client'

import { useMemo } from "react"
import {
    CartesianGrid,
    Line,
    LineChart,
    XAxis,
    ResponsiveContainer,
    Tooltip,
} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const cores = {
    aberto: "#f59e0b",
    andamento: "#3b82f6",
    concluido: "#22c55e",
}

export default function LinhaEstados({ chamadosPorDia = [] }) {

    const chartData = useMemo(() => {
        if (!Array.isArray(chamadosPorDia)) return []

        return chamadosPorDia.map((item) => {
            const total = Number(item?.total) || 0

            return {
                data: new Date(item?.dia).toLocaleDateString("pt-BR"),

                // ⚠️ como NÃO existe por estado no backend, distribuímos
                aberto: Math.round(total * 0.3),
                andamento: Math.round(total * 0.3),
                concluido: Math.round(total * 0.4),
            }
        })
    }, [chamadosPorDia])

    return (
        <Card className="w-full h-[480px] flex flex-col">
            <CardHeader>
                <CardTitle>Chamados por dia</CardTitle>
                <CardDescription>Por estado (estimado)</CardDescription>
            </CardHeader>

            <CardContent className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <CartesianGrid vertical={false} opacity={0.3} />

                        <XAxis dataKey="data" />

                        <Tooltip />

                        <Line type="monotone" dataKey="aberto" stroke={cores.aberto} strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="andamento" stroke={cores.andamento} strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="concluido" stroke={cores.concluido} strokeWidth={2} dot={false} />

                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}