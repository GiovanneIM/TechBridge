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
import NavigateToTop from "@/components/btnNav/ToTop";
import Image from "next/image";



export default function UserLayout({ children }) {
	const router = useRouter()
	const { loading, error, user, perfil } = useAuth()

	// VERIFICANDO SE HÁ UM USUÁRIO LOGADO
	useEffect(() => {
		if (!loading.perfil && !user) {
			router.replace('/acesso-negado');
		}
	}, [loading.perfil, user, error.perfil]);


	// CARREGANDO PERFIL
	if (loading.perfil) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center gap-8">
				<div className="relative w-fit h-fit">
					<div className="w-40 h-40 -z-10 bg-techbridge absolute top-1/2 left-1/2 -translate-1/2 rounded-full animate-ping"></div>
					<Image
						src="/TechBridge/Logo.svg"
						width={200}
						height={200}
						alt="Logo TechBridge"
						priority
					/>
				</div>

				<div>
					<p className="font-genty text-3xl">Carregando página</p>
					<p className="font-bold text-muted-foreground">Por favor, aguarde alguns instantes</p>
				</div>
			</div>
		)
	}

	// NÃO HÁ USUÁRIO LOGADO
	if (!user) return null;


	// HÁ UM USUÁRIO LOGADO
	return (
		<div className="w-full">
			<NavigateToTop />
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
