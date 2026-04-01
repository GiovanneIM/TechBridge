import PageDashboard from "@/components/blocks/PageDashboardClient"
// import { cookies } from "next/headers"

export default async function Dashboard() {
	// const cookieStore = await cookies();
	// const token = cookieStore.get('token')?.value;

	// console.log("Token SSR: " + token);
	
	return (
		<PageDashboard/>
	)
}