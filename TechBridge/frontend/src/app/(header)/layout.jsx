// LAYOUT SECONDÁRIO - COM HEADER

import "../globals.css";

import Header from "@/components/blocks/Header/page";
import Footer from "@/components/blocks/Footer/page";

import {
	SidebarProvider,
	Sidebar,
	SidebarInset,
	SidebarContent,
} from "@/components/ui/sidebar"

export default function RootLayout({ children }) {
	return (
		<div className="w-full">
			<SidebarProvider>
				<div className="flex flex-col min-h-screen w-full">
					{/* Header */}
					<Header />

					<div className="flex flex-1">
						{/* Sidebar */}
						<Sidebar className="top-16 h-[calc(100vh-4rem)] border-r">
							<SidebarContent>
								<div className="p-4 space-y-2">
									<div>Dashboard</div>
									<div>Kanban</div>
									<div>Suporte</div>
								</div>
							</SidebarContent>
						</Sidebar>

						{/* Conteúdo */}
						<main className="flex-1">
							{children}
						</main>
					</div>
				</div>
			</SidebarProvider>
		</div>
	);
}
