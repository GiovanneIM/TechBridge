import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/card"

export default function LinhaUm({ dashboard, loading }) {
    function formatarTempo(tempoSegundos) {
        let segundos, minutos, horas;

        segundos = tempoSegundos ?? 0;


        if (segundos >= 3600) {
            horas = Math.floor(segundos / 3600);
            minutos = Math.floor((segundos % 3600) / 60);
            return `${horas}h ${minutos} min`
        }

        if (segundos > 60) {
            minutos = Math.floor(segundos / 60)
            return `${minutos} min`
        }
    }

    return (<>
        <div
            className="
				grid grid-cols-1 gap-4 
                md:grid-cols-2
				xl:grid-cols-4
				dark:*:data-[slot=card]:bg-card
			"
        >
            <Card className="flex justify-between py-4 gap-0">
                <CardHeader>
                    <CardTitle className="font-bold text-md h-12">
                        Total de chamados
                    </CardTitle>
                </CardHeader>

                <CardContent className="text-3xl font-bold">
                    {dashboard.totalChamados}
                </CardContent>
            </Card>


            <Card className="flex justify-between py-4 gap-0">
                <CardHeader>
                    <CardTitle className="font-bold text-md h-12">
                        Tempo médio de espera
                    </CardTitle>
                </CardHeader>

                <CardContent className="text-3xl font-bold">
                    {formatarTempo(dashboard.tempMedioEspera)}
                </CardContent>
            </Card>

            <Card className="flex justify-between py-4 gap-0">
                <CardHeader>
                    <CardTitle className="font-bold text-md h-12">
                        Tempo médio de atendimento
                    </CardTitle>
                </CardHeader>

                <CardContent className="text-3xl font-bold">
                    {formatarTempo(dashboard.tempMedioAtendimento)}
                </CardContent>
            </Card>

            <Card className="flex justify-between py-4 gap-0">
                <CardHeader>
                    <CardTitle className="font-bold text-md h-12">
                        Tempo médio de reparo
                    </CardTitle>
                </CardHeader>

                <CardContent className="text-3xl font-bold">
                    {formatarTempo(dashboard.tempMedioAtendimento)}
                </CardContent>
            </Card>
        </div>
    </>)
}