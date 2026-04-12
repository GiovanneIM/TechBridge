"use client"

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/components/ui/sidebar";


import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { LogOut } from "lucide-react";

export default function LogoutSidebar({ href, active }) {
    const router = useRouter();

    const { state } = useSidebar();
    const isCollapsed = state === "collapsed";

    const { logout, setLoading } = useAuth()


    // Função para fazer logout
    function fazerLogout() {
        if (!confirm("Tem certeza que deseja sair?")) return;

        logout()
        setTimeout(() => {
            router.push("/");
        }, 1000);
    }

    const botao = (
        <Button
            variant="ghost"
            onClick={fazerLogout}
            className={`
                w-full h-10 cursor-pointer
                text-md text-destructive
                flex items-center justify-start 
                gap-2 px-3
                transition-all duration-400

                group-data-[collapsible=icon]:gap-0
                group-data-[collapsible=icon]:px-3
                group-data-[collapsible=icon]:aspect-square
                

                ${active && "bg-techbridge text-white"}
            `}
        >
            <LogOut size={18} />

            <span
                className="
                        whitespace-nowrap transition-all duration-400
                        group-data-[collapsible=icon]:opacity-0
                        group-data-[collapsible=icon]:w-0
                        group-data-[collapsible=icon]:overflow-hidden
                    "
            >
                Sair
            </span>
        </Button>
    );

    if (isCollapsed) {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        {botao}
                    </TooltipTrigger>
                    <TooltipContent side="right" className="font-genty text-sm">
                        Sair
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    }

    return botao;
}