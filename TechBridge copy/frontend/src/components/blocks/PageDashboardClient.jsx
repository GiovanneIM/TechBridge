'use client';

import { useState, useEffect } from 'react';
import { AppSidebar } from "@/components/Dashboard/app-sidebar"
import { ChartAreaInteractive } from "@/components/Dashboard/chart-area-interactive"
import { DataTable } from "@/components/Dashboard/data-table"
import { SectionCards } from "@/components/Dashboard/section-cards"
import { SiteHeader } from "@/components/Dashboard/site-header"
import {
	SidebarInset,
	SidebarProvider,
} from "@/components/ui/sidebar"
import { useAuth } from '@/context/AuthContext';
import { useChamados } from '@/hooks/useChamados';

export default function PageDashboard({
	chamadosIniciais
}) {
	//Obtendo o token
	const { token } = useAuth()

	// Obtendo os chamados
	const { chamados, refetchChamados } = useChamados({
		token: token,
		chamadosIniciais: chamadosIniciais
	})

	useEffect(() => {
		if (!token) return;
		refetchChamados();
	}, [token, refetchChamados]);


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
			</SidebarInset>

		</SidebarProvider>
	</div>)
}
