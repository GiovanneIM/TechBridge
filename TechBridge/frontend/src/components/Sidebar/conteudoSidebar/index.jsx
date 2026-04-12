'use client'

import Link from "next/link";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/AuthContext";
import { useSidebar } from "@/components/ui/sidebar";

import { Settings, User, LogOut, Grid2X2, KanbanSquare, CircleQuestionMark, UserCog2, Warehouse, Siren } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ItemSidebar from "./itemSidebar";
import Dashboard from "@/app/(user)/dashboard/page";
import TemaSidebar from "./temaSidebar";
import LogoutSidebar from "./logoutSidebar";


export default function CounteudoSidebar() {
    const pathname = usePathname();

    // Classe para destacar a opção de navegação ativa
    const nav_active = "bg-techbridge text-white text-md";

    return (
        <div className={`h-full flex flex-col justify-between font-genty transition-[width] duration-1000 ease-in-out`}>
            {/* LOGO */}
            <div className="px-2 py-2 md:hidden">
                <Link
                    href="/dashboard"
                    className="flex items-center order-1 w-fit sm:w-1/2 lg:w-auto"
                >
                    <img
                        src="/TechBridge/Logo.svg"
                        className="mr-3 h-6 sm:h-9"
                        alt="TechBridge logo"
                    />
                    <p className="self-center flex text-2xl whitespace-nowrap dark:text-white font-genty">
                        Tech
                        <span className="text-techbridge">Bridge</span>
                    </p>
                </Link>
            </div>

            <Separator className="md:hidden" />

            {/* Perfil */}
            <div className="px-2 py-2 md:px-1 md:py-1">
                <ItemSidebar icon={User} label={"Perfil"} href={"#"} active={pathname.startsWith("#") && nav_active} />
            </div>

            <Separator />

            {/* Navegação */}
            < div className="flex-1 flex flex-col w-full lg:w-auto gap-2 px-2 py-2 md:px-1 md:py-1">
                <ItemSidebar icon={Grid2X2} label={"Dashboard"} href={"/dashboard"} active={pathname.startsWith("/dashboard") && nav_active} />
                <ItemSidebar icon={KanbanSquare} label={"Painel de Controle"} href={"/painelControle"} active={pathname.startsWith("/painelControle") && nav_active} />
                <ItemSidebar icon={Siren} label={"Chamados"} href={"/chamados"} active={pathname.startsWith("/chamados") && nav_active} />
                <ItemSidebar icon={Warehouse} label={"Setores"} href={"/setores"} active={pathname.startsWith("/setores") && nav_active} />
                <ItemSidebar icon={UserCog2} label={"Tecnicos"} href={"/tecnicos"} active={pathname.startsWith("/tecnicos") && nav_active} />
            </div >

            <Separator />

            {/* Tema */}
            <div className="flex flex-col gap-2 px-2 py-2 md:px-1 md:py-1">
                <TemaSidebar />
            </div>

            <Separator />

            {/* Config e logout */}
            <div className="flex flex-col gap-2 px-2 py-2 md:px-1 md:py-1">
                <ItemSidebar icon={CircleQuestionMark} label={"Suporte"} href={"/suporte"} active={pathname.startsWith("/suporte") && nav_active} />
                <ItemSidebar icon={Settings} label={"Configurações"} href={"#"} active={pathname.startsWith("#") && nav_active} />
                <LogoutSidebar/>
            </div>
        </div>
    )
}