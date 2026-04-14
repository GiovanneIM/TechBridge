'use client'

import ErrorPage from '../../HolderPages/ErrorPage';
import LoadingPage from '../../HolderPages/LoadingPage';
import HeaderPage from '../../Header/HeaderPage';

import { useUsers } from "@/hooks/useUsers"

import { UserCog2, RotateCw } from 'lucide-react';

import { CardTecnico } from "../../../card/cardTecnicos/page"

export default function PageTecnicos({
    tecnicosIniciais = []
}) {
    const {
        tecnicos,
        loading,
        error,
    } = useUsers({
        tecnicosIniciais,
        fetchOnMount: tecnicosIniciais.length === 0
    })

    // Verificando se a página está sendo carregada pela primeira vez
    const isFirstLoad = loading.fetch && (tecnicos ?? []).length === 0;

    // Conteúdo da página
    let content;

    // Se estiver sendo carregada pela 1ª vez
    if (isFirstLoad) {
        content = (
            <LoadingPage
                loadingTitle="Carregando Técnicos"
                loadingSubtitle={["Aguarde alguns segundos"]}
            />
        )
    }

    // Se houve erro ao carregar
    else if (error.fetch) {
        content = (
            <ErrorPage
                errorTitle={"Erro ao carregar dashboard"}
                errorSubtitle={[
                    "Houve um erro ao carregar técnicos",
                    "Por favor recarregue a página para tentar novamente"
                ]}
            />
        )
    }

    // Se estiver recarregando os dados
    else if (loading.fetch) {
        content = (<></>)
    }

    // Dados carregados e sem erro
    else {
        content = (<>
            <div className="grid grid-cols-5 w-full h-50 py-5 px-5 gap-5">
                {tecnicos.map((t, i) => (
                    <CardTecnico key={i} nome={t.nome} empresa={t.id_empresa} imagem={t.foto_perfil} email={t.email}></CardTecnico>
                ))}
            </div>
        </>)
    }

    return (
        <div className="flex-1 flex flex-col">
            {/* Header da página */}
            <HeaderPage
                icon={<UserCog2 />}
                title="Tecnicos"
                actions={[
                    loading.fetch
                        ? {
                            icon: <RotateCw />,
                            text: "Carregando",
                            disabled: true,
                        }
                        : {
                            icon: <RotateCw />,
                            text: "Recarregar Técnicos",
                            onClick: () => { },
                        },
                ]}
            />

            {content}
        </div>
    );
}