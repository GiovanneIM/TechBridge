"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A linear line chart"

// const chartData = [
//     { month: "January", desktop: 186 },
//     { month: "February", desktop: 305 },
//     { month: "March", desktop: 237 },
//     { month: "April", desktop: 73 },
//     { month: "May", desktop: 209 },
//     { month: "June", desktop: 214 },
// ]

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

export default function LinhaEstados({
    chamadosPorDia
}) {

    const chartData = chamadosPorDia.map((item, index, arr) => {
        const abertos = Number(item.abertos)
        const concluidos = Number(item.concluidos)
        
        const prev = arr[index - 1]

        const prevBacklog = prev?.backlog || 0

        const sobrecarga = prevBacklog + abertos - concluidos;

        return {
            data: new Date(item.data).toLocaleDateString("pt-BR"),
            abertos,
            atendidos: Number(item.atendidos),
            concluidos,
            sobrecarga,
        }
    })

    return (
        <Card className="w-full xl:w-1/2">
            <CardHeader>
                <CardTitle>Chamados por dia</CardTitle>
                <CardDescription>Fluxo diário de chamados: abertos, atendidos e concluídos</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
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
