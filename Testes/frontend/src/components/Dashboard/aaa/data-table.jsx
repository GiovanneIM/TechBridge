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
import { IconDotsVertical, IconGripVertical } from "@tabler/icons-react"
import {
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table"

import { z } from "zod"

import { useIsMobile } from "@/hooks/use-mobile"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

const estados_cores = {
	aberto: "bg-yellow-100 text-yellow-800",
	andamento: "bg-blue-100 text-blue-800",
	concluido: "bg-green-100 text-green-800",
	cancelado: "bg-red-100 text-red-800",
}

export const schema = z.object({
	id: z.number(),
	descricao_problema: z.string(),
	estado: z.string(),
	id_maquina: z.number(),
	datahora_abertura: z.string(),
	operador: z.string(),
})

function DragHandle({ id }) {
	const { attributes, listeners } = useSortable({ id })

	return (
		<Button
			{...attributes}
			{...listeners}
			variant="ghost"
			size="icon"
			className="size-7 text-muted-foreground hover:bg-transparent"
		>
			<IconGripVertical className="size-3 text-muted-foreground" />
		</Button>
	)
}

const columns = [
	{
		id: "drag",
		size: 40,
		header: () => null,
		cell: ({ row }) => <DragHandle id={row.original.id} />,
	},

	{
		id: "select",
		size: 40,
		header: ({ table }) => (
			<div className="flex items-center justify-center">
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && "indeterminate")
					}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				/>
			</div>
		),
		cell: ({ row }) => (
			<div className="flex items-center justify-center">
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
				/>
			</div>
		),
	},

	{
		accessorKey: "id",
		header: "ID",
		size: 90,
		cell: ({ row }) => (
			<div className="font-medium">
				<TableCellViewer item={row.original} type="id" />
			</div>
		),
	},

	{
		accessorKey: "descricao_problema",
		header: "Ocorrência",
		size: 350,
		cell: ({ row }) => (
			<div className="max-w-[350px] truncate">
				<TableCellViewer item={row.original} type="descricao" />
			</div>
		),
	},

	{
		accessorKey: "maquina",
		header: "Máquina",
		size: 130,
		cell: ({ row }) => (
			<Badge variant="outline" className="font-normal">
				{row.original.maquina}
			</Badge>
		),
	},

	{
		accessorKey: "estado",
		header: "Estado",
		size: 120,
		cell: ({ row }) => {
			const color = estados_cores[row.original.estado] || "bg-gray-100 text-gray-700"

			return (
				<Badge className={`capitalize ${color} px-1.5`}>
					{row.original.estado}
				</Badge>
			)
		},
	},

	{
		accessorKey: "datahora_abertura",
		header: "Solicitado",
		size: 160,
		cell: ({ row }) => {
			const data = new Date(row.original.datahora_abertura)

			const formatada = data.toLocaleString("pt-BR", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
				hour: "2-digit",
				minute: "2-digit",
			})

			return (
				<span className="text-sm text-muted-foreground whitespace-nowrap">
					{formatada}
				</span>
			)
		},
	},

	{
		accessorKey: "operador",
		header: "Operador",
		size: 140,
		cell: ({ row }) => <span className="text-sm">{row.original.operador}</span>,
	},

	{
		id: "actions",
		size: 50,
		cell: () => (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon">
						<IconDotsVertical />
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent align="end">
					<DropdownMenuItem>Edit</DropdownMenuItem>
					<DropdownMenuItem>Delete</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		),
	},
]

function DraggableRow({ row }) {
	const { transform, transition, setNodeRef } = useSortable({
		id: row.original.id,
	})

	return (
		<TableRow
			ref={setNodeRef}
			className="hover:bg-muted/50 transition-colors"
			style={{
				transform: CSS.Transform.toString(transform),
				transition,
			}}
		>
			{row.getVisibleCells().map((cell) => (
				<TableCell key={cell.id} className="py-3">
					{flexRender(cell.column.columnDef.cell, cell.getContext())}
				</TableCell>
			))}
		</TableRow>
	)
}

export function DataTable({ data: initialData }) {
	const [data, setData] = React.useState([])

	React.useEffect(() => {
		if (!initialData) return

		const mapped = initialData.map((item) => ({
			...item,
			maquina: `Máquina ${item.id_maquina}`,
			operador: item.operador,
		}))

		setData(mapped)
	}, [initialData])

	const sensors = useSensors(
		useSensor(MouseSensor),
		useSensor(TouchSensor),
		useSensor(KeyboardSensor)
	)

	const dataIds = React.useMemo(() => data.map((d) => d.id), [data])

	const table = useReactTable({
		data,
		columns,
		getRowId: (row) => row.id.toString(),
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	})

	function handleDragEnd(event) {
		const { active, over } = event

		if (active.id !== over.id) {
			setData((items) => {
				const oldIndex = dataIds.indexOf(active.id)
				const newIndex = dataIds.indexOf(over.id)

				return arrayMove(items, oldIndex, newIndex)
			})
		}
	}

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			modifiers={[restrictToVerticalAxis]}
			onDragEnd={handleDragEnd}
		>
			<div className="flex-1 overflow-x-auto rounded-lg border">
				<Table className="min-w-[900px]">
					<TableHeader className="text-xs font-semibold text-muted-foreground">
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead
										key={header.id}
										style={{ width: header.column.columnDef.size }}
									>
										{flexRender(header.column.columnDef.header, header.getContext())}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>

					<TableBody className="[&_tr:nth-child(even)]:bg-muted/30">
						<SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
							{table.getRowModel().rows.map((row) => (
								<DraggableRow key={row.id} row={row} />
							))}
						</SortableContext>
					</TableBody>
				</Table>
			</div>
		</DndContext>
	)
}

function TableCellViewer({ item, type }) {
	const isMobile = useIsMobile()

	const text = type === "id" ? item.id : item.descricao_problema

	return (
		<Drawer direction={isMobile ? "bottom" : "right"}>
			<DrawerTrigger asChild>
				<Button variant="link" className="w-fit px-0 text-left text-foreground">
					{text}
				</Button>
			</DrawerTrigger>

			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Chamado #{item.id}</DrawerTitle>
					<DrawerDescription>Comentário técnico</DrawerDescription>
				</DrawerHeader>

				<div className="flex flex-col gap-4 px-4">
					<div>
						<Label className={"pb-2"}>Ocorrência</Label>
						<Input defaultValue={item.descricao_problema} />
					</div>

					<div>
						<Label className={"pb-2"}>Máquina</Label>
						<Input defaultValue={item.maquina} />
					</div>

					<div>
						<Label className={"pb-2"}>Estado</Label>
						<Input defaultValue={item.estado} />
					</div>

					<div>
						<Label className={"pb-2"}>Data</Label>
						<Input defaultValue={item.datahora_abertura} />
					</div>

					<div>
						<Label className={"pb-2"}>Operador</Label>
						<Input defaultValue={item.operador} />
					</div>
				</div>

				<DrawerFooter>
					<Button>Salvar</Button>

					<DrawerClose asChild>
						<Button variant="outline">Cancelar</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}