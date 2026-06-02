'use client'

// PÁGINAS DE GERENTE

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import {
    Sidebar,
    SidebarContent,
} from "@/components/ui/sidebar"
import SidebarBase from "@/components/Sidebar";
import SidebarNavGerente from "@/components/Sidebar/nav/navGerente";



export default function LayoutGerente({ children }) {
    const router = useRouter()
    const { user, loading } = useAuth()

    // VERIFICANDO SE O USUÁRIO É UM GERENTE
    useEffect(() => {
        if (!loading.perfil && user?.cargo !== "gerente") {
            // router.replace('/permissao-negada');
        }
    }, [user, loading.perfil]);


    // // CARREGANDO PERFIL
    // if (loading.perfil) return null;

    // // USUÁRIO NÃO É UM GERENTE
    // if (user?.cargo !== "gerente") return null;


    // O USUÁRIO É UM GERENTE
    return (<>
        {/* Sidebar */}
        <Sidebar className="top-[61px] h-[calc(100vh-61px)] border-none" collapsible="icon">
            <SidebarContent>
                <SidebarBase suporte={'/gerente'}>
                    <SidebarNavGerente />
                </SidebarBase>
            </SidebarContent>
        </Sidebar>

        {/* Conteúdo */}
        <main className=" flex-1 flex border-x justify-center dark:bg-sidebar">
            {children}
        </main>
    </>);
}
