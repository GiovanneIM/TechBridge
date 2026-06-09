import PageDashboard from "@/components/blocks/Pages/Gerente/PageDashboard";

export default async function Dashboard() {
	// aqui você pode futuramente buscar no backend
	const dashboardInicial = null;

	return (
		<PageDashboard dashboardInicial={dashboardInicial} />
	);
}