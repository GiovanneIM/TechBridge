'use client';

import { useState, useEffect } from "react";
import {
	DndContext,
	closestCorners,
	PointerSensor,
	useSensor,
	useSensors,
	DragOverlay,
	useDroppable,
} from "@dnd-kit/core";
import {
	SortableContext,
	arrayMove,
	verticalListSortingStrategy,
	useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { useAuth } from "@/hooks/useAuth";
import { useChamados } from "@/hooks/useChamados";
import { useMaquinas } from "@/hooks/useMaquina";
import { useSetores } from "@/hooks/useSetores";

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
	const { setNodeRef, isOver } = useDroppable({ id: columnId });

	const colors = {
		aberto: "bg-blue-50 border-blue-200",
		andamento: "bg-yellow-50 border-yellow-200",
		concluido: "bg-green-50 border-green-200",
		cancelado: "bg-red-50 border-red-200",
	};

	return (
		<div
			ref={setNodeRef}
			className={`w-80 mt-2 p-4 rounded-xl border transition-all
			self-start
			${colors[columnId]}
			${isOver ? "ring-2 ring-blue-400 scale-[1.02]" : ""}
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

			<div className="flex flex-col gap-3 min-h-[120px] max-h-[650px] overflow-y-auto">
				{children}
			</div>
		</div>
	);
}

// ================= KANBAN =================
export default function Kanban() {
	const { token } = useAuth({
		initialUser: null,
		fetchOnMount: true,
	});

	const { chamados, refetchChamados } = useChamados({
		token: token,
		initialChamado: [],
	});

	useEffect(() => {
		if (!token) return;
		refetchChamados();
	}, [token, refetchChamados]);

	const { maquinas } = useMaquinas({
		initialMachines: [],
		fetchOnMount: true,
	});

	const { setores } = useSetores({
		initialSetores: [],
		fetchOnMount: true,
	});

	const [columns, setColumns] = useState({
		aberto: [],
		andamento: [],
		concluido: [],
		cancelado: [],
	});

	const [activeTask, setActiveTask] = useState(null);

	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
	);

	useEffect(() => {
		const novasColunas = {
			aberto: [],
			andamento: [],
			concluido: [],
			cancelado: [],
		};

		chamados.forEach((c) => {
			const maquina = maquinas.find(m => m.id === c.id_maquina);
			const setor = setores.find(s => s.id === maquina?.id_setor);

			const task = {
				id: String(c.id),
				title: `${setor?.cod_setor || "??"} ${maquina?.cod_maquina || "??"} - ${c.cod_chamado}`,
				description: c.descricao_problema || "Sem descrição",
				status: c.estado,
			};

			novasColunas[c.estado]?.push(task);
		});

		setColumns(novasColunas);
	}, [chamados, maquinas, setores]);

	const columnList = [
		{ id: "aberto", title: "Aberto" },
		{ id: "andamento", title: "Em andamento" },
		{ id: "concluido", title: "Concluído" },
		{ id: "cancelado", title: "Cancelado" },
	];

	function findColumn(taskId) {
		return Object.keys(columns).find((col) =>
			columns[col].some((t) => t.id === taskId)
		);
	}

	function handleDragStart(event) {
		const col = findColumn(event.active.id);
		const task = columns[col].find((t) => t.id === event.active.id);
		setActiveTask(task);
	}

	function handleDragEnd(event) {
		const { active, over } = event;
		setActiveTask(null);
		if (!over) return;

		const activeCol = findColumn(active.id);
		const overCol = columns[over.id]
			? over.id
			: findColumn(over.id);

		if (!activeCol || !overCol) return;

		const task = columns[activeCol].find((t) => t.id === active.id);

		if (activeCol === overCol) {
			const oldIndex = columns[activeCol].findIndex(
				(t) => t.id === active.id
			);
			const newIndex = columns[overCol].findIndex(
				(t) => t.id === over.id
			);

			setColumns((prev) => ({
				...prev,
				[activeCol]: arrayMove(prev[activeCol], oldIndex, newIndex),
			}));
		} else {
			setColumns((prev) => ({
				...prev,
				[activeCol]: prev[activeCol].filter(
					(t) => t.id !== active.id
				),
				[overCol]: [...prev[overCol], task],
			}));
		}
	}

	return (
		<div className="relative min-h-screen bg-linear-to-b from-white to-blue-50 overflow-hidden">

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

			<div className="relative z-10 flex flex-col items-center py-8">
				<h1 className="text-3xl font-bold pb-8 text-gray-800">
					Kanban de Chamados
				</h1>

				<DndContext
					sensors={sensors}
					collisionDetection={closestCorners}
					onDragStart={handleDragStart}
					onDragEnd={handleDragEnd}
				>
					<div className="flex flex-col items-start justify-center md:flex-row gap-6 overflow-x-auto pb-8 w-full max-w-7xl">
						{columnList.map((col) => (
							<Column
								key={col.id}
								columnId={col.id}
								title={col.title}
								tasks={columns[col.id]}
							>
								<SortableContext
									items={columns[col.id].map((t) => t.id)}
									strategy={verticalListSortingStrategy}
								>
									{columns[col.id].map((task) => (
										<TaskCard key={task.id} task={task} />
									))}
								</SortableContext>
							</Column>
						))}
					</div>

					<DragOverlay>
						{activeTask ? (
							<div className="rotate-2 scale-105">
								<TaskCard task={activeTask} />
							</div>
						) : null}
					</DragOverlay>
				</DndContext>
			</div>
		</div>
	);
}