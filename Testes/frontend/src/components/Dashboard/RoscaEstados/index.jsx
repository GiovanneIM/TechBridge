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

export default function RoscaEstados({
    chamadosPorEstados
}) {
    // Construindo array com os dados do gráfico
    const chartData = []
    for (const estado in chamadosPorEstados) {
        chartData.push({
            estado: estado,
            total: chamadosPorEstados[estado],
            fill: `var(--color-${estado})`
        }) 
    }

    return (
        <Card className="flex flex-col w-full md:w-1/2" >
            <CardHeader className="items-center pb-0" >
                <CardTitle>Distribuição de chamados por estado </CardTitle>
                {/* <CardDescription>Distribuição de chamados por estado</CardDescription> */}
            </CardHeader>
            < CardContent className="flex-1 pb-0" >
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[300px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />
                        < Pie
                            data={chartData}
                            dataKey="total"
                            nameKey="estado"
                            innerRadius={60}
                            strokeWidth={5}
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
