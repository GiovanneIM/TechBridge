import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonLinhaUm() {
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
                    <Skeleton className="h-9" />
                </CardContent>
            </Card>


            <Card className="flex justify-between py-4 gap-0">
                <CardHeader>
                    <CardTitle className="font-bold text-md h-12">
                        Tempo médio de espera
                    </CardTitle>
                </CardHeader>

                <CardContent className="text-3xl font-bold">
                    <Skeleton className="h-9" />
                </CardContent>
            </Card>

            <Card className="flex justify-between py-4 gap-0">
                <CardHeader>
                    <CardTitle className="font-bold text-md h-12">
                        Tempo médio de atendimento
                    </CardTitle>
                </CardHeader>

                <CardContent className="text-3xl font-bold">
                    <Skeleton className="h-9" />
                </CardContent>
            </Card>

            <Card className="flex justify-between py-4 gap-0">
                <CardHeader>
                    <CardTitle className="font-bold text-md h-12">
                        Tempo médio de reparo
                    </CardTitle>
                </CardHeader>

                <CardContent className="text-3xl font-bold">
                    <Skeleton className="h-9" />
                </CardContent>
            </Card>
        </div>
    </>)
}