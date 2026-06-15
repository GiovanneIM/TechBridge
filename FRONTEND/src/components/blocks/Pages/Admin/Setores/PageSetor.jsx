"use client"

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useEmpresas } from "@/hooks/useEmpresas";
import { useSetores } from "@/hooks/useSetores";
import { useHeader } from "@/context/HeaderContext";
import LoadingPage from "../../../Holders/LoadingPage";
import ErrorPage from "../../../Holders/ErrorPage";
import { API_URL } from "@/lib/api";
import { User2, Mail, Phone, Building2, BadgeCheck, icons } from "lucide-react";


export default function PageMembro() {
    const { id: id_empresa, cod_setor } = useParams();
    let Icon = icons['Warehouse'];

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    // HOOKS

    // EMPRESAS
    const {
        loading: loadingEmpresas, error: errorEmpresas, mensagem: mensagemEmpresas,
        empresa, obterEmpresa,
    } = useEmpresas();

    // SETORES
    const {
        loading: loadingSetores, error: errorSetores, mensagem: mensagemSetores,
        setor, obterSetor
    } = useSetores();

    // OBTER EMPRESA
    useEffect(() => {
        if (!empresa) {
            obterEmpresa(id_empresa)
        }
    }, [empresa, obterEmpresa])

    // OBTER SETOR
    useEffect(() => {
        if (!setor) {
            obterSetor(id_empresa, cod_setor)
        }
    }, [setor, obterSetor]);

    useEffect(() => {
        if (setor) {
            Icon = icons[setor.icone]
        }
    }, [setor]);

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    // CONTEÚDO
    let content;

    // CARREGANDO SETOR
    if (loadingSetores.obterMembro && !membro) {
        content = <LoadingPage loadingTitle="Carregando setor..." loadingSubtitle={[]} />;
    }

    // ERRO AO CARREGAR SETOR
    else if (errorSetores.obterMembro) {
        content = (
            <ErrorPage
                errorTitle="Erro ao carregar setor"
                errorSubtitle={[
                    "Não foi possível carregar os dados do setor.",
                    "Tente novamente mais tarde."
                ]}
            />
        );
    }

    // SETOR CARREGADO
    else {
        content = (
            <div className="p-6 space-y-6">
                {/* HEADER CARD */}
                <div className="bg-card border rounded-2xl p-6 flex items-center gap-6">

                    <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center overflow-hidden border">
                        <Icon className="text-muted-foreground" size={36} />
                    </div>

                    <div className="flex flex-col">
                        <h1 className="text-xl font-bold">{setor?.nome}</h1>

                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                            <BadgeCheck size={16} />
                            {setor?.cod_setor}
                        </div>

                        <div className="text-xs text-muted-foreground mt-1">
                            {/* {membro?.empresa} */}
                        </div>
                    </div>

                </div>

                {/* DEBUG (opcional) */}
                {/* <pre>{JSON.stringify(setor, null, 2)}</pre> */}

            </div>
        )
    }

    // HEADER
    const { setHeader } = useHeader();

    useEffect(() => {
        setHeader({
            icon: User2,
            title: `[${id_empresa}] ${empresa?.nome_fantasia} - [${cod_setor}] ${setor?.nome}`,
        });
    }, [setHeader, empresa, setor]);

    return content;
}