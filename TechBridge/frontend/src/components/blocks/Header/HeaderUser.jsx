"use client"

import Link from "next/link"
import Image from "next/image"

import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/context/AuthContext"

import {
    Button,
} from "@/components/ui/button"
import { TextAlignJustify } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSidebar } from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"



export default function HeaderUser() {
    const { toggleSidebar } = useSidebar()

    // Obtendo o usuário
    const { user } = useAuth();

    return (<>
        <header className="sticky w-full top-0 z-50 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-500 border-b">
            <nav className="px-4 lg:pe-10 py-2 w-full flex flex-wrap justify-between items-center gap-y-4">

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
                            <Skeleton className="h-5 w-[150px]" />
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
                        <div className="flex items-center gap-2">
                            <div className="flex flex-col items-end">
                                <div className="font-genty text-foreground text-md">{user.nome}</div>
                                <div className="font-genty text-muted-foreground text-sm">{user.cargo}</div>
                            </div>

                            <Avatar size="lg">
                                <AvatarImage src={user.foto_perfil} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </>}
            </nav>
        </header >
    </>);
}



