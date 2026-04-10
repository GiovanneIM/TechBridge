"use client"

import { UserCog2 } from "lucide-react"
import { Separator } from "../ui/separator"
import { CardTecnico } from "../card/cardTecnicos/page"
import { useUsers } from "@/hooks/useUsers"

export default function PageTecnicos({
    tecnicosIniciais = []
}) {
    const {tecnicos} = useUsers({
        tecnicosIniciais,
        fetchOnMount: tecnicosIniciais.length === 0
    })

    return (
        <>
            <div className="grid grid-cols-5 w-full h-50 py-5 px-5 gap-5">
                <CardTecnico></CardTecnico>
            </div>
        </>
    )
}