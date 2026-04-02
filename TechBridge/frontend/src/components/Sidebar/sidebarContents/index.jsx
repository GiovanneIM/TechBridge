'use client'

import Link from "next/link";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/context/AuthContext";


import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuContent,
    NavigationMenuTrigger,
    NavigationMenuLink,
    NavigationMenuIndicator,
    NavigationMenuViewport,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Moon, Settings, Sun, TextAlignJustify, User, LogOut } from "lucide-react";
import { Separator } from "@/components/ui/separator";


export default function CounteudoSidebar() {
    const router = useRouter();
    const pathname = usePathname();

    const { logout } = useAuth()

    const [theme, setTheme] = useState("light");


    // Classe para destacar a opção de navegação ativa
    const nav_active = "bg-techbridge text-white text-md";

    // Função para fazer logout
    function fazerLogout() {
        logout()
        setTimeout(() => {
            router.push("/");
            setLoading((prev) => ({ ...prev, logout: false }))
        }, 2000);
    }

    // Controlando o tema
    useEffect(() => {
        const root = document.documentElement;

        root.classList.remove("dark", "techbridge");

        if (theme !== "light") {
            root.classList.add(theme);
        }
    }, [theme]);

    return (
        <div className="h-full flex flex-col justify-between px-4 py-4 font-genty">
            {/* LOGO */}
            <div className="md:hidden">
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

            <Separator className="md:hidden my-3" />


            <div className="flex flex-col px-2 gap-2">
                <div className="flex gap-2">
                    <User /> <p>Perfil</p>
                </div>
            </div>

            <Separator className="my-4" />

            < div className="flex-1 flex flex-col w-full lg:w-auto gap-3">
                <div>
                    <Button
                        variant="ghost" asChild
                        className={`text-md w-full
                                            ${pathname.startsWith("/dashboard") && nav_active}
                                        `}
                    >
                        <Link href={'/dashboard'}>
                            Dashboard
                        </Link>
                    </Button>
                </div>

                <div>
                    <Button
                        variant="ghost" asChild
                        className={`text-md w-full
                                            ${pathname.startsWith("/kanban") && nav_active}
                                        `}
                    >
                        <Link href={'/kanban'}>
                            Kanban
                        </Link>
                    </Button>
                </div>

                <div className="w-full">
                    <NavigationMenu className="w-full max-w-full">
                        <NavigationMenuList className="w-full max-w-full">
                            <NavigationMenuItem className="w-full max-w-full">
                                <NavigationMenuTrigger className={'w-full text-md'}>Setores</NavigationMenuTrigger>
                                <NavigationMenuContent className={'w-57'}>
                                    <NavigationMenuLink>Ferramentaria</NavigationMenuLink>
                                    <NavigationMenuLink>RH</NavigationMenuLink>
                                    <NavigationMenuLink>Pintura</NavigationMenuLink>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div>
                    <Button variant="ghost" className={'text-md w-full'}>
                        <Link href={'/dashboard'}>
                            Tecnicos
                        </Link>
                    </Button>
                </div>

                <div>
                    <Button
                        variant="ghost"
                        className={`text-md w-full
                                            ${pathname.startsWith("/suporte") && nav_active}
                                        `}
                        asChild
                    >
                        <Link href={'/suporte'}>
                            Suporte
                        </Link>
                    </Button>
                </div>
            </div >

            <Separator className="my-4" />

            <div>
                {/* <p className="text-muted-foreground font-genty">Tema</p> */}
                <div className="flex flex-col px-2 gap-3">
                    <div
                        className="flex gap-2"
                        onClick={() => { setTheme("light") }}
                    >
                        <Sun /> <p>Claro</p>
                    </div>
                    <div
                        className="flex gap-2"
                        onClick={() => { setTheme("dark") }}
                    >
                        <Moon /> <p>Escuro</p>
                    </div>
                </div>
            </div>

            <Separator className="my-4" />

            <div className="flex flex-col px-2 gap-3">
                <div className="flex gap-2">
                    <Settings /> Configurações
                </div>

                <div
                    className="text-[#ff0000] flex gap-2"
                    onClick={fazerLogout}
                >
                    <LogOut color="#ff0000" /> Logout
                </div>
            </div>
        </div>
    )
}