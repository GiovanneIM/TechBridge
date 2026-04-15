"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSidebar } from "@/components/ui/sidebar";

import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";



export default function TemaSidebar() {
    const { state } = useSidebar();
    const isCollapsed = state === "collapsed";

    // Controlando o tema
    const [theme, setTheme] = useState("light");
    useEffect(() => {
        const root = document.documentElement;

        root.classList.remove("dark", "techbridge");

        if (theme !== "light") {
            root.classList.add(theme);
        }
    }, [theme]);

    const botao = (
        <Button
            variant="ghost"
            onClick={() => {setTheme(theme !== "light" ? "light" : "dark")}}
            className={`
                w-full h-10 cursor-pointer
                text-md
                flex items-center justify-start 
                gap-2 px-3
                transition-all duration-400

                group-data-[collapsible=icon]:gap-0
                group-data-[collapsible=icon]:px-3
                group-data-[collapsible=icon]:aspect-square
                
            `}
        >
            {theme !== "light" ? <Sun size={18}/> : <Moon size={18}/>}

            <span
                className="
                        whitespace-nowrap transition-all duration-400
                        group-data-[collapsible=icon]:opacity-0
                        group-data-[collapsible=icon]:w-0
                        group-data-[collapsible=icon]:overflow-hidden
                    "
            >
                {theme !== "light" ? "Modo claro" : "Modo escuro"}
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
                        {theme !== "light" ? "Modo claro" : "Modo escuro"}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    }

    return botao;
}