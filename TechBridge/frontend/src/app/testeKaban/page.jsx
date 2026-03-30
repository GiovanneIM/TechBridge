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
			className="cursor-grab hover:shadow-md"
		>
			<CardContent className="p-4 space-y-3">
				<div className="font-medium">{task.title}</div>
				<p className="text-sm text-muted-foreground">
					{task.description}
				</p>

				<div className="flex justify-between items-center">
					<Avatar className="w-6 h-6">
						<AvatarFallback>TC</AvatarFallback>
					</Avatar>
					<Badge variant="outline">{task.status}</Badge>
				</div>
			</CardContent>
		</Card>
	);
}

// ================= COLUMN =================
function Column({ columnId, title, tasks, children }) {
	const { setNodeRef, isOver } = useDroppable({ id: columnId });

	return (
		<div
			ref={setNodeRef}
			className={`w-80 p-2 rounded-md min-h-[150px] flex flex-col gap-4 ${isOver ? "bg-blue-100" : "bg-muted/10"
				}`}
		>
			<div className="font-semibold">
				{title} ({tasks.length})
			</div>
			{children}
		</div>
	);
}

// ================= KANBAN =================
export default function Kanban() {
	const { token } = useAuth({
		initialUser: null,
		fetchOnMount: true
	})

	const { chamados, refetchChamados } = useChamados({
		token: token,
		initialChamado: []
	})

	useEffect(() => {
		if (!token) return;
		refetchChamados();
	}, [token, refetchChamados]);

	const { maquinas } = useMaquinas({
		initialMachines: [],
		fetchOnMount: true
	})

	const { setores } = useSetores({
		initialSetores: [],
		fetchOnMount: true
	})
	console.log(setores);

	// = = = = = = = = = = = = = = = = = = = = = = = = = =

	const [columns, setColumns] = useState({
		aberto: [],
		andamento: [],
		concluido: [],
	});

	const [activeTask, setActiveTask] = useState(null);

	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
	);

	useEffect(() => {
		async function chamadosParaKanban() {
			try {
				const novasColunas = {
					aberto: [],
					andamento: [],
					concluido: [],
				};

				chamados.forEach((c) => {
					const maquina = maquinas.find(maquina => maquina.id === c.id_maquina);
					const setor = setores.find(setor => setor.id === maquina.id_setor);

					const task = {
						id: String(c.id),
						title: `${setor.cod_setor} ${maquina.cod_maquina} - ${c.cod_chamado}` || "Sem título",
						description: c.descricao_problema || "Sem descrição",
						status: c.estado,
					};

					if (c.estado === "aberto") {
						novasColunas.aberto.push(task);
					} else if (c.estado === "andamento") {
						novasColunas.andamento.push(task);
					} else {
						novasColunas.concluido.push(task);
					}
				});

				setColumns(novasColunas);
			} catch (err) {
				console.error("Erro ao carregar chamados:", err);
			}
		}

		chamadosParaKanban();
	}, [chamados]);

	const columnList = [
		{ id: "aberto", title: "Aberto" },
		{ id: "andamento", title: "Em andamento" },
		{ id: "concluido", title: "Concluído" },
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
		<div className="p-8 min-h-screen bg-muted/40">
			<h1 className="text-2xl font-bold mb-6">
				Kanban de Chamados
			</h1>

			<DndContext
				sensors={sensors}
				collisionDetection={closestCorners}
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
			>
				<div className="flex gap-6">
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
					{activeTask ? <TaskCard task={activeTask} /> : null}
				</DragOverlay>
			</DndContext>
		</div>
	);
}