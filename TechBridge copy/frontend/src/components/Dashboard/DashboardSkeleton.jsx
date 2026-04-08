import { ChartAreaInteractive } from "@/components/Dashboard/aaa/chart-area-interactive"
import { DataTable } from "@/components/Dashboard/aaa/data-table"
import { SectionCards } from "@/components/Dashboard/aaa/section-cards"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton";


import SkeletonLinhaUm from './LinhaUm/SkeletonLinhaUm';
import SkeletonEstados from './CardsEstados/SkeletonEstados';

import GraficoEstados from './RoscaEstados';
import LinhaEstados from './LinhaEstados';
import SkeletonRoscaEstados from "./RoscaEstados/SkeletonRosca";
import SkeletonLinhaEstados from "./LinhaEstados/SkeletonLinha";

export default function DashboardSkeleton({ dashboard, chamados }) {
    return (<>
        {/* Conteúdo do dashboard */}
        {/* Linha um */}
        <div className="flex-1 flex flex-col gap-4 p-4 lg:px-6 md:gap-6 md:py-6">
            <SkeletonLinhaUm />
        </div>

        <Separator />

        {/* Chamados por estado */}
        <div className="flex-1 flex flex-col gap-4 p-4 lg:px-6 md:gap-6 md:py-6">
            <div className='flex flex-col md:flex-row gap-4'>
                <SkeletonEstados />
                <SkeletonRoscaEstados />
            </div>
        </div>

        <Separator />

        <div className="flex-1 flex flex-col gap-4 p-4 lg:px-6 md:gap-6 md:py-6">
            <div className='flex flex-col md:flex-row gap-4'>
                <SkeletonLinhaEstados />
            </div>
        </div>

        <Separator />


        {/* <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 p-4 lg:px-6 md:gap-6 md:py-6">

                    <SectionCards chamados={chamados} />


                    <ChartAreaInteractive chamados={chamados} />


                    <DataTable data={chamados} />
                </div>
            </div>
        </div> */}
    </>)
}