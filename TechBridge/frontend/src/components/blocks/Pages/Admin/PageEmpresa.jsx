'use client'

import { Warehouse } from "lucide-react";
import HeaderPage from "../../Header/HeaderPage";
import { useParams } from "next/navigation";
import { useEmpresa } from "@/hooks/useEmpresa";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function PageEmpresa() {
    const params = useParams();
    const id_empresa = params.id;

    const {
        empresa, obterEmpresa,
        membros, obterMembros,
        setores, obterSetores
    } = useEmpresa()

    useEffect(() => {
        if (!empresa) obterEmpresa(id_empresa)
    }, [empresa, obterEmpresa])

    useEffect(() => {
        if (!membros) obterMembros(id_empresa)
    }, [membros, obterMembros])

    useEffect(() => {
        if (!setores) obterSetores(id_empresa)
    }, [membros, obterSetores])


    let content;


    if (empresa) {
        content = (<>
            <p>DADOS DA EMPRESA</p>
            <pre>
                {
                    JSON.stringify(empresa, null, 2)
                }
            </pre>

            <Skeleton/>

            <p>INTEGRANTES DA EMPRESA</p>
            <pre>
                {
                    JSON.stringify(membros, null, 2)
                }
            </pre>

            <Skeleton/>

            <p>Setores DA EMPRESA</p>
            <pre>
                {
                    JSON.stringify(setores, null, 2)
                }
            </pre>
        </>)
    }

    return (
        <div className="flex-1 flex flex-col">
            {/* Header da página */}
            <HeaderPage
                icon={Warehouse}
                title="Empresa"
            />

            {content}
        </div>
    );
}