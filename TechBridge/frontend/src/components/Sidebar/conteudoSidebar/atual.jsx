'use client'

import Link from "next/link";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/context/AuthContext";

import { Moon, Settings, Sun, User, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";


export default function CounteudoSidebar() {
    const router = useRouter();
    const pathname = usePathname();

    const { logout, setLoading } = useAuth()

    const [theme, setTheme] = useState("light");


    // Classe para destacar a opção de navegação ativa
    const nav_active = "bg-techbridge text-white text-md";

    // Função para fazer logout
    function fazerLogout() {
        if (!confirm("Tem certeza que deseja sair?")) return;

        logout()
        setTimeout(() => {
            router.push("/");
        }, 1000);
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
        <div className={`h-full flex flex-col justify-between px-4 transition-all py-4 font-genty`}>
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

            <Separator className="md:hidden my-2" />

            {/* Perfil */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2   text-md w-full hover:bg-techbridge/20 transition-all duration-200 active:scale-95 p-2 rounded">
                    <User size={18} /> <p>Perfil</p>
                </div>
            </div>

            <Separator className="my-2" />

            {/* Navegação */}
            < div className="flex-1 flex flex-col w-full lg:w-auto gap-2">
                <div>
                    <Button
                        variant="ghost" asChild
                        className={`text-md w-full hover:bg-techbridge/20 transition-all duration-200 active:scale-95
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
                        className={`text-md w-full hover:bg-techbridge/20 transition-all duration-200 active:scale-95
                                            ${pathname.startsWith("/kanban") && nav_active}
                                        `}
                    >
                        <Link href={'/painelControle'}>
                            Painel de Controle
                        </Link>
                    </Button>
                </div>

                <div>
                    <Button
                        variant="ghost" asChild
                        className={`text-md w-full hover:bg-techbridge/20 transition-all duration-200 active:scale-95
                                            ${pathname.startsWith("/chamados") && nav_active}
                                        `}
                    >
                        <Link href={'/chamados'}>
                            Chamados
                        </Link>
                    </Button>
                </div>


                <div>
                    <Button
                        variant="ghost" asChild
                        className={`text-md w-full hover:bg-techbridge/20 transition-all duration-200 active:scale-95
                                            ${pathname.startsWith("/setores") && nav_active}
                                        `}
                    >
                        <Link href={'/setores'}>
                            Setores
                        </Link>
                    </Button>
                </div>

                <div>
                    <Button
                        variant="ghost" asChild
                        className={`text-md w-full hover:bg-techbridge/20 transition-all duration-200 active:scale-95
                                            ${pathname.startsWith("/tecnicos") && nav_active}
                                        `}
                    >
                        <Link href={'/tecnicos'}>
                            Tecnicos
                        </Link>
                    </Button>
                </div>

                <div>
                    <Button
                        variant="ghost"
                        className={`text-md w-full hover:bg-techbridge/20 transition-all duration-200 active:scale-95
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

            <Separator className="my-2" />

            {/* Tema */}
            <div>
                {/* <p className="text-muted-foreground font-genty">Tema</p> */}
                <div className="flex flex-col gap-3">
                    {theme === "dark"
                        ? (
                            <div
                                className="flex items-center gap-2   text-md w-full hover:bg-techbridge/20 transition-all duration-200 active:scale-95 p-2 rounded"
                                onClick={() => { setTheme("light") }}
                            >
                                <Sun size={18} /> <p>Claro</p>
                            </div>
                        )
                        : (
                            <div
                                className="flex items-center gap-2   text-md w-full hover:bg-techbridge/20 transition-all duration-200 active:scale-95 p-2 rounded"
                                onClick={() => { setTheme("dark") }}
                            >
                                <Moon size={18} /> <p>Escuro</p>
                            </div>
                        )
                    }


                </div>
            </div>

            <Separator className="my-2" />

            {/* Config e logout */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2   text-md w-full hover:bg-techbridge/20 transition-all duration-200 active:scale-95 p-2 rounded">
                    <Settings size={18} /> Configurações
                </div>

                <div
                    className="
                        text-destructive flex items-center gap-2  text-md w-full 
                        hover:bg-techbridge/20 transition-all duration-200 active:scale-95 p-2 rounded
                        "
                    onClick={fazerLogout}
                >
                    <LogOut size={18} /> Logout
                </div>
            </div>
        </div>
    )
}