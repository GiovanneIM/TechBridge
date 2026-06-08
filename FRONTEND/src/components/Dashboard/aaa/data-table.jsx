'use client'

import * as React from "react"

import {
    DndContext,
    closestCenter,
    MouseSensor,
    TouchSensor,
    KeyboardSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core"

import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable"

import { CSS } from "@dnd-kit/utilities"

import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

import { IconDotsVertical, IconGripVertical } from "@tabler/icons-react"

/* =========================
   ESTADOS
========================= */
const estados = {
    aberto: "bg-yellow-100 text-yellow-800",
    andamento: "bg-blue-100 text-blue-800",
    concluido: "bg-green-100 text-green-800",
}

/* =========================
   DRAG
========================= */
function DragHandle({ id }) {
    const { attributes, listeners } = useSortable({ id })

    return (
        <Button
            {...attributes}
            {...listeners}
            variant="ghost"
            size="icon"
            className="size-7"
        >
            <IconGripVertical className="size-3" />
        </Button>
    )
}

function Row({ row }) {
    const { setNodeRef, transform, transition } = useSortable({
        id: row.original.id.toString(),
    })

    return (
        <TableRow
            ref={setNodeRef}
            style={{
                transform: CSS.Transform.toString(transform),
                transition,
            }}
        >
            {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
            ))}
        </TableRow>
    )
}

/* =========================
   TABLE
========================= */
export function DataTable({ data = [], editarChamado, excluirChamado }) {

    const [rows, setRows] = React.useState([])
    const [editOpen, setEditOpen] = React.useState(false)
    const [editItem, setEditItem] = React.useState(null)

    const [form, setForm] = React.useState({
        estado: "aberto",
        descricao_problema: "",
        solucao_aplicada: "",
        comentario_tecnico: "",
        operador: "",
        id_tecnico: ""
    })

    /* normalize */
    React.useEffect(() => {
        setRows(
            data.map((d) => ({
                ...d,
                maquina: `Máquina ${d.id_maquina}`
            }))
        )
    }, [data])

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor)
    )

    const ids = React.useMemo(
        () => rows.map((r) => r.id.toString()),
        [rows]
    )

    function openEdit(row) {
        setEditItem(row)

        setForm({
            estado: row.estado || "aberto",
            descricao_problema: row.descricao_problema || "",
            solucao_aplicada: row.solucao_aplicada || "",
            comentario_tecnico: row.comentario_tecnico || "",
            operador: row.operador || "",
            id_tecnico: row.id_tecnico || ""
        })

        setEditOpen(true)
    }

    async function handleSave() {
        if (!editItem) return

        const payload = {
            estado: form.estado,
            descricao_problema: form.descricao_problema,
            solucao_aplicada: form.solucao_aplicada,
            comentario_tecnico: form.comentario_tecnico,
            operador: form.operador,
            id_tecnico: form.id_tecnico
        }

        await editarChamado(editItem.id, payload)

        setEditOpen(false)
    }

    const columns = React.useMemo(() => [
        {
            id: "drag",
            cell: ({ row }) => <DragHandle id={row.original.id.toString()} />
        },
        { accessorKey: "id", header: "ID" },

        { accessorKey: "descricao_problema", header: "Ocorrência" },

        {
            accessorKey: "solucao_aplicada",
            header: "Solução aplicada",
            cell: ({ row }) => row.original.solucao_aplicada || "-"
        },

        {
            accessorKey: "comentario_tecnico",
            header: "Comentário técnico",
            cell: ({ row }) => row.original.comentario_tecnico || "-"
        },

        {
            accessorKey: "operador",
            header: "Operador",
            cell: ({ row }) => row.original.operador || "-"
        },

        {
            accessorKey: "maquina",
            header: "Máquina",
        },

        {
            accessorKey: "estado",
            header: "Status",
            cell: ({ row }) => (
                <Badge className={estados[row.original.estado]}>
                    {row.original.estado}
                </Badge>
            )
        },

        {
            id: "actions",
            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <IconDotsVertical />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => openEdit(row.original)}>
                            Editar
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            className="text-red-500"
                            onClick={() => excluirChamado(row.original.id)}
                        >
                            Excluir
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    ], [])

    const table = useReactTable({
        data: rows,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getRowId: (r) => r.id.toString()
    })

    return (
        <>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
            >
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map(hg => (
                            <TableRow key={hg.id}>
                                {hg.headers.map(h => (
                                    <TableCell key={h.id}>
                                        {flexRender(h.column.columnDef.header, h.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        <SortableContext items={ids} strategy={verticalListSortingStrategy}>
                            {table.getRowModel().rows.map(row => (
                                <Row key={row.id} row={row} />
                            ))}
                        </SortableContext>
                    </TableBody>
                </Table>
            </DndContext>

            {/* MODAL */}
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Editar Chamado</DialogTitle>
                    </DialogHeader>

                    <div className="grid grid-cols-2 gap-3">

                        <div className="col-span-2">
                            <label>Status</label>
                            <select
                                className="w-full border p-2 rounded"
                                value={form.estado}
                                onChange={(e) =>
                                    setForm(p => ({ ...p, estado: e.target.value }))
                                }
                            >
                                <option value="aberto">Aberto</option>
                                <option value="andamento">Andamento</option>
                                <option value="concluido">Concluído</option>
                            </select>
                        </div>

                        <div className="col-span-2">
                            <label>Ocorrência</label>
                            <textarea
                                className="w-full border p-2 rounded"
                                value={form.descricao_problema}
                                onChange={(e) =>
                                    setForm(p => ({ ...p, descricao_problema: e.target.value }))
                                }
                            />
                        </div>

                        <div className="col-span-2">
                            <label>Solução Aplicada</label>
                            <textarea
                                className="w-full border p-2 rounded"
                                value={form.solucao_aplicada}
                                onChange={(e) =>
                                    setForm(p => ({ ...p, solucao_aplicada: e.target.value }))
                                }
                            />
                        </div>

                        <div className="col-span-2">
                            <label>Comentário Técnico</label>
                            <textarea
                                className="w-full border p-2 rounded"
                                value={form.comentario_tecnico}
                                onChange={(e) =>
                                    setForm(p => ({ ...p, comentario_tecnico: e.target.value }))
                                }
                            />
                        </div>

                        <div>
                            <label>Operador</label>
                            <Input
                                value={form.operador}
                                onChange={(e) =>
                                    setForm(p => ({ ...p, operador: e.target.value }))
                                }
                            />
                        </div>

                        <div>
                            <label>Técnico ID</label>
                            <Input
                                value={form.id_tecnico}
                                onChange={(e) =>
                                    setForm(p => ({ ...p, id_tecnico: e.target.value }))
                                }
                            />
                        </div>

                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={() => setEditOpen(false)}>
                            Cancelar
                        </Button>
                        <Button onClick={handleSave}>
                            Salvar
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}