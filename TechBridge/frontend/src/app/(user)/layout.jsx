'use client'

// LAYOUT DE USUÁRIO LOGADO

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import SessionHandler from "@/context/SessionHandler";

import HeaderUser from "@/components/blocks/Header/HeaderUser";
import {
	SidebarProvider
} from "@/components/ui/sidebar"



export default function UserLayout({ children }) {
	const router = useRouter()
	const { loading, isAuthenticated } = useAuth()

    // VERIFICANDO SE HÁ UM USUÁRIO LOGADO
	// useEffect(() => {
	// 	if (!loading.perfil && !isAuthenticated) {
	// 		router.replace('/acesso-negado');
	// 	}
	// }, [loading.perfil, isAuthenticated]);


	// CARREGANDO PERFIL
    if (loading.perfil) return null;

	// NÃO HÁ USUÁRIO LOGADO
    if (!isAuthenticated) return null;


	// HÁ UM USUÁRIO LOGADO
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
