"use client"

import { Pie, PieChart } from "recharts"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart"

const chartConfig = {
    total: {
        label: "Chamados",
    },
    aberto: {
        label: "Em aberto",
        color: "#f59e0b",
    },
    andamento: {
        label: "Em andamento",
        color: "#3b82f6",
    },
    concluido: {
        label: "Concluídos",
        color: "#22c55e",
    },
}

export default function RoscaEstados({ chamadosPorEstados = [] }) {
    // API retorna array: [{estado: "aberto", total: 3}, ...]
    const chartData = chamadosPorEstados.map((item) => ({
        estado: item.estado,
        total: Number(item.total),
        fill: chartConfig[item.estado]?.color ?? "#94a3b8",
    }))

    const temDados = chartData.some((d) => d.total > 0)

    return (
        <Card className="flex flex-col w-full h-full py-4">
            <CardHeader className="items-center pb-0">
                <CardTitle className="text-md">
                    Distribuição de chamados por estado
                </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 flex items-center justify-center">
                {!temDados ? (
                    <p className="text-sm text-muted-foreground">
                        Nenhum chamado registrado.
                    </p>
                ) : (
                    <ChartContainer
                        config={chartConfig}
                        className="w-full h-full min-h-[200px]"
                    >
                        <PieChart>
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent nameKey="estado" />}
                            />
                            <Pie
                                data={chartData}
                                dataKey="total"
                                nameKey="estado"
                                innerRadius="60%"
                                outerRadius="80%"
                                strokeWidth={3}
                            />
                            <ChartLegend content={<ChartLegendContent nameKey="estado" />} />
                        </PieChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    )
}