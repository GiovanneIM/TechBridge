"use client"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonRoscaEstados() {

    return (
        <Card className="flex flex-col w-full md:w-1/2" >
            <CardHeader className="items-center pb-0" >
                <CardTitle>Distribuição de chamados por estado </CardTitle>
            </CardHeader>
            
            < CardContent className="flex-1 pb-0" >
                <div className="mx-auto aspect-square max-h-[300px]">
                    <Skeleton className="h-full" />
                </div>
            </CardContent>
        </Card>
    )
}
