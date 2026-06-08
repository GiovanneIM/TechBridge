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
import { Skeleton } from "@/components/ui/skeleton"

export const description = "A linear line chart"

const chartData = []

const chartConfig = {}


export default function SkeletonLinhaEstados() {
    return (
        <Card className="w-full xl:w-1/2">
            <CardHeader>
                <CardTitle>Chamados por dia</CardTitle>
                <CardDescription>Fluxo diário de chamados: abertos, atendidos e concluídos</CardDescription>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col">
                <div className="mx-3 aspect-video">
                    <Skeleton className="h-full" />
                </div>
            </CardContent>
        </Card>
    )
}