'use client'
// LAYOUT PARA PÁGINAS COM USUÁRIO LOGADO - Com header e sidebar

import HeaderUser from "@/components/blocks/Header/HeaderUser";
// import Footer from "@/components/blocks/Footer/page";

import {
	SidebarProvider
} from "@/components/ui/sidebar"
import { useAuth } from "@/context/AuthContext";
import SessionHandler from "@/context/SessionHandler";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function UserLayout({ children }) {
	const router = useRouter()
	const { user, loading, isAuthenticated } = useAuth()

	useEffect(() => {
		if (!loading.perfil && !isAuthenticated) {
			router.replace('/acesso-negado');
		}
	}, [loading.perfil, isAuthenticated]);

    if (loading.perfil) return null;

    if (!isAuthenticated) return null;

	return (
		<div className="w-full">
			<SessionHandler>
				<SidebarProvider>
					<div className="flex flex-col min-h-screen w-full">
						{/* Header */}
						<HeaderUser />

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
