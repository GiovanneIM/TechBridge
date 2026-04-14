// LAYOUT PARA PÁGINAS COM USUÁRIO LOGADO - Com header e sidebar

import HeaderUser from "@/components/blocks/Header/HeaderUser";
// import Footer from "@/components/blocks/Footer/page";

import {
	SidebarProvider,
	Sidebar,
	SidebarContent,
} from "@/components/ui/sidebar"
import CounteudoSidebar from "../../components/Sidebar/conteudoSidebar";
import SessionHandler from "@/context/SessionHandler";


export default function UserLayout({ children }) {
	return (
		<div className="w-full">
			<SessionHandler>
				<SidebarProvider>
					<div className="flex flex-col min-h-screen w-full">
						{/* Header */}
						<HeaderUser/>

						{/* Sidebar e Conteúdo */}
						<div className="flex flex-1">
							{children}
						</div>
					</div>
				</SidebarProvider>
			</SessionHandler>
		</div>
	);
}
