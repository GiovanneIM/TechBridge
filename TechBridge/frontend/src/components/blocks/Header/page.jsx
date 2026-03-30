"use client"

import Link from "next/link"

import { useState, useEffect } from "react"

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
    buttonVariants,
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
} from "@/components/ui/dropdown-menu"
import { TextAlignJustify, Sun, Moon, Settings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/hooks/useAuth"




export default function Header() {
    const {
        user
    } = useAuth({
        initialUser: null,
        fetchOnMount: true
    })

    const [theme, setTheme] = useState("light");


    // Controlando o tema
    useEffect(() => {
        const root = document.documentElement;

        root.classList.remove("dark", "techbridge");

        if (theme !== "light") {
            root.classList.add(theme);
        }
    }, [theme]);

    return (<>
        <div className="sticky top-0 z-1000 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-500 border-b">
            <header>
                <nav className="px-15 py-2.5">
                    <div className="flex flex-wrap justify-between items-center mx-auto ">
                        {/* Logo */}
                        <Link href="/" className="flex items-center">
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

                        <div className="flex items-center gap-2 lg:order-2">
                            {/* Dropdown MOBILE*/}
                            {user && <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className={'xl:hidden'} variant="outline"><TextAlignJustify /></Button>
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
                            }

                            {/* Usuário */}
                            {user && <div className="flex items-center gap-2">
                                <div className="font-bold text-gray-500 dark:text-gray-300 text-md">{user.nome}</div>
                                <Avatar size="lg">
                                    <AvatarImage src={user.foto_perfil} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </div>
                            }

                            {/* Tema */}
                            <div>
                                {theme === "dark" && <Button variant="outline" onClick={() => { setTheme("light") }}><Sun /></Button>}
                                {theme === "light" && <Button variant="outline" onClick={() => { setTheme("dark") }}><Moon /></Button>}
                            </div>


                            {/* Configurações */}
                            {user && <div>
                                <Button variant="outline" onClick={() => { setTheme("dark") }}><Settings /></Button>
                            </div>
                            }

                            {/* Botão Login */}
                            {!user && <Button asChild className={'bg-techbridge text-white w-35 font-bold text-md'}>
                                <Link
                                    href='/login'
                                >
                                    Entrar
                                </Link>
                            </Button>
                            }



                        </div>

                        {/* navegação DESKTOP */}
                        {user && <div
                            className="hidden justify-between items-center w-full xl:flex xl:w-auto lg:order-1"
                            id="mobile-menu-2"
                        >

                            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">

                                <li>
                                    <Button variant="ghost" className={'text-md'}>
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
                                    <Button variant="ghost" className={'text-md'}>
                                        Suporte
                                    </Button>
                                </li>
                            </ul>
                        </div>
                        }
                    </div>
                </nav>
            </header>
        </div>

    </>);
}



