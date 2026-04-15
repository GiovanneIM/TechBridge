// LAYOUT PARA PÁGINAS COM USUÁRIO LOGADO - Com header e sidebar

import {
    Sidebar,
    SidebarContent,
} from "@/components/ui/sidebar"
import CounteudoSidebar from "@/components/Sidebar/conteudoSidebar";



export default function LayoutGerente({ children }) {
    return (<>
        {/* Sidebar */}
        <Sidebar className="top-[61px] h-[calc(100vh-61px)] border-none" collapsible="icon">
            <SidebarContent>
                <CounteudoSidebar />
            </SidebarContent>
        </Sidebar>

        {/* Conteúdo */}
        <main className=" flex-1 flex border-x">
            {children}
        </main>
    </>);
}
