'use client'

import { useEffect } from 'react';

import { useEmpresa } from '@/hooks/useEmpresa';
import { useAuth } from '@/context/AuthContext';

import ErrorPage from '../../Holders/ErrorPage';
import LoadingPage from '../../Holders/LoadingPage';
import HeaderPage from '../../Header/HeaderPage';

import { RotateCw, Siren } from 'lucide-react';

import { DataTable } from '../../../Dashboard/aaa/data-table';

export default function PageChamados() {

    const { user } = useAuth();

    const {
        loading,
        error,
        chamados,
        obterChamados,
    } = useEmpresa();

    useEffect(() => {
        if (!user?.id_empresa) return;

        if (!chamados) {
            obterChamados(user.id_empresa);
        }
    }, [user?.id_empresa, chamados, obterChamados]);

    const isFirstLoad =
        loading.obterChamados && (!chamados || chamados.length === 0);

    let content;

    if (isFirstLoad) {
        content = (
            <LoadingPage
                loadingTitle="Carregando Chamados"
                loadingSubtitle={["Aguarde alguns segundos"]}
            />
        );
    }

    else if (error.obterChamados) {
        content = (
            <ErrorPage
                errorTitle="Erro ao carregar chamados"
                errorSubtitle={[
                    error.obterChamados,
                    "Recarregue a página para tentar novamente"
                ]}
            />
        );
    }

    else {
        content = (
            <div className='flex-1 flex flex-col'>
                <div className="flex-1 flex flex-col gap-4 md:gap-6 p-4 lg:px-6 md:py-6">
                    <DataTable data={chamados ?? []} />
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col">

            <HeaderPage
                icon={Siren}
                title="Chamados"
                actions={[
                    {
                        icon: <RotateCw />,
                        text: loading.obterChamados ? "Carregando" : "Recarregar",
                        disabled: loading.obterChamados,
                        onClick: () => obterChamados(user?.id_empresa),
                    },
                ]}
            />

            {content}
        </div>
    );
}