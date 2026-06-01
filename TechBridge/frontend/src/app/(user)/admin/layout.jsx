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
    useEffect(() => {
        if (!loading.perfil && user?.cargo !== "admin") {
            router.replace(`/permissao-negada`);
        }
    }, [user, loading.perfil]);


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

    // USUÁRIO NÃO É UM ADMIN
    if (user?.cargo !== "admin") return null;


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
