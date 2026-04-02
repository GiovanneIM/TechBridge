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
import { useSidebar } from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"



export default function HeaderUser() {
    const router = useRouter();
    const pathname = usePathname();

    const { toggleSidebar } = useSidebar()

    // Obtendo o usuário
    const { user, isAuthenticated, logout, loading, setLoading } = useAuth();

    

    // Função de logout
    function fazerLogout() {
        logout()
        setTimeout(() => {
            router.push("/");
            setLoading((prev) => ({ ...prev, logout: false }))
        }, 2000);
    }


    // if (loading.perfil) {
    //     return (
    //         <header className="h-16 flex items-center px-4 border-b">
    //             <div className="animate-pulse h-6 w-40 bg-gray-300 rounded" />
    //         </header>
    //     );
    // }

    return (<>
        <header className="sticky w-full top-0 z-50 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-500 border-b">
            <nav className="px-4 lg:pe-10 py-3 w-full flex flex-wrap justify-between items-center gap-y-4">

                {/* Trigger da sidebar e logo */}
                <div className="flex gap-4">
                    <Button variant="ghost" className="border" onClick={toggleSidebar}>
                        <TextAlignJustify />
                    </Button>

                    {/* LOGO */}
                    <Link
                        href="/dashboard"
                        className="hidden md:flex items-center order-1 w-fit sm:w-1/2 lg:w-auto"
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

                {/* Caso o usuário não esteja logado */}
                {!user && <>
                    <div className="flex items-center gap-2">
                        <div className="flex flex-col gap-2 items-end">
                            <Skeleton className="h-4 w-[150px]" />
                            <Skeleton className="h-4 w-[100px]" />
                        </div>

                        <Skeleton className="size-10 shrink-0 rounded-full" />
                    </div>
                </>}

                {/* Caso o usuário esteja logado */}
                {user && <>
                    {/* Usuário e dropdown de tema e configurações */}
                    <div className="flex items-center gap-4 w-fit lg:w-auto justify-end lg:justify-start order-2 lg:order-3">
                        {/* Usuário */}
                        {user && <div className="flex items-center gap-2">
                            <div className="flex flex-col items-end">
                                <div className="font-bold text-gray-500 dark:text-gray-300 text-md">{user.nome}</div>
                                <div className="font-bold text-gray-500 dark:text-gray-300 text-sm">{user.cargo}</div>
                            </div>

                            <Avatar size="lg">
                                <AvatarImage src={user.foto_perfil} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                        }

                        {/* Tema e configurações */}
                        {/* <DropdownMenu>
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
                        </DropdownMenu> */}
                    </div>
                </>}
            </nav>
        </header >
    </>);
}



