'use client'

import ErrorPage from '../../HolderPages/ErrorPage';
import LoadingPage from '../../HolderPages/LoadingPage';
import HeaderPage from '../../Header/HeaderPage';

import { Grid2X2, RotateCw } from 'lucide-react';


export default function PageMaquinas({
    maquinas
}) {
    const loadingMaquinas = false;
    const errorMaquinas = false;

    // Verificando se a página está sendo carregada pela primeira vez
    const isFirstLoad = loadingMaquinas && (maquinas ?? []).length === 0;

    // Conteúdo da página
    let content;

    // Se estiver sendo carregada pela 1ª vez
    if (isFirstLoad) {
        content = (
            <LoadingPage
                loadingTitle="Carregando Máquinas"
                loadingSubtitle={["Aguarde alguns segundos"]}
            />
        )
    }

    // Se houve erro ao carregar
    else if (errorMaquinas) {
        content = (
            <ErrorPage
                errorTitle={"Erro ao carregar máquinas"}
                errorSubtitle={[
                    "Houve um erro ao carregar máquinas",
                    "Por favor recarregue a página para tentar novamente"
                ]}
            />
        )
    }

    // Se estiver recarregando os dados
    else if (loadingMaquinas) {
        content = (<></>)
    }

    // Dados carregados e sem erro
    else {
        content = (<></>)
    }


    return (
        <div className="flex-1 flex flex-col">
            {/* Header da página */}
            <HeaderPage
                icon={Grid2X2}
                title="Maquinas"
                actions={[
                    loadingMaquinas
                        ? {
                            icon: <RotateCw />,
                            text: "Carregando",
                            disabled: true,
                        }
                        : {
                            icon: <RotateCw />,
                            text: "Recarregar Maquinas",
                            onClick: () => { },
                        },
                ]}
            />

            {content}
        </div>
    );

}
