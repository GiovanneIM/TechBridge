"use client"

import Link from "next/link"
import Image from "next/image"

import { useRouter, usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { useAuth } from "@/context/AuthContext"

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
import {
    Button,
} from "@/components/ui/button"
import {
    Menubar,
    MenubarPortal,
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarGroup,
    MenubarSeparator,
    MenubarLabel,
    MenubarItem,
    MenubarShortcut,
    MenubarCheckboxItem,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSub,
    MenubarSubTrigger,
    MenubarSubContent,
} from "@/components/ui/menubar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    DropdownMenuLabel
} from "@/components/ui/dropdown-menu"
import { TextAlignJustify, Sun, Moon, Settings, User, LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



export default function Header() {
    const router = useRouter();
    const pathname = usePathname();

    // Obtendo o usuário
    const { user, logout, loading } = useAuth();

    // Controlando o tema
    const [theme, setTheme] = useState("light");
    useEffect(() => {
        const root = document.documentElement;

        root.classList.remove("dark", "techbridge");

        if (theme !== "light") {
            root.classList.add(theme);
        }
    }, [theme]);

    // Função de logout
    function fazerLogout() {
        logout()
        setTimeout(() => {
            router.push("/");
        }, 2000);
    }

    const nav_active = "bg-techbridge text-white font-bold text-md";

    return (<>
        <header className="block top-0 z-50 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-500 border-b">
            <nav className="px-4 lg:px-10 py-3 w-full flex flex-wrap justify-between items-center gap-y-4">
                {/* LOGO */}
                <Link
                    href={!user ? "/" : "/dashboard"}
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

                {/* Caso o usuário não esteja logado */}
                {!user && <>
                    <div className="order-3 flex gap-4">
                        {/* Botão de Tema */}
                        <div>
                            {theme === "dark" && <Button variant="outline" className="inline" onClick={() => { setTheme("light") }}><Sun /></Button>}
                            {theme === "light" && <Button variant="outline" className="inline" onClick={() => { setTheme("dark") }}><Moon /></Button>}
                        </div>

                        {/* Botão Login */}
                        {!user && <Button asChild className={'bg-techbridge text-white w-35 font-bold text-md'}>
                            <Link href='/login'>Entrar</Link>
                        </Button>
                        }
                    </div>
                </>}

                {/* Caso o usuário esteja logado */}
                {user && <>
                    {/* Navegação */}
                    <div className="order-3 lg:order-2 w-full lg:w-auto">
                        {/* Navegação mobile */}
                        <div className="flex items-center gap-2 sm:hidden">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline"><TextAlignJustify /></Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent>
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>Suporte</DropdownMenuItem>

                                        <DropdownMenuItem><Link href={'/dashboard'}>Dashboard</Link></DropdownMenuItem>

                                        <DropdownMenuSub>
                                            <DropdownMenuSubTrigger>Serviços de Manutenção</DropdownMenuSubTrigger>
                                            <DropdownMenuPortal>
                                                <DropdownMenuSubContent className={'w-auto'}>
                                                    <DropdownMenuItem>Manutenção de Máquina</DropdownMenuItem>
                                                    <DropdownMenuItem>Manutenção Preventiva</DropdownMenuItem>
                                                    <DropdownMenuItem>Reparo</DropdownMenuItem>
                                                </DropdownMenuSubContent>
                                            </DropdownMenuPortal>
                                        </DropdownMenuSub>

                                        <DropdownMenuSub>
                                            <DropdownMenuSubTrigger>Departamento</DropdownMenuSubTrigger>
                                            <DropdownMenuPortal>
                                                <DropdownMenuSubContent>
                                                    <DropdownMenuItem>Ferramentaria</DropdownMenuItem>
                                                    <DropdownMenuItem>RH</DropdownMenuItem>
                                                    <DropdownMenuItem>Pintura</DropdownMenuItem>
                                                </DropdownMenuSubContent>
                                            </DropdownMenuPortal>
                                        </DropdownMenuSub>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        {/* Navegação Desktop */}
                        <div className="hidden sm:flex justify-center items-center w-full lg:w-auto" id="mobile-menu-2">
                            <ul className="flex flex-row mt-4 lg:mt-0 font-medium lg:space-x-8 w-full lg:w-auto justify-between">

                                <li>
                                    <Button
                                        variant="ghost"
                                        className={`text-md 
                                            ${pathname.startsWith("/dashboard") && nav_active}
                                        `}
                                        asChild
                                    >
                                        <Link href={'/dashboard'}>
                                            Dashboard
                                        </Link>
                                    </Button>
                                </li>

                                <li>
                                    <NavigationMenu>
                                        <NavigationMenuList>
                                            <NavigationMenuItem>
                                                <NavigationMenuTrigger className={'text-md'}>Setores</NavigationMenuTrigger>
                                                <NavigationMenuContent className={'w-57'}>
                                                    <NavigationMenuLink>Ferramentaria</NavigationMenuLink>
                                                    <NavigationMenuLink>RH</NavigationMenuLink>
                                                    <NavigationMenuLink>Pintura</NavigationMenuLink>
                                                </NavigationMenuContent>
                                            </NavigationMenuItem>
                                        </NavigationMenuList>
                                    </NavigationMenu>
                                </li>

                                <li>
                                    <Button variant="ghost" className={'text-md'}>
                                        <Link href={'/dashboard'}>
                                            Tecnicos
                                        </Link>
                                    </Button>
                                </li>

                                <li>
                                    <Button
                                        variant="ghost"
                                        className={`text-md 
                                            ${pathname.startsWith("/suporte") && nav_active}
                                        `}
                                        asChild
                                    >
                                        <Link href={'/suporte'}>
                                            Suporte
                                        </Link>
                                    </Button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Usuário e dropdown de tema e configurações */}
                    <div className="flex items-center gap-4 w-full sm:w-1/2 lg:w-auto justify-end lg:justify-start order-2 lg:order-3">
                        {/* Usuário */}
                        {user && <div className="flex items-center gap-2">
                            <div className="font-bold text-gray-500 dark:text-gray-300 text-md">{user.nome}</div>

                            <Avatar size="lg">
                                <AvatarImage src={user.foto_perfil} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                        }

                        {/* Tema e configurações */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline"><TextAlignJustify className="inline" /></Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent className="w-40 mt-4" align="start">
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <User /> Perfil
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>

                                <DropdownMenuSeparator />

                                <DropdownMenuGroup>
                                    <DropdownMenuLabel>Tema</DropdownMenuLabel>
                                    <DropdownMenuItem onClick={() => { setTheme("light") }}>
                                        <Sun /> Claro
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => { setTheme("dark") }}>
                                        <Moon /> Escuro
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>

                                <DropdownMenuSeparator />

                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <Settings /> Configurações
                                    </DropdownMenuItem>

                                    <DropdownMenuItem className="text-[#ff0000]" onClick={fazerLogout}>
                                        <LogOut color="#ff0000" /> Logout
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </>}
            </nav>
        </header>
    </>);
}



