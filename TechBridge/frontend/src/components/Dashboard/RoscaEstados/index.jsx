"use client"

import { Label, Pie, PieChart, Sector } from "recharts"

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

const chartConfig = {
    total: {
        label: "Chamados",
    },
    aberto: {
        label: "Em aberto",
    },
    andamento: {
        label: "Em andamento",
    },
    concluido: {
        label: "Concluídos",
    }
}

export default function RoscaEstados({ chamadosPorEstados }) {
    const chartData = []

    for (const estado in chamadosPorEstados) {
        chartData.push({
            estado,
            total: chamadosPorEstados[estado],
            fill: `var(--color-${estado})`
        })
    }

    return (
        <Card className="flex flex-col w-full h-full py-4">
            <CardHeader className="items-center pb-0">
                <CardTitle className="text-md">
                    Distribuição de chamados por estado
                </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 flex items-center justify-center">
                <ChartContainer
                    config={chartConfig}
                    className="w-full h-full"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />

                        <Pie
                            data={chartData}
                            dataKey="total"
                            nameKey="estado"
                            innerRadius="60%"
                            outerRadius="90%"
                            strokeWidth={5}
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
