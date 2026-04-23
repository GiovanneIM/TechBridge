"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
	Card,
	CardAction,
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

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

import {
	ToggleGroup,
	ToggleGroupItem,
} from "@/components/ui/toggle-group"

export default function AbertosXConcluidos({ chamados }) {
	const isMobile = useIsMobile()

	const [timeRange, setTimeRange] = useState("90d")
	const [chartData, setChartData] = useState([])

	// 👇 Ajuste automático mobile
	useEffect(() => {
		if (isMobile) setTimeRange("7d")
	}, [isMobile])

	// 👇 Buscar chamados da API
	useEffect(() => {
		async function carregarChamados() {
			try {
				// 👇 Agrupar por data
				const agrupado = {}

				chamados.forEach((chamado) => {
					const dataAbertura = new Date(chamado.datahora_abertura)
						.toISOString()
						.split("T")[0];

					if (!agrupado[dataAbertura]) {
						agrupado[dataAbertura] = {
							date: dataAbertura,
							abertos: 0,
							concluidos: 0,
						}
					}

					agrupado[dataAbertura].abertos += 1

					if (chamado.datahora_conclusao) {
						const dataConclusao = new Date(chamado.datahora_conclusao)
							.toISOString()
							.split("T")[0]

						if (!agrupado[dataConclusao]) {
							agrupado[dataConclusao] = {
								date: dataConclusao,
								abertos: 0,
								concluidos: 0,
							}
						}

						agrupado[dataConclusao].concluidos += 1
					}
				})

				const resultado = Object.values(agrupado).sort(
					(a, b) => new Date(a.date) - new Date(b.date)
				)

				setChartData(resultado)
			} catch (err) {
				console.error("Erro ao carregar chamados:", err)
			}
		}

		carregarChamados()
	}, [])

	// 👇 Filtro por período
	const filteredData = React.useMemo(() => {
		if (!chartData.length) return []

		const referenceDate = new Date(
			chartData[chartData.length - 1].date
		)

		let days = 90
		if (timeRange === "30d") days = 30
		if (timeRange === "7d") days = 7

		const startDate = new Date(referenceDate)
		startDate.setDate(startDate.getDate() - days)

		return chartData.filter(
			(item) => new Date(item.date) >= startDate
		)
	}, [chartData, timeRange])

	const chartConfig = {
		abertos: {
			label: "Abertos",
			color: "var(--primary)",
		},
		concluidos: {
			label: "Concluídos",
			color: "var(--primary)",
		},
	}

	return (
		<Card className="w-full md:w-1/2 @container/card">
			<CardHeader>
				<CardTitle>Total de Chamados</CardTitle>

				<CardDescription>
					Últimos períodos
				</CardDescription>

				<CardAction>
					<ToggleGroup
						type="single"
						value={timeRange}
						onValueChange={setTimeRange}
						variant="outline"
						className="hidden @[767px]/card:flex"
					>
						<ToggleGroupItem value="90d">
							3 meses
						</ToggleGroupItem>
						<ToggleGroupItem value="30d">
							30 dias
						</ToggleGroupItem>
						<ToggleGroupItem value="7d">
							7 dias
						</ToggleGroupItem>
					</ToggleGroup>

					<Select value={timeRange} onValueChange={setTimeRange}>
						<SelectTrigger className="w-40 @[767px]/card:hidden">
							<SelectValue />
						</SelectTrigger>

						<SelectContent>
							<SelectItem value="90d">3 meses</SelectItem>
							<SelectItem value="30d">30 dias</SelectItem>
							<SelectItem value="7d">7 dias</SelectItem>
						</SelectContent>
					</Select>
				</CardAction>
			</CardHeader>

			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				<ChartContainer config={chartConfig} className="h-[250px] w-full">
					<AreaChart data={filteredData}>
						<defs>
							<linearGradient id="fillAbertos" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="var(--color-abertos)" stopOpacity={0.8} />
								<stop offset="95%" stopColor="var(--color-abertos)" stopOpacity={0.1} />
							</linearGradient>

							<linearGradient id="fillConcluidos" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="var(--color-concluidos)" stopOpacity={0.8} />
								<stop offset="95%" stopColor="var(--color-concluidos)" stopOpacity={0.1} />
							</linearGradient>
						</defs>

						<CartesianGrid vertical={false} />

						<XAxis
							dataKey="date"
							tickLine={false}
							axisLine={false}
							tickFormatter={(value) =>
								new Date(value).toLocaleDateString("pt-BR", {
									day: "2-digit",
									month: "short",
								})
							}
						/>

						<ChartTooltip
							content={
								<ChartTooltipContent
									labelFormatter={(value) =>
										new Date(value).toLocaleDateString("pt-BR")
									}
								/>
							}
						/>

						<Area
							dataKey="abertos"
							type="monotone"
							fill="url(#fillAbertos)"
							stroke="var(--color-abertos)"
							stackId="a"
						/>

						<Area
							dataKey="concluidos"
							type="monotone"
							fill="url(#fillConcluidos)"
							stroke="var(--color-concluidos)"
							stackId="a"
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}