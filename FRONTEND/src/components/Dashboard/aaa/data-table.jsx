"use client"

import * as React from "react"
import {
    closestCenter,
    DndContext,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core"

import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable"

import { CSS } from "@dnd-kit/utilities"
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IconDotsVertical, IconGripVertical } from "@tabler/icons-react"
import { useIsMobile } from "@/hooks/hooks2/use-mobile"

/* =========================
   CORES
========================= */
const estados_cores = {
    aberto: "bg-yellow-100 text-yellow-800",
    andamento: "bg-blue-100 text-blue-800",
    concluido: "bg-green-100 text-green-800",
    cancelado: "bg-red-100 text-red-800",
}

/* =========================
   DRAG HANDLE
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

/* =========================
   COLUMNS
========================= */
const columns = [
    {
        id: "drag",
        size: 40,
        cell: ({ row }) => <DragHandle id={row.original.id} />,
    },

    {
        id: "select",
        size: 40,
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(v) => row.toggleSelected(!!v)}
            />
        ),
    },

    {
        accessorKey: "id",
        header: "ID",
    },

    {
        accessorKey: "descricao_problema",
        header: "Ocorrência",
        cell: ({ row }) => (
            <TableCellViewer item={row.original} type="descricao" />
        ),
    },

    {
        accessorKey: "maquina",
        header: "Máquina",
        cell: ({ row }) => (
            <Badge variant="outline">
                {row.original.maquina}
            </Badge>
        ),
    },

    {
        accessorKey: "estado",
        header: "Estado",
        cell: ({ row }) => {
            const color = estados_cores[row.original.estado] || "bg-gray-100"
            return (
                <Badge className={color}>
                    {row.original.estado}
                </Badge>
            )
        },
    },

    {
        accessorKey: "datahora_abertura",
        header: "Data",
        cell: ({ row }) => (
            <span className="text-sm">
                {new Date(row.original.datahora_abertura).toLocaleString("pt-BR")}
            </span>
        ),
    },

    {
        accessorKey: "operador",
        header: "Operador",
    },

    {
        id: "actions",
        cell: () => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <IconDotsVertical />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Editar</DropdownMenuItem>
                    <DropdownMenuItem>Excluir</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
]

/* =========================
   ROW DRAGGABLE
========================= */
function DraggableRow({ row }) {
    const { transform, transition, setNodeRef } = useSortable({
        id: row.original.id,
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
export function DataTable({ data: initialData }) {

    const [data, setData] = React.useState([])

    /* FIX PRINCIPAL */
    React.useEffect(() => {
        if (!Array.isArray(initialData)) {
            setData([])
            return
        }

        const mapped = initialData.map((item) => ({
            ...item,
            maquina: `Máquina ${item.id_maquina}`,
        }))

        setData(mapped)
    }, [initialData])

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor)
    )

    const dataIds = React.useMemo(() => data.map(d => d.id), [data])

    const table = useReactTable({
        data: React.useMemo(() => data, [data]),
        columns,
        getRowId: (row) => row.id.toString(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    function handleDragEnd(event) {
        const { active, over } = event
        if (!over || active.id === over.id) return

        setData((items) => {
            const oldIndex = dataIds.indexOf(active.id)
            const newIndex = dataIds.indexOf(over.id)
            return arrayMove(items, oldIndex, newIndex)
        })
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
        >
            <div className="border rounded-lg overflow-x-auto">

                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <TableHead key={header.id}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
                            {table.getRowModel().rows.map(row => (
                                <DraggableRow key={row.id} row={row} />
                            ))}
                        </SortableContext>
                    </TableBody>

                </Table>
            </div>
        </DndContext>
    )
}

/* =========================
   DRAWER
========================= */
function TableCellViewer({ item }) {
    const isMobile = useIsMobile()

    return (
        <Drawer direction={isMobile ? "bottom" : "right"}>
            <DrawerTrigger asChild>
                <Button variant="link">
                    {item.descricao_problema}
                </Button>
            </DrawerTrigger>

            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Chamado #{item.id}</DrawerTitle>
                </DrawerHeader>

                <div className="p-4 space-y-3">
                    <Input value={item.descricao_problema} readOnly />
                    <Input value={item.maquina} readOnly />
                    <Input value={item.estado} readOnly />
                    <Input value={item.operador} readOnly />
                </div>

                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button variant="outline">Fechar</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}