"use client"

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useEmpresas } from "@/hooks/useEmpresas";
import { useSetores } from "@/hooks/useSetores";
import { useHeader } from "@/context/HeaderContext";
import LoadingPage from "../../../Holders/LoadingPage";
import ErrorPage from "../../../Holders/ErrorPage";
import { API_URL } from "@/lib/api";
import { User2, Mail, Phone, Building2, BadgeCheck } from "lucide-react";


export default function PageMembro() {
    const { id: id_empresa, cod_setor } = useParams();

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

                {/* DEBUG (opcional) */}
                <pre>{JSON.stringify(setor, null, 2)}</pre>

            </div>
        )
    }

    // HEADER
    const { setHeader } = useHeader();

    useEffect(() => {
        setHeader({
            icon: User2,
            title: `[#${id_empresa}] ${empresa?.nome_fantasia} - [${cod_setor}] ${setor?.nome}`,
        });
    }, [setHeader, empresa, setor]);

    return content;
}