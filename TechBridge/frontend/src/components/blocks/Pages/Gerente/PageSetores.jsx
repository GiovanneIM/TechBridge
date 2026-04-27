"use client";

import ErrorPage from "../../Holders/ErrorPage";
import LoadingPage from "../../Holders/LoadingPage";
import HeaderPage from "../../Header/HeaderPage";

import {
    BriefcaseBusiness,
    Network,
    PaintRoller,
    Warehouse,
    Wrench,
    RotateCw,
} from "lucide-react";
import { Separator } from "../../../ui/separator";
import { useSetores } from "@/hooks/useSetores";

const icones = {
    Wrench: <Wrench className="h-20 w-20" />,
    PaintRoller: <PaintRoller className="h-20 w-20" />,
    BriefcaseBusiness: (
        <BriefcaseBusiness className="h-20 w-20" />
    ),
    Network: <Network className="h-20 w-20" />,
};

export default function PageSetores({
    setoresIniciais
}) {
    const {
        setores,
        loadingSetores,
        errorSetores,
        refetchSetores
    } = useSetores({
        setoresIniciais: setoresIniciais,
        fetchOnMount: setoresIniciais?.length === 0,
    });

    // Verificando se a página está sendo carregada pela primeira vez
    const isFirstLoad = loadingSetores.fetch && (setores ?? []).length === 0;;

    // Conteúdo da página
    let content;

    // Se estiver sendo carregada pela 1ª vez
    if (isFirstLoad) {
        content = (
            <LoadingPage
                loadingTitle="Carregando Setores"
                loadingSubtitle={["Aguarde alguns segundos"]}
            />
        );
    }

    // Se houve erro ao carregar
    else if (errorSetores.fetch) {
        content = (
            <ErrorPage
                errorTitle="Erro ao carregar setores"
                errorSubtitle={[
                    "Houve um erro ao carregar setores",
                    "Por favor recarregue a página para tentar novamente",
                ]}
            />
        );
    }

    // Se estiver recarregando os dados
    else if (loadingSetores.fetch) {
        content = <></>;
    }

    // Dados carregados e sem erro

    else {
        content = (
            <div className="flex-1 flex flex-col">

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
                    {setores.map((setor, i) => (
                        <div
                            key={i}
                            className="
                group rounded-2xl overflow-hidden
                bg-white shadow-sm hover:shadow-2xl
                transition-all duration-300 hover:-translate-y-2
                border border-gray-100 cursor-pointer
              "
                            onClick={() =>
                                (window.location.href = `/setores/${setor.id}`)
                            }
                        >
                            {/* Header do Card */}
                            <div
                                className={`
                  p-6 min-h-[180px] flex flex-col gap-5 ${setor.cor}
                `}
                            >
                                {/* Ícone */}
                                <div>{icones[setor.icone]}</div>

                                {/* Título + Badge */}
                                <div className="flex justify-between items-start">
                                    <h2 className="text-2xl font-bold">
                                        {setor.nome}
                                    </h2>

                                    {setor.badge && (
                                        <span className="bg-white/20 text-xs px-3 py-1 rounded-full">
                                            {setor.badge}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Conteúdo */}
                            <div className="p-6">
                                <p className="text-gray-600">
                                    {setor.descricao}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col">
            <HeaderPage
                icon={Warehouse}
                title="Setores"
                actions={[
                    loadingSetores.fetch
                        ? {
                            icon: <RotateCw />,
                            text: "Carregando",
                            disabled: true,
                        }
                        : {
                            icon: <RotateCw />,
                            text: "Recarregar Setores",
                            onClick: () => refetchSetores(),
                        },
                ]}
            />

            {content}
        </div>
    );
}