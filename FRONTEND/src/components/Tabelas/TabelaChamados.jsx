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

import { Eye } from "lucide-react"

export default function TabelaChamados({ chamados, visualizarChamado }) {
    const getEstadoBadge = (estado) => {
        switch (estado) {
            case "aberto":
                return (
                    <Badge className="bg-red-500 text-white w-full">
                        Aberto
                    </Badge>
                )

            case "andamento":
                return (
                    <Badge className="bg-yellow-500 text-white w-full">
                        Andamento
                    </Badge>
                )

            case "concluido":
                return (
                    <Badge className="bg-green-600 text-white w-full">
                        Concluído
                    </Badge>
                )

            default:
                return (
                    <Badge className="bg-gray-600 text-white w-full">
                        {estado}
                    </Badge>
                )
        }
    }

    const formatarData = (data) => {
        if (!data) return "-"

        return new Date(data).toLocaleDateString("pt-BR")
    }

    return (
        <div className="rounded-md border overflow-hidden">
            <Table>
                <TableHeader className="bg-secondary">
                    <TableRow>
                        <TableHead className="text-center">Chamado</TableHead>
                        <TableHead className="text-center">Estado</TableHead>
                        <TableHead className="text-center">Abertura</TableHead>
                        <TableHead className="text-center">Atendimento</TableHead>
                        <TableHead className="text-center">Conclusao</TableHead>
                        <TableHead className="text-center">Técnico</TableHead>
                        <TableHead className="text-center">Ações</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {chamados?.length > 0 ? (
                        chamados.map((chamado) => (
                            <TableRow
                                key={chamado.id}
                                className="cursor-pointer"
                            >
                                <TableCell className="text-center font-semibold">
                                    # {chamado.cod_setor + ' - ' + chamado.cod_maquina + ' - ' + chamado.cod_chamado}
                                </TableCell>

                                <TableCell>
                                    {getEstadoBadge(chamado.estado)}
                                </TableCell>

                                <TableCell className="text-center">
                                    {formatarData(chamado.datahora_abertura)}
                                </TableCell>

                                <TableCell className="text-center">
                                    {formatarData(chamado.datahora_atendimento)}
                                </TableCell>

                                <TableCell className="text-center">
                                    {formatarData(chamado.datahora_conclusao)}
                                </TableCell>

                                <TableCell className="text-center">
                                    {chamado.tecnico_nome ?? '-'}
                                </TableCell>

                                <TableCell className="text-center">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() =>
                                            visualizarChamado(chamado)
                                        }
                                    >
                                        <Eye />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={7}
                                className="
                                    text-center
                                    h-24
                                    text-muted-foreground
                                "
                            >
                                Nenhum chamado encontrado
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}