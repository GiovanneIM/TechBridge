'use client'

import ErrorPage from '../../HolderPages/ErrorPage';
import LoadingPage from '../../HolderPages/LoadingPage';
import HeaderPage from '../../Header/HeaderPage';

<<<<<<< HEAD
import { useState } from "react";
import { UserCog2 } from "lucide-react"
import { Separator } from "../../../ui/separator"
import { CardTecnico } from "../../../card/cardTecnicos/page"
=======
>>>>>>> c26aeada050828f443e4bad757ac54cef82c576d
import { useUsers } from "@/hooks/useUsers"
import { Button } from "@/components/ui/button"
import FormMac from "@/components/modal/FormMac/page"
import { Dialog } from "@/components/ui/dialog";

import { UserCog2, RotateCw } from 'lucide-react';

import { CardTecnico } from "../../../card/cardTecnicos/page"

export default function PageTecnicos({
    tecnicosIniciais = []
}) {
<<<<<<< HEAD
    const { tecnicos } = useUsers({
=======
    const {
        tecnicos,
        loading,
        error,
    } = useUsers({
>>>>>>> c26aeada050828f443e4bad757ac54cef82c576d
        tecnicosIniciais,
        fetchOnMount: tecnicosIniciais.length === 0
    })
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="p-3">
                <Button onClick={() => setIsOpen(true)}>
                    Adicionar
                </Button>

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <FormMac />
                </Dialog>
            </div>
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
                errorTitle={"Erro ao carregar técnicos"}
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