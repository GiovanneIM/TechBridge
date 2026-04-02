'use client'

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation"
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

export default function CounteudoSidebar() {
    const router = useRouter();
    const pathname = usePathname();

    const nav_active = "bg-techbridge text-white font-bold text-md";

    return (<>
        < div className="flex flex-col w-full lg:w-auto" id="mobile-menu-2" >
            {/* <ul className="flex flex-row mt-4 lg:mt-0 font-medium lg:space-x-8 w-full lg:w-auto justify-between"> */}

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

            <div>
                <NavigationMenu className="w-full">
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
            {/* </ul> */}
        </div >
    </>)
}