"use client";

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

    // evita mismatch SSR/CSR
    const [mounted, setMounted] = useState(false);

    const [theme, setTheme] = useState("light");

    // carrega tema do localStorage APENAS no client
    useEffect(() => {
        setMounted(true);

        const savedTheme = localStorage.getItem("theme") ?? "light";
        setTheme(savedTheme);
    }, []);

    // aplica tema no DOM + salva no localStorage
    useEffect(() => {
        if (!mounted) return;

        const root = document.documentElement;

        root.classList.remove("light", "dark", "techbridge");
        root.classList.add(theme);

        localStorage.setItem("theme", theme);
    }, [theme, mounted]);

    function toggleTheme() {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    }

    const botao = (
        <Button
            variant="ghost"
            onClick={toggleTheme}
            className={`
                w-full h-10 cursor-pointer
                text-md
                flex items-center justify-start 
                gap-2 px-3

                group-data-[collapsible=icon]:gap-0
                group-data-[collapsible=icon]:px-3
                group-data-[collapsible=icon]:aspect-square
            `}
        >
            {theme !== "light" ? <Sun size={18} /> : <Moon size={18} />}

            <span
                className="
                    whitespace-nowrap 
                    group-data-[collapsible=icon]:opacity-0
                    group-data-[collapsible=icon]:w-0
                    group-data-[collapsible=icon]:overflow-hidden
                "
            >
                {theme !== "light" ? "Modo claro" : "Modo escuro"}
            </span>
        </Button>
    );

    if (!mounted) return null;

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