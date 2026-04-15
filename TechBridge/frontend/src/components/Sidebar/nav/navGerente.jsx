'use client'

import {
    Grid2X2,
    KanbanSquare,
    UserCog2,
    Warehouse,
    Siren,
    Monitor
} from "lucide-react";
import ItemSidebar from "../items/itemSidebar";



export default function SidebarNavGerente() {
    return (<>
        <ItemSidebar icon={Grid2X2} label={"Dashboard"} href={"/dashboard"} />
        <ItemSidebar icon={KanbanSquare} label={"Painel de Controle"} href={"/painelControle"} />
        <ItemSidebar icon={Siren} label={"Chamados"} href={"/chamados"} />
        <ItemSidebar icon={Warehouse} label={"Setores"} href={"/setores"} />
        <ItemSidebar icon={Monitor} label={"Maquinas"} href={"/maquinas"} />
        <ItemSidebar icon={UserCog2} label={"Tecnicos"} href={"/tecnicos"} />
    </>);
}
