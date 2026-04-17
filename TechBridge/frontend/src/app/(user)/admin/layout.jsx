'use client'

// LAYOUT PARA PÁGINAS COM USUÁRIO LOGADO - Com header e sidebar

import {
    Sidebar,
    SidebarContent,
} from "@/components/ui/sidebar";
import SidebarBase from "@/components/Sidebar";
import SidebarNavAdmin from "@/components/Sidebar/nav/navAdmin";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



export default function LayoutAdmin({ children }) {
    const router = useRouter()
    const { user, loading } = useAuth()

    useEffect(() => {
        if (!loading.perfil && user?.tipo !== "admin") {
            router.replace('/permissao-negada');
        }
    }, [user, loading.perfil]);

    // Carregando o perfil
    if (loading.perfil) return null;

    // Se não for admin
    if (user?.tipo !== "admin") return null;

    return (<>
        {/* Sidebar */}
        <Sidebar className="top-[61px] h-[calc(100vh-61px)] border-none" collapsible="icon">
            <SidebarContent>
                <SidebarBase>
                    <SidebarNavAdmin />
                </SidebarBase>
            </SidebarContent>
        </Sidebar>

        {/* Conteúdo */}
        <main className=" flex-1 flex border-x">
            {children}
        </main>
    </>);
}
