'use client'

import PageTecnicos from "@/components/blocks/Pages/Gerente/PageTecnicos";
import { useAuth } from "@/context/AuthContext";

export default function Tecnicos() {
    const { user } = useAuth();

    return (
        <PageTecnicos id_empresa={user?.id_empresa}/>
    )
}