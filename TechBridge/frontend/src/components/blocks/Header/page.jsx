"use client"
import * as React from "react"

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
import { TextAlignJustify } from "lucide-react"


export default function Header() {

    const [user, setUser] = React.useState("benoit")
    const [theme, setTheme] = React.useState("system")

    return (<>
        <header>
            <nav className="bg-white border-gray-200 shadow-sm mb-5 px-15 py-2.5 dark:bg-gray-800">
                <div className="flex flex-wrap justify-between items-center mx-auto ">
                    <a href="/" className="flex items-center">
                        <img
                            src="/TechBridge/logo.svg"
                            className="mr-3 h-6 sm:h-9"
                            alt="TechBridge logo"
                        />
                        <span className="self-center flex text-2xl font-semibold whitespace-nowrap dark:text-white">
                            Tech<p className="text-blue-700">Bridge</p>
                        </span>
                    </a>
                    <div className="flex items-center gap-2 lg:order-2">
                        {/* BOTÃO MOBILE */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className={'xl:hidden'} variant="outline"><TextAlignJustify /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>Suporte</DropdownMenuItem>
                                    <DropdownMenuItem>Dashboard</DropdownMenuItem>
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

                        {/* Botão Tema */}
                        <Menubar className="w-auto text-md">
                            <MenubarMenu>
                                <MenubarTrigger>Tema</MenubarTrigger>
                                <MenubarContent>
                                    <MenubarRadioGroup value={theme} onValueChange={setTheme}>
                                        <MenubarRadioItem value="light">Light</MenubarRadioItem>
                                        <MenubarRadioItem value="dark">Dark</MenubarRadioItem>
                                    </MenubarRadioGroup>
                                </MenubarContent>
                            </MenubarMenu>
                        </Menubar>

                        {/* Botão Login */}
                        <Button className={'bg-blue-700 w-35 text-md'}>
                            Entrar
                        </Button>
                    </div>

                    <div
                        className="hidden justify-between items-center w-full xl:flex xl:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >

                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavigationMenu>
                                    <NavigationMenuList>
                                        <NavigationMenuItem>
                                            <NavigationMenuTrigger className={'text-md'}>Serviços de Manutenção</NavigationMenuTrigger>
                                            <NavigationMenuContent className={'w-57'}>
                                                <NavigationMenuLink>Manutenção de Máquina</NavigationMenuLink>
                                                <NavigationMenuLink>Manutenção Preventiva</NavigationMenuLink>
                                                <NavigationMenuLink>Reparo</NavigationMenuLink>
                                            </NavigationMenuContent>
                                        </NavigationMenuItem>
                                    </NavigationMenuList>
                                </NavigationMenu>
                            </li>
                            <li>
                                <Button variant="ghost" className={'text-md'}>
                                    Dashboard
                                </Button>
                            </li>
                            <li>
                                <NavigationMenu>
                                    <NavigationMenuList>
                                        <NavigationMenuItem>
                                            <NavigationMenuTrigger className={'text-md'}>Departamento</NavigationMenuTrigger>
                                            <NavigationMenuContent className={'w-39'}>
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
                                    Suporte
                                </Button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    </>);
}



