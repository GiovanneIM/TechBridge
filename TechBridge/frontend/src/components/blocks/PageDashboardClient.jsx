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
	SidebarTrigger
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from '../ui/button';
import { RotateCw } from 'lucide-react';

export default function PageDashboard({
	chamadosIniciais
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
		<SidebarProvider
			style={
				{
					"--sidebar-width": "calc(var(--spacing) * 72)",
					"--header-height": "calc(var(--spacing) * 12)",
				}
			}
		>
			{/* Sidebar */}
			<AppSidebar variant="inset" className="bg-white dark:bg-gray-800 border-e border-gray-300 dark:border-gray-500" />

			{/* Conteúdo do dashboard */}
			<SidebarInset>
				{/* Header do dashboard */}
				<div
					className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
					<div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
						<SidebarTrigger className="-ml-1" />

						<Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />

						<h1 className="text-base font-bold">Dashboard</h1>

						<div className="ml-auto flex items-center gap-2">

							<Button variant="ghost" className="hidden sm:flex" onClick={() => {refetchChamados()}}>
								<RotateCw className='inline' />
								Recarregar chamados
							</Button>

						</div>
					</div>
				</div>

				{!loading.fetch &&
					<div className="flex flex-1 flex-col">
						<div className="@container/main flex flex-1 flex-col gap-2">
							<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
								{/* Cards */}
								<SectionCards chamados={chamados} />

								{/* Gráfico */}
								<div className="px-4 lg:px-6">
									<ChartAreaInteractive chamados={chamados} />
								</div>

								{/* Tabela */}
								<DataTable data={chamados} />
							</div>
						</div>
					</div>
				}
			</SidebarInset>

		</SidebarProvider>
	</div>)
}
