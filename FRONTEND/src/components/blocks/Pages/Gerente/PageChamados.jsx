'use client'

import { useEffect } from 'react'

import { useEmpresa } from '@/hooks/useEmpresa'
import { useAuth } from '@/context/AuthContext'

import ErrorPage from '../../Holders/ErrorPage'
import LoadingPage from '../../Holders/LoadingPage'
import HeaderPage from '../../Header/HeaderPage'

import { RotateCw, Siren } from 'lucide-react'

import { DataTable } from '../../../Dashboard/aaa/data-table'

export default function PageChamados() {
    const { user } = useAuth()

    const {
        loading,
        error,
        chamados,
        obterChamados,
        editarChamado,
        excluirChamado,
    } = useEmpresa()

    useEffect(() => {
        if (!user?.id_empresa) return
        obterChamados(user.id_empresa)
    }, [user?.id_empresa])

    const isFirstLoad =
        loading.obterChamados &&
        (!chamados || chamados.length === 0)

    return (
        <div className="flex-1 flex flex-col">
            <HeaderPage
                icon={Siren}
                title="Chamados"
                actions={[
                    {
                        icon: <RotateCw />,
                        text: loading.obterChamados
                            ? 'Carregando'
                            : 'Recarregar',
                        disabled: loading.obterChamados,
                        onClick: () =>
                            user?.id_empresa &&
                            obterChamados(user.id_empresa),
                    },
                ]}
            />

            {isFirstLoad ? (
                <LoadingPage
                    loadingTitle="Carregando Chamados"
                    loadingSubtitle={[
                        'Buscando chamados da empresa...',
                    ]}
                />
            ) : error.obterChamados ? (
                <ErrorPage
                    errorTitle="Erro ao carregar chamados"
                    errorSubtitle={[error.obterChamados]}
                />
            ) : (
                <div className="p-4">
                    <DataTable
                        data={chamados ?? []}
                        editarChamado={editarChamado}
                        excluirChamado={excluirChamado}
                    />
                </div>
            )}
        </div>
    )
}