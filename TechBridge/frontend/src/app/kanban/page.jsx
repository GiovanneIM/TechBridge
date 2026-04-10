'use client';

import { useState, useEffect } from "react";
import { conexaoKanban } from "@/hooks/conexaoKanban";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

// ================= TASK CARD =================
function TaskCard({ task, hideWhenDragging = false }) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: task.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition: transition || "transform 200ms ease",
		opacity: hideWhenDragging && isDragging ? 0 : 1,
	};

	return (
		<Card
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className="cursor-grab active:cursor-grabbing border border-border/50
			bg-white/70 backdrop-blur-sm
			hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
		>
			<CardContent className="p-4 space-y-3">
				<div className="font-semibold text-sm text-gray-800">
					{task.title}
				</div>

				<p className="text-xs text-muted-foreground line-clamp-2">
					{task.description}
				</p>

				<div className="flex justify-between items-center pt-2">
					<Avatar className="w-7 h-7">
						<AvatarFallback className="text-[10px]">
							TB
						</AvatarFallback>
					</Avatar>

					<Badge
						variant="secondary"
						className="text-[10px] px-2 py-0.5"
					>
						{task.status}
					</Badge>
				</div>
			</CardContent>
		</Card>
	);
}

// ================= COLUMN =================
function Column({ columnId, title, tasks, children }) {
	const colors = {
		aberto: "bg-(--color-aberto)/30 border-(--color-aberto)",
		andamento: "bg-(--color-andamento)/30 border-(--color-andamento)",
		fechado: "bg-muted-foreground/30 border-muted-foreground",
	};

	return (
		<div
			className={`w-80 mt-2 p-4 rounded-xl border transition-all
			self-start
			${colors[columnId]}
			shadow-sm`}
		>
			<div className="flex justify-between items-center mb-3">
				<h2 className="font-semibold text-gray-700">
					{title}
				</h2>
				<span className="text-xs bg-white px-2 py-1 rounded-md shadow-sm">
					{tasks.length}
				</span>
			</div>

			<div className="flex flex-col gap-3 min-h-[120px] max-h-[650px] rounded-xl overflow-y-auto">
				{children}
			</div>
		</div>
	);
}

// ================= KANBAN =================
export default function Kanban() {

	const { chamados } = conexaoKanban({
		conectOnMount: true
	});


	const [columns, setColumns] = useState({
		aberto: [],
		andamento: [],
		concluido: [],
		cancelado: [],
	});

	useEffect(() => {
		const novasColunas = {
			aberto: [],
			andamento: [],
			concluido: [],
			cancelado: [],
		};

		chamados.forEach((c) => {

			const task = {
				id: String(c.id),
				title: `${"??"} ${"??"} - ${c.cod_chamado}`,
				description: c.descricao_problema || "Sem descrição",
				status: c.estado,
			};

			novasColunas[c.estado]?.push(task);
		});

		setColumns(novasColunas);
	}, [chamados]);


	return (<>
		<div className="relative flex-1 flex min-h-screen bg-linear-to-b from-white to-blue-50 overflow-hidden">

			{/* Background (onda) */}
			<div className="absolute inset-x-0 bottom-0 z-0 pointer-events-none">
				<svg
					className="w-full h-48 md:h-120"
					viewBox="0 0 1440 320"
					preserveAspectRatio="none"
				>
					<path
						fill="#5170ff"
						fillOpacity="1"
						d="M0,160 
					C180,240 360,80 540,160 
					C720,240 900,80 1080,160 
					C1260,240 1440,160 1440,160 
					L1440,320 L0,320 Z"
					/>
				</svg>
			</div>

			{/* Kanban */}
			{/* <div className="flex-1 flex flex-row gap-6 p-6 z-10">
				<div
					className={`w-1/3 h-full p-4 rounded self-start shadow-sm 
							bg-(--color-aberto)/30 border border-(--color-aberto)
						`}
				>
					<div className="flex justify-between items-center mb-3">
						<p className="text-gray-700 font-genty text-4xl">
							CHAMADOS EM ABERTO
						</p>
						<span className="text-xs bg-white px-2 py-1 rounded-md shadow-sm">
						</span>
					</div>

					<div className="flex flex-col gap-3 min-h-[120px] max-h-[650px] rounded-xl overflow-y-auto">

						<Card className="relative overflow-hidden py-4 gap-0">
							<div className="absolute left-0 top-0 h-full w-2 bg-(--color-aberto)" />

							<CardHeader>
								<CardTitle className="font-bold">
									(codSetor) - (codMaquina) - (codChamado)
								</CardTitle>
							</CardHeader>

							<CardContent>
								<div className="w-full grid grid-cols-2 gap-4 my-4">
									<div>
										<p className="font-bold uppercase">Setor:</p>
										<p>Ferramentaria</p>
									</div>

									<div>
										<p className="font-bold uppercase">Máquina:</p>
										<p >Prensa Hidráulica</p>
									</div>
								</div>

								<div className="font-bold grid grid-cols-3">
									<div>Aberto há 2h</div>
									<div></div>
									<div></div>
								</div>
							</CardContent>
						</Card>

					</div>
				</div>

				<div
					className={`w-1/3 h-full p-4 rounded self-start shadow-sm 
							bg-(--color-andamento)/30 border border-(--color-andamento)
						`}
				>
					<div className="flex justify-between items-center mb-3">
						<p className="text-gray-700 font-genty text-4xl">
							CHAMADOS EM ANDAMENTO
						</p>
						<span className="text-xs bg-white px-2 py-1 rounded-md shadow-sm">
						</span>
					</div>

					<div className="flex flex-col gap-3 min-h-[120px] max-h-[650px] rounded-xl overflow-y-auto">

						<Card className="relative overflow-hidden py-4 gap-0">
							<div className="absolute left-0 top-0 h-full w-2 bg-(--color-andamento)" />

							<CardHeader>
								<CardTitle className="font-bold">
									(codSetor) - (codMaquina) - (codChamado)
								</CardTitle>
							</CardHeader>

							<CardContent>
								<div className="w-full grid grid-cols-2 gap-4 my-4">
									<div>
										<p className="font-bold uppercase">Setor:</p>
										<p>Ferramentaria</p>
									</div>

									<div>
										<p className="font-bold uppercase">Máquina:</p>
										<p >Prensa Hidráulica</p>
									</div>

									<div>
										<p className="font-bold uppercase">Técnico:</p>
										<p>João Pedro Silva</p>
									</div>
								</div>

								<div className="font-bold grid grid-cols-3">
									<div>Aberto há 2h</div>
									<div>Atendido há 1h</div>
									<div></div>
								</div>
							</CardContent>
						</Card>

					</div>
				</div>

				<div
					className={`w-1/3 h-full p-4 rounded self-start shadow-sm 
							bg-muted-foreground/30 border border-muted-foreground
						`}
				>
					<div className="flex justify-between items-center mb-3">
						<p className="text-gray-700 font-genty text-4xl">
							CHAMADOS FECHADOS
						</p>
						<span className="text-xs bg-white px-2 py-1 rounded-md shadow-sm">
						</span>
					</div>

					<div className="flex flex-col gap-3 min-h-[120px] max-h-[650px] rounded-xl overflow-y-auto">
						<Card className="relative overflow-hidden py-4 gap-0 text-sm">
							<div className="absolute left-0 top-0 h-full w-2 bg-(--color-cancelado)" />

							<CardHeader>
								<CardTitle className="font-bold">
									(codSetor) - (codMaquina) - (codChamado)
								</CardTitle>
							</CardHeader>

							<CardContent>
								<div className="w-full grid grid-cols-2 gap-4 my-4">
									<div>
										<p className="font-bold uppercase">Setor:</p>
										<p>Ferramentaria</p>
									</div>

									<div>
										<p className="font-bold uppercase">Máquina:</p>
										<p >Prensa Hidráulica</p>
									</div>

									<div>
										<p className="font-bold uppercase">Técnico:</p>
										<p>João Pedro Silva</p>
									</div>
								</div>

								<div className="font-bold grid grid-cols-3">
									<div>Aberto há 2h</div>
									<div>Atendido há 1h</div>
									<div>Fechado há 30min</div>
								</div>
							</CardContent>
						</Card>

						<Card className="relative overflow-hidden py-4 gap-0 text-sm">
							<div className="absolute left-0 top-0 h-full w-2 bg-(--color-concluido)" />

							<CardHeader>
								<CardTitle className="font-bold">
									(codSetor) - (codMaquina) - (codChamado)
								</CardTitle>
							</CardHeader>

							<CardContent>
								<div className="w-full grid grid-cols-2 gap-4 my-4">
									<div>
										<p className="font-bold uppercase">Setor:</p>
										<p>Ferramentaria</p>
									</div>

									<div>
										<p className="font-bold uppercase">Máquina:</p>
										<p >Prensa Hidráulica</p>
									</div>

									<div>
										<p className="font-bold uppercase">Técnico:</p>
										<p>João Pedro Silva</p>
									</div>
								</div>

								<div className="font-bold grid grid-cols-3">
									<div>Aberto há 2h</div>
									<div>Atendido há 1h</div>
									<div>Fechado há 30min</div>
								</div>
							</CardContent>
						</Card>

					</div>
				</div>
			</div> */}

			<div className="flex-1 flex gap-6 p-6 z-10 bg-muted-foreground/90 border-bg-muted m-4 rounded">
				<Table className="font-genty">
					<TableCaption>A list of your recent invoices.</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">IDENTIFICADOR</TableHead>
							<TableHead>STATUS</TableHead>
							<TableHead>Method</TableHead>
							<TableHead className="text-right">Amount</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell className="font-medium">### - ### - ###</TableCell>
							<TableCell className="text-(--color-aberto)">AGUARDANDO</TableCell>
							<TableCell>Credit Card</TableCell>
							<TableCell className="text-right">$250.00</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">### - ### - ###</TableCell>
							<TableCell className="text-(--color-andamento)">EM ANDAMENTO</TableCell>
							<TableCell>Credit Card</TableCell>
							<TableCell className="text-right">$250.00</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">### - ### - ###</TableCell>
							<TableCell className="text-(--color-cancelado)">CANCELADO</TableCell>
							<TableCell>Credit Card</TableCell>
							<TableCell className="text-right">$250.00</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">### - ### - ###</TableCell>
							<TableCell className="text-(--color-concluido)">CONCLUÍDO</TableCell>
							<TableCell>Credit Card</TableCell>
							<TableCell className="text-right">$250.00</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>
		</div>
	</>
	);
}