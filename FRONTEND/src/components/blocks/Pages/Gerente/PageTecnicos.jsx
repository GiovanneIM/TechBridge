'use client'

import ErrorPage from '../../Holders/ErrorPage';
import LoadingPage from '../../Holders/LoadingPage';
import HeaderPage from '../../Header/HeaderPage';

import { useEffect } from "react";
import { useEmpresa } from "@/hooks/useEmpresa";

import { CardTecnico } from "../../../Cards/cardTecnicos/page";
import ModalNovoTecnico from '@/components/modals/addUser';

import { UserCog2, RotateCw } from 'lucide-react';


export default function PageTecnicos({
    id_empresa,
    tecnicosIniciais = []
}) {
    const {
        membros,
        loading,
        error,
        obterMembros,
    } = useEmpresa();

    useEffect(() => {
        if (id_empresa && tecnicosIniciais.length === 0) {
            obterMembros(id_empresa, { cargo: 'tecnico' });
        }
    }, [id_empresa, obterMembros]);

    const tecnicos = Array.isArray(membros) ? membros : (tecnicosIniciais ?? []);

    // Verificando se a página está sendo carregada pela primeira vez
    const isFirstLoad = loading.obterMembros && tecnicos.length === 0;

    // Conteúdo da página
    let content;

    if (isFirstLoad) {
        content = (
            <LoadingPage
                loadingTitle="Carregando Técnicos"
                loadingSubtitle={["Aguarde alguns segundos"]}
            />
        );
    } else if (error.obterMembros) {
        content = (
            <ErrorPage
                errorTitle={"Erro ao carregar técnicos"}
                errorSubtitle={[
                    "Houve um erro ao carregar técnicos",
                    "Por favor recarregue a página para tentar novamente"
                ]}
            />
        );
    } else {
        content = (
            <>
                <div className="p-3">
                    <ModalNovoTecnico />
                </div>

                <div className="grid grid-cols-5 w-full h-50 py-5 px-5 gap-5">
                    {tecnicos.map((t, i) => (
                        <CardTecnico
                            key={i}
                            nome={t.nome}
                            empresa={t.id_empresa}
                            imagem={t.foto_perfil?.includes('null') ? null : t.foto_perfil}
                            email={t.email}
                        />
                    ))}
                </div>
            </>
        );
    }

    return (
        <div className="flex-1 flex flex-col">
            <HeaderPage
                icon={UserCog2}
                title="Tecnicos"
                actions={[
                    loading.obterMembros
                        ? {
                            icon: <RotateCw />,
                            text: "Carregando",
                            disabled: true,
                        }
                        : {
                            icon: <RotateCw />,
                            text: "Recarregar Técnicos",
                            onClick: () => obterMembros(id_empresa, { cargo: 'tecnico' }),
                        },
                ]}
            />

            {content}
        </div>
    );
}