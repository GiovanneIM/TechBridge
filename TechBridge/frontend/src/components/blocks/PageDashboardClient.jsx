'use client';

import { useChamados } from '@/hooks/useChamados';
import { useDashboard } from '@/hooks/useDashboard';

import { ChartAreaInteractive } from "@/components/Dashboard/aaa/chart-area-interactive"
import { DataTable } from "@/components/Dashboard/aaa/data-table"
import { SectionCards } from "@/components/Dashboard/aaa/section-cards"
import { Separator } from "@/components/ui/separator"
import { Grid2X2, RotateCw } from 'lucide-react';

import HeaderPage from './Header/HeaderPage';
import LoadingPage from './HolderPages/LoadingPage';
import ErrorPage from './HolderPages/ErrorPage';
import DashboardContent from '../Dashboard/DashboardContent';
import DashboardSkeleton from '../Dashboard/DashboardSkeleton';

export default function PageDashboard({
	chamadosIniciais,
	dashboardInicial
}) {
	// Obtendo os chamados
	const {
		chamados,
		loading,
		error,
		refetchChamados
	} = useChamados({
		chamadosIniciais: chamadosIniciais,
		fetchOnMount: chamadosIniciais?.length === 0
	})

	// Obtendo o dashboard
	const {
		dashboard,
		loadingDashboard,
		errorDashboard,
		refetchDashboard
	} = useDashboard({
		dashboardInicial: dashboardInicial,
		fetchOnMount: Object.keys(dashboardInicial ?? {}).length === 0
	})

	// Verificando se a página está sendo carregada pela primeira vez
	const isFirstLoad = loadingDashboard && Object.keys(dashboard ?? {}).length === 0;

	// Conteúdo da página
	let content;

	// Se estiver sendo carregada pela 1ª vez
	if (isFirstLoad) {
		content = (
			<LoadingPage
				loadingTitle="Carregando dashboard"
				loadingSubtitle={["Aguarde alguns segundos"]}
			/>
		)
	}

	// Se houve erro ao carregar
	else if (errorDashboard) {
		content = (
			<ErrorPage
				errorTitle={"Erro ao carregar dashboard"}
				errorSubtitle={[
					"Houve um erro ao carregar seu dashboard",
					"por favor recarregue a página para tentar novamente"
				]}
			/>
		)
	}

	// Se estiver recarregando os dados
	else if (loadingDashboard) {
		content = (
			<DashboardSkeleton dashboard={dashboard} chamados={chamados} />
		)
	}

	// Dados carregados e sem erro
	else {
		content = (
			<DashboardContent dashboard={dashboard} chamados={chamados} />
		)
	}


	return (
		<div className="flex-1 flex flex-col">
			{/* Header da página */}
			<HeaderPage
				icon={<Grid2X2 />}
				title="Dashboard"
				actions={[
					loadingDashboard
						? {
							icon: <RotateCw />,
							text: "Carregando",
							disabled: true,
						}
						: {
							icon: <RotateCw />,
							text: "Recarregar Dashboard",
							onClick: () => { refetchDashboard() },
						},
				]}
			/>

			{content}
		</div>
	);

}
