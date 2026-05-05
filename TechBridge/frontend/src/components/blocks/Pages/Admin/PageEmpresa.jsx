'use client'

import { Warehouse } from "lucide-react";
import HeaderPage from "../../Header/HeaderPage";
import { useParams } from "next/navigation";
import { useEmpresa } from "@/hooks/useEmpresa";
import { useEffect } from "react";

export default function PageEmpresa() {
    const params = useParams();
    const id_empresa = params.id;

    const {
        empresa, obterEmpresa,
        membros, obterMembros,
    } = useEmpresa()

    useEffect(() => {
        if (!empresa) obterEmpresa(id_empresa)
    }, [empresa, obterEmpresa])

    useEffect(() => {
        if (!membros) obterMembros(id_empresa)
    }, [membros, obterMembros])


    let content;


    if (empresa) {
        content = (<>
            <p>DADOS DA EMPRESA</p>
            <pre>
                {
                    JSON.stringify(empresa, null, 2)
                }
            </pre>

            <p>INTEGRANTES DA EMPRESA</p>
            <pre>
                {
                    JSON.stringify(membros, null, 2)
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