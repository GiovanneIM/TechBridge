// LAYOUT PARA PÁGINAS COM USUÁRIO LOGADO - Com header e sidebar

import "../globals.css";

import HeaderUser from "@/components/blocks/Header/HeaderUser";
import Footer from "@/components/blocks/Footer/page";

import {
	SidebarProvider,
	Sidebar,
	SidebarContent,
} from "@/components/ui/sidebar"
import CounteudoSidebar from "../../components/Sidebar/sidebarContents";


export default function UserLayout({ children }) {
	return (
		<div className="w-full">
			<SidebarProvider>
				<div className="flex flex-col min-h-screen w-full">
					{/* Header */}
					<HeaderUser />

					<div className="flex flex-1">
						{/* Sidebar */}
						<Sidebar className="top-16 h-[calc(100vh-4rem)] border-none">
							<SidebarContent>
								<CounteudoSidebar />
							</SidebarContent>
						</Sidebar>

						{/* Conteúdo */}
						<main className="flex-1 flex border-x">
							{children}
							{/* <Footer /> */}
						</main>
					</div>
				</div>
			</SidebarProvider>
		</div>
	);
}
