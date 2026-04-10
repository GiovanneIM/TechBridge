import { ChartAreaInteractive } from "@/components/Dashboard/aaa/chart-area-interactive"
import { DataTable } from "@/components/Dashboard/aaa/data-table"
import { SectionCards } from "@/components/Dashboard/aaa/section-cards"
import { Separator } from "@/components/ui/separator"

import LinhaUm from './LinhaUm';
import CardsEstados from "./CardsEstados";

import RoscaEstados from './RoscaEstados';
import LinhaEstados from './LinhaEstados';
import { useChamados } from "@/hooks/useChamados";

export default function DashboardContent({ dashboard, chamados }) {

    return (<>
        {/* Linha um */}
        <div className="flex-1 flex flex-col gap-4 p-4 lg:px-6 md:gap-6 md:py-6">
            <LinhaUm dashboard={dashboard} />
        </div>

        <Separator />


        {/* Chamados por estado */}
        <div className="flex-1 flex flex-col gap-4 p-4 lg:px-6 md:gap-6 md:py-6">
            <div className='flex flex-col md:flex-row gap-4'>
                <CardsEstados totalChamados={dashboard.totalChamados} chamadosPorEstados={dashboard.porEstado} />
                <RoscaEstados chamadosPorEstados={dashboard.porEstado ?? []} />
            </div>
        </div>

        <Separator />

        <div className="flex-1 flex flex-col gap-4 p-4 lg:px-6 md:gap-6 md:py-6">
            <div className='flex flex-col md:flex-row gap-4'>
                <LinhaEstados chamadosPorDia={dashboard.chamadosPorDia} />
            </div>
        </div>

        <Separator />

        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 p-4 lg:px-6 md:gap-6 md:py-6">

                    <SectionCards chamados={chamados} />


                    <ChartAreaInteractive chamados={chamados} />


                    <DataTable data={chamados} />
                </div>
            </div>
        </div>
    </>)
}