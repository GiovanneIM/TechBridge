import PageDashboard from "@/components/blocks/PageDashboardClient"

export default async function Dashboard() {
	const dashboard = {}
		
	return (
		<PageDashboard dashboardInicial={dashboard}/>
	)
}