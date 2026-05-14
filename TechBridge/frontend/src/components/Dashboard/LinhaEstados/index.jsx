"use client"

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
    abertos: {
        label: "Abertos",
        color: "var(--color-aberto)",
    },
    atendidos: {
        label: "Atendidos",
        color: "var(--color-andamento)",
    },
    concluidos: {
        label: "Concluídos",
        color: "var(--color-concluido)",
    },
}

export default function LinhaEstados({ chamadosPorDia = [] }) {
    const chartData = chamadosPorDia?.map((item, index, arr) => {
        const abertos = Number(item.abertos)
        const concluidos = Number(item.concluidos)

        const prev = arr[index - 1]
        const prevBacklog = prev?.backlog || 0

        const sobrecarga = prevBacklog + abertos - concluidos

        return {
            data: new Date(item.data).toLocaleDateString("pt-BR"),
            abertos,
            atendidos: Number(item.atendidos),
            concluidos,
            sobrecarga,
        }
    })

    return (
        <Card className="w-full h-[480px] flex flex-col">
            <CardHeader className="shrink-0">
                <CardTitle>Chamados por dia</CardTitle>
                <CardDescription>
                    Fluxo diário de chamados: abertos, atendidos e concluídos
                </CardDescription>
            </CardHeader>

            <CardContent className="flex-1 p-0 h-full">
                <ChartContainer config={chartConfig} className="w-full h-full">
                    <LineChart
                        data={chartData}
                        height={320}
                        margin={{ left: 12, right: 12, top: 10, bottom: 10 }}
                    >
                        <CartesianGrid vertical={false} />

                        <XAxis
                            dataKey="data"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />

                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />

                        {/* 🔵 LINHAS SUAVES */}
                        <Line
                            dataKey="abertos"
                            type="monotone"
                            stroke="var(--color-aberto)"
                            strokeWidth={2}
                            dot={false}
                        />

                        <Line
                            dataKey="atendidos"
                            type="monotone"
                            stroke="var(--color-andamento)"
                            strokeWidth={2}
                            dot={false}
                        />

                        <Line
                            dataKey="concluidos"
                            type="monotone"
                            stroke="var(--color-concluido)"
                            strokeWidth={2}
                            dot={false}
                        />

                        <Line
                            dataKey="sobrecarga"
                            type="monotone"
                            stroke="#FF5E00"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}