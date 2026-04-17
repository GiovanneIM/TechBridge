// LAYOUT PARA PÁGINAS COM USUÁRIO LOGADO - Com header e sidebar

import {
    Sidebar,
    SidebarContent,
} from "@/components/ui/sidebar"
import SidebarBase from "@/components/Sidebar";
import SidebarNavGerente from "@/components/Sidebar/nav/navGerente";



export default function LayoutGerente({ children }) {
    return (<>
        {/* Sidebar */}
        <Sidebar className="top-[61px] h-[calc(100vh-61px)] border-none" collapsible="icon">
            <SidebarContent>
                <SidebarBase>
                    <SidebarNavGerente/>
                </SidebarBase>
            </SidebarContent>
        </Sidebar>

        {/* Conteúdo */}
        <main className=" flex-1 flex border-x">
            {children}
        </main>
    </>);
}
