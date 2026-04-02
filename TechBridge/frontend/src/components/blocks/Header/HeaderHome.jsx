"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

import {
    Button,
} from "@/components/ui/button"

import { Sun, Moon } from "lucide-react"

export default function HeaderHome() {

    // Controlando o tema
    const [theme, setTheme] = useState("light");
    useEffect(() => {
        const root = document.documentElement;

        root.classList.remove("dark", "techbridge");

        if (theme !== "light") {
            root.classList.add(theme);
        }
    }, [theme]);

    return (<>
        <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-500 border-b">
            <nav className="px-4 lg:px-10 py-3 w-full flex flex-wrap justify-between items-center gap-y-4">

                <div className="flex gap-4">
                    {/* LOGO */}
                    <Link
                        href={"/"}
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

                {/* Tema e login */}
                <div className="order-3 flex gap-4">
                    {/* Botão de Tema */}
                    <div>
                        {theme === "dark" && <Button variant="outline" className="inline" onClick={() => { setTheme("light") }}><Sun /></Button>}
                        {theme === "light" && <Button variant="outline" className="inline" onClick={() => { setTheme("dark") }}><Moon /></Button>}
                    </div>

                    {/* Botão Login */}
                    <Button asChild className={'bg-techbridge text-white w-35 font-bold text-md'}>
                        <Link href='/login'>Entrar</Link>
                    </Button>
                </div>
            </nav>
        </header>
    </>);
}



