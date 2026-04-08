import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/card"

export default function CardsEstados({
    chamadosPorEstados
}) {

    return (
        <div className="
            w-full md:w-1/2 h-fit gap-4 
            grid grid-flow-row grid-cols-1 xl:grid-cols-2
        ">
            <Card className="relative overflow-hidden py-4 gap-0">
                <div className="absolute left-0 top-0 h-full w-2 bg-(--color-aberto)" />

                <CardHeader>
                    <CardTitle className="font-bold text-md h-12">
                        Chamados abertos
                    </CardTitle>
                </CardHeader>

                <CardContent className="text-3xl font-bold">
                    {chamadosPorEstados.aberto ?? 0}
                </CardContent>
            </Card>

            <Card className="relative overflow-hidden py-4 gap-0">
                <div className="absolute left-0 top-0 h-full w-2 bg-(--color-andamento)" />

                <CardHeader>
                    <CardTitle className="font-bold text-md h-12">
                        Chamados em andamento
                    </CardTitle>
                </CardHeader>

                <CardContent className="text-3xl font-bold">
                    {chamadosPorEstados.andamento ?? 0}
                </CardContent>
            </Card>

            <Card className="relative overflow-hidden py-4 gap-0">
                <div className="absolute left-0 top-0 h-full w-2 bg-(--color-concluido)" />

                <CardHeader>
                    <CardTitle className="font-bold text-md h-12">
                        Chamados concluídos
                    </CardTitle>
                </CardHeader>

                <CardContent className="text-3xl font-bold">
                    {chamadosPorEstados.concluido ?? 0}
                </CardContent>
            </Card>
        </div>
    )
}