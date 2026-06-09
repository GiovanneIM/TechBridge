'use client'

// PÁGINAS DE ADMIN

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import {
    Sidebar,
    SidebarContent,
} from "@/components/ui/sidebar";
import SidebarBase from "@/components/Sidebar";
import SidebarNavAdmin from "@/components/Sidebar/nav/navAdmin";
import { Cpu, Factory, Siren, User2, Warehouse } from "lucide-react";




export default function LayoutAdmin({ children }) {

    return (<>
        {/* Conteúdo */}
        <main className=" flex-1 flex justify-center dark:bg-sidebar">
            {children}
        </main>
    </>);
}
