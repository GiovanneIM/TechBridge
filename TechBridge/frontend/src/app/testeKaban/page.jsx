'use client';

import { useState } from "react";
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

// Componente do cartão de tarefa
function TaskCard({ task, isDragging = false, hideWhenDragging = false }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: dragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || "transform 200ms ease, box-shadow 200ms ease",
    zIndex: dragging ? 50 : "auto",
    opacity: hideWhenDragging && dragging ? 0 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`hover:shadow-md transition-all ${
        dragging ? "scale-105 shadow-lg cursor-grabbing" : "cursor-grab"
      }`}
    >
      <CardContent className="p-4 space-y-3">
        <div className="font-medium">{task.title}</div>
        <p className="text-sm text-muted-foreground">{task.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            <Avatar className="w-6 h-6">
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <Avatar className="w-6 h-6">
              <AvatarFallback>CD</AvatarFallback>
            </Avatar>
          </div>
          <Badge variant="outline">{task.priority}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}

// Componente de coluna droppable
function Column({ columnId, title, tasks, children, isOver }) {
  const { setNodeRef, isOver: droppableOver } = useDroppable({ id: columnId });

  return (
    <div
      ref={setNodeRef}
      className={`w-80 p-2 bg-muted/10 rounded-md min-h-[150px] flex flex-col gap-4 ${
        droppableOver ? "bg-blue-100" : ""
      }`}
      data-column={columnId}
    >
      <div className="font-semibold mb-2">{title} ({tasks.length})</div>
      {children}
    </div>
  );
}

// Componente principal do Kanban
export default function Kanban() {

  // Operações
  const [columns, setColumns] = useState({
    backlog: [
      { id: "1", title: "Integrate Stripe", description: "Compile competitor pages", priority: "High" },
      { id: "2", title: "Redesign homepage", description: "Improve visual design", priority: "Medium" },
    ],
    progress: [
      { id: "3", title: "Database refactoring", description: "Optimize tables", priority: "Medium" },
    ],
    done: [
      { id: "4", title: "CI/CD pipeline", description: "Automate deployments", priority: "High" },
    ],
  });

  // Lista de colunas
  const columnList = [
    { id: "backlog", title: "Em espera" },
    { id: "progress", title: "Em andamento" },
    { id: "done", title: "Finalizados" },
  ];

  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  // Função para encontrar a coluna de um item
  function findColumn(taskId) {
    return Object.keys(columns).find(col => columns[col].some(t => t.id === taskId));
  }

  function handleDragStart(event) {
    const task = columns[findColumn(event.active.id)].find(t => t.id === event.active.id);
    setActiveTask(task);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    setActiveTask(null);
    if (!over) return;

    const activeCol = findColumn(active.id);
    const overId = over.id;

    // Caso o drop seja em uma coluna vazia (droppable)
    if (columns[overId] && activeCol !== overId) {
      const task = columns[activeCol].find(t => t.id === active.id);
      setColumns(prev => ({
        ...prev,
        [activeCol]: prev[activeCol].filter(t => t.id !== active.id),
        [overId]: [...prev[overId], task],
      }));
      return;
    }

    // Drop dentro da mesma coluna ou em outra coluna com items
    const overCol = findColumn(over.id);
    if (!activeCol || !overCol) return;

    const task = columns[activeCol].find(t => t.id === active.id);

    if (activeCol === overCol) {
      const oldIndex = columns[activeCol].findIndex(t => t.id === active.id);
      const newIndex = columns[overCol].findIndex(t => t.id === over.id);
      if (oldIndex !== newIndex) {
        setColumns(prev => ({
          ...prev,
          [activeCol]: arrayMove(prev[activeCol], oldIndex, newIndex),
        }));
      }
    } else {
      setColumns(prev => ({
        ...prev,
        [activeCol]: prev[activeCol].filter(t => t.id !== active.id),
        [overCol]: [...prev[overCol], task],
      }));
    }
  }

  return (
    <div className="p-8 bg-muted/40 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Kanban Board</h1>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-6">
          {columnList.map(col => (
            <Column key={col.id} columnId={col.id} title={col.title} tasks={columns[col.id]}>
              <SortableContext
                items={columns[col.id].map(t => t.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="flex flex-col gap-4">
                  {columns[col.id].map(task => (
                    <TaskCard key={task.id} task={task} hideWhenDragging />
                  ))}
                </div>
              </SortableContext>
            </Column>
          ))}
        </div>

        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} isDragging /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}