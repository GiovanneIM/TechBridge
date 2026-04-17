'use client'

import Link from "next/link";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/AuthContext";
import { useSidebar } from "@/components/ui/sidebar";

import { Settings, User, LogOut, Grid2X2, KanbanSquare, CircleQuestionMark, UserCog2, Warehouse, Siren, Monitor } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ItemSidebar from "./items/itemSidebar";
import Dashboard from "@/app/(user)/gerente/dashboard/page";
import TemaSidebar from "./items/temaSidebar";
import LogoutSidebar from "./items/logoutSidebar";


export default function SidebarBase({ children }) {
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
                {children}
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