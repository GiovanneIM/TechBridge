'use client';

import { useState, useEffect } from 'react';
import { useChamados } from '@/hooks/useChamados';


import { AppSidebar } from "@/components/Dashboard/app-sidebar"
import { ChartAreaInteractive } from "@/components/Dashboard/chart-area-interactive"
import { DataTable } from "@/components/Dashboard/data-table"
import { SectionCards } from "@/components/Dashboard/section-cards"
import {
	SidebarInset,
	SidebarProvider,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from '../ui/button';
import { Grid2X2, RotateCw } from 'lucide-react';
import { GraficoEstados } from '../Dashboard/teste/pieChart';
import ChamadosCard from '../Dashboard/teste/ChamadosCard';
import LinhaUm from '../Dashboard/teste/LinhaUm';
import { GraficoLinha } from '../Dashboard/teste/GraficoLinha';

export default function PageDashboard({
	chamadosIniciais,
	dashboard
}) {
	// Obtendo os chamados
	const {
		chamados,
		loading,
		error,
		refetchChamados
	} = useChamados({
		chamadosIniciais: chamadosIniciais
	})

	return (<div>
		{/* Header do dashboard */}
		<div
			className="
						flex h-12 shrink-0 items-center gap-2 border-b 
						transition-[width,height] ease-linear 
						group-has-data-[collapsible=icon]/sidebar-wrapper:h-12
					"
		>
			<div className="w-full flex items-center justify-between gap-3 px-4 lg:px-6">
				<div className='flex gap-1 lg:gap-2'>
					<Grid2X2 />

					<Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-6" />

					<h1 className="text-base font-genty">Dashboard</h1>
				</div>

				{/* Botão para buscar os chamados novamente */}
				<div className="flex items-center gap-2">
					<Button
						variant="ghost"
						onClick={() => { refetchChamados() }}
						className="flex items-center border text-muted-foreground"
					>
						<RotateCw />
						<span className="hidden font-medium sm:inline">Recarregar chamados</span>
					</Button>
				</div>
			</div>
		</div>

		{/* <div>{JSON.stringify(dashboard)}</div> */}

		<Separator />

		{/* Conteúdo do dashboard */}
		{!loading.fetch && <>
			<div className="flex-1 flex flex-col gap-4 p-4 lg:px-6 md:gap-6 md:py-6">
				<LinhaUm dashboard={dashboard} />
			</div>

			<Separator />

			<div className="flex-1 flex flex-col gap-4 p-4 lg:px-6 md:gap-6 md:py-6">
				{/* Chamados por estado */}
				<div className='flex flex-col md:flex-row gap-4'>
					<ChamadosCard totalChamados={dashboard.totalChamados} chamadosPorEstados={dashboard.porEstado} />
					<GraficoEstados chamadosPorEstados={dashboard.porEstado} />
				</div>
			</div>

			<Separator />

			<div className="flex-1 flex flex-col gap-4 p-4 lg:px-6 md:gap-6 md:py-6">
				<GraficoLinha chamadosPorDia={dashboard.chamadosPorDia} />
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
		</>}
	</div >)
}
