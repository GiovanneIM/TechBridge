'use client'

import {
    Grid2X2,
    Warehouse,
    SquarePlus,
    MessageCircle,
    Search,
} from "lucide-react";
import ItemSidebar from "../items/itemSidebar";
import ItemColapsavel from "../items/ItemColapsavel";

export default function SidebarNavAdmin() {

    return (<>
        <ItemSidebar icon={Grid2X2} label={"Dashboard"} href={"/admin/dashboard"} />

        <ItemColapsavel icon={Warehouse} label={"Clientes"} lista={listaClientes} />

        <ItemSidebar icon={MessageCircle} label={"Mensagens"} href={"/admin/mensagens"} />
    </>);
}


const listaClientes = [
    {
        icon: Search,
        label: "Procurar",
        url: "/admin/empresas",
    },
    {
        icon: SquarePlus,
        label: "Cadastrar",
        url: "/admin/empresas/cadastrar"
    }
];
