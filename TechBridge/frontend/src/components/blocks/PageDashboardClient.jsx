'use client';

import { useState, useEffect } from 'react';
import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { useAuth } from '@/hooks/useAuth';
import { useChamados } from '@/hooks/useChamados';

export default function PageDashboardClient() {
    const { token } = useAuth({
        initialUser: null,
        fetchOnMount: true
    })

    const { chamados, refetch } = useChamados({
        token: token,
        initialChamado: null
    })
    useEffect(() => {
        refetch()
    }, [refetch])
    console.log(chamados);

    // const [chamados, setChamados] = useState([])

    /* Carregando as equipes */
    // useEffect(() => {
    //   async function carregarChamados() {
    //     try {
    //       const res = await fetch('http://localhost:3000/api/chamados/buscar', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //           'Authorization': `Bearer ${token()}`
    //         },
    //         body: '{}'
    //       });
    //       const data = await res.json();

    //       if (data.sucesso) {
    //         setChamados(data.dados.chamados);
    //       } else {
    //         console.log(data.mensagem);
    //       }
    //     } catch (err) {
    //       console.error('Erro ao carregar chamados:', err);
    //     }
    //   }

    //   carregarChamados();
    // }, []);


    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                }
            }
        >
            <AppSidebar variant="inset" className="bg-white dark:bg-gray-800 border-e border-gray-300 dark:border-gray-500" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <SectionCards chamados={chamados} />
                            <div className="px-4 lg:px-6">
                                <ChartAreaInteractive chamados={chamados} />
                            </div>
                            <DataTable data={chamados} />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
