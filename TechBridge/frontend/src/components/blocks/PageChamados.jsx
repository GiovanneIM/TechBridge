"use client"

import { RotateCw, Siren } from "lucide-react";
import { DataTable } from "../Dashboard/aaa/data-table";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useChamados } from "@/hooks/useChamados";

export default function PageChamados({
    chamadosIniciais = []
}) {
    const {
        chamados,
        loadingChamados,
        errorChamados,
        refetchChamados
    } = useChamados({
        chamadosIniciais: chamadosIniciais,
        fetchOnMount: chamadosIniciais?.length === 0
    })

    return (<div className='flex-1 flex flex-col'>
        {/* Header da página */}
        <div
            className="
						flex h-12 shrink-0 items-center gap-2 border-b 
						transition-[width,height] ease-linear 
						group-has-data-[collapsible=icon]/sidebar-wrapper:h-12
					"
        >
            <div className="w-full flex items-center justify-between gap-3 px-4 lg:px-6">
                <div className='flex gap-1 lg:gap-2'>
                    <Siren className="-ml-1" />

                    <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-6" />

                    <h1 className="text-base font-genty">Chamados</h1>
                </div>

                {/* Botão para buscar os chamados novamente */}
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        onClick={() => { refetchChamados({}) }}
                        className="flex items-center border text-muted-foreground"
                    >
                        <RotateCw />
                        <span className="hidden font-medium sm:inline">Recarregar chamados</span>
                    </Button>
                </div>
            </div>
        </div>

        <p>{JSON.stringify(chamados)}</p>

        <div className="flex-1 flex flex-col gap-4 md:gap-6 p-4 lg:px-6  md:py-6">
            <DataTable data={chamados} />
        </div>
    </div>)
}