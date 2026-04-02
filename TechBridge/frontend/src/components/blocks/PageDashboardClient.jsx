'use client';

import { useState, useEffect } from 'react';
import { AppSidebar } from "@/components/dashboardShadcn/app-sidebar"
import { ChartAreaInteractive } from "@/components/dashboardShadcn/chart-area-interactive"
import { DataTable } from "@/components/dashboardShadcn/data-table"
import { SectionCards } from "@/components/dashboardShadcn/section-cards"
import { SiteHeader } from "@/components/dashboardShadcn/site-header"
import {
	SidebarInset,
	SidebarProvider,
} from "@/components/ui/sidebar"
import { useAuth } from '@/context/AuthContext';
import { useChamados } from '@/hooks/useChamados';

export default function PageDashboardClient() {
	//Obtendo o token
	const { token } = useAuth()

	// Obtendo os chamados
	const { chamados, refetchChamados } = useChamados({
		token: token,
		initialChamado: []
	})

	useEffect(() => {
		if (!token) return;
		refetchChamados();
	}, [token, refetchChamados]);


	return (<>
		{/* <SidebarProvider
			style={
				{
					"--sidebar-width": "calc(var(--spacing) * 72)",
					"--header-height": "calc(var(--spacing) * 12)",
				}
			}
		> */}
			{/* Sidebar */}
			{/* <AppSidebar variant="inset" className="bg-white dark:bg-gray-800 border-e border-gray-300 dark:border-gray-500"/> */}

			{/* Conteúdo do dashboard */}
			{/* <SidebarInset>
				<SiteHeader />
				<div className="flex flex-1 flex-col">
					<div className="@container/main flex flex-1 flex-col gap-2">
						<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
							<SectionCards chamados={chamados} />
							<div className="px-4 lg:px-6">
								<ChartAreaInteractive chamados={chamados} />
							</div>
							<DataTable data={chamados} />
						</div>
					</div>
				</div>
			</SidebarInset> */}

		{/* </SidebarProvider> */}
	</>)
}
