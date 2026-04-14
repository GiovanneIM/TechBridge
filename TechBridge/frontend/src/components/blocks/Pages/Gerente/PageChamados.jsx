"use client"

import ErrorPage from '../../HolderPages/ErrorPage';
import LoadingPage from '../../HolderPages/LoadingPage';
import HeaderPage from '../../Header/HeaderPage';

import { RotateCw, Siren } from "lucide-react";
import { DataTable } from "../../../Dashboard/aaa/data-table";
import { Separator } from "../../../ui/separator";
import { Button } from "../../../ui/button";
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

    // Verificando se a página está sendo carregada pela primeira vez
    const isFirstLoad = loadingChamados.fetch && (chamados ?? []).length === 0;

    // Conteúdo da página
    let content;

    // Se estiver sendo carregada pela 1ª vez
    if (isFirstLoad) {
        content = (
            <LoadingPage
                loadingTitle="Carregando Chamados"
                loadingSubtitle={["Aguarde alguns segundos"]}
            />
        )
    }

    // Se houve erro ao carregar
    else if (errorChamados.fetch) {
        content = (
            <ErrorPage
                errorTitle={"Erro ao carregar chamados"}
                errorSubtitle={[
                    "Houve um erro ao carregar chamados",
                    "Por favor recarregue a página para tentar novamente"
                ]}
            />
        )
    }

    // Se estiver recarregando os dados
    else if (loadingChamados.fetch) {
        content = (<></>)
    }

    // Dados carregados e sem erro
    else {
        content = (<div className='flex-1 flex flex-col'>

            {/* <p>{JSON.stringify(chamados)}</p> */}

            <div className="flex-1 flex flex-col gap-4 md:gap-6 p-4 lg:px-6  md:py-6">
                <DataTable data={chamados} />
            </div>
        </div>)
    }

    return (
        <div className="flex-1 flex flex-col">
            {/* Header da página */}
            <HeaderPage
                icon={<Siren />}
                title="Chamados"
                actions={[
                    loadingChamados.fetch
                        ? {
                            icon: <RotateCw />,
                            text: "Carregando",
                            disabled: true,
                        }
                        : {
                            icon: <RotateCw />,
                            text: "Recarregar Chamados",
                            onClick: () => { refetchChamados() },
                        },
                ]}
            />

            {content}
        </div>
    );
}