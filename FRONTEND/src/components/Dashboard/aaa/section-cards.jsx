'use client';

import {
	Card,
	CardAction,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	CardContent
} from "@/components/ui/card"

import { useState, useEffect } from "react";

export function SectionCards({ chamados }) {

	return (<>
		<div className="
				grid grid-cols-1 gap-4 
				*:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs 
				@xl/main:grid-cols-2 
				@5xl/main:grid-cols-4 
				dark:*:data-[slot=card]:bg-card
			">
			<Card>
				<CardHeader>
					<CardTitle className="font-bold text-md">
						Total de chamadas
					</CardTitle>
				</CardHeader>

				<CardContent className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
					{chamados.length}
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className="font-bold text-md">
						Chamadas em aberto
					</CardTitle>
				</CardHeader>

				<CardContent className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
					{chamados.filter(chamado => chamado.estado === "aberto").length}
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardDescription className="font-bold text-md">
						Chamadas em andamento
					</CardDescription>
				</CardHeader>

				<CardContent className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
					{chamados.filter(chamado => chamado.estado === "andamento").length}
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardDescription className="font-bold text-md">
						Chamadas concluídas
					</CardDescription>
				</CardHeader>

				<CardContent className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
					{chamados.filter(chamado => chamado.estado === "concluido").length}
				</CardContent>
			</Card>
		</div>
	</>);
}
