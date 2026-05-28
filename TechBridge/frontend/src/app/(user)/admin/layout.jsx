'use client'

// PÁGINAS DE ADMIN

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import {
    Sidebar,
    SidebarContent,
} from "@/components/ui/sidebar";
import SidebarBase from "@/components/Sidebar";
import SidebarNavAdmin from "@/components/Sidebar/nav/navAdmin";




export default function LayoutAdmin({ children }) {
    const router = useRouter()
    const { user, loading } = useAuth()

    // VERIFICANDO SE O USUÁRIO É UM ADMIN
    // useEffect(() => {
    //     if (!loading.perfil && user?.cargo !== "admin") {
    //         router.replace('/permissao-negada');
    //     }
    // }, [user, loading.perfil]);


    // CARREGANDO PERFIL
    // if (loading.perfil) return null;

    // USUÁRIO NÃO É UM ADMIN
    // if (user?.cargo !== "admin") return null;


    // O USUÁRIO É UM ADMIN
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
        <main className=" flex-1 flex border-x justify-center dark:bg-sidebar">
            {children}
        </main>
    </>);
}
