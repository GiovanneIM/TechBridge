"use client"

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useEmpresas } from "@/hooks/useEmpresas";
import { useSetores } from "@/hooks/useSetores";
import { useHeader } from "@/context/HeaderContext";
import LoadingPage from "../../../Holders/LoadingPage";
import ErrorPage from "../../../Holders/ErrorPage";
import { API_URL } from "@/lib/api";
import { User2, Mail, Phone, Building2, BadgeCheck, icons, Calendar, Pencil, CheckCircle2, MinusCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
    else if (setor) {
        content = (
            <div className="w-full p-4 flex-1 flex flex-col gap-4">
                {/* CONTROLE */}
                <Card className="
                    w-full border p-4
                    flex justify-between flex-col 2xl:flex-row
                    gap-3
                    overflow-hidden
                ">
                    <div className="flex flex-col sm:flex-row gap-3 font-semibold">
                        <div className="rounded-xl border bg-muted/30 p-3 sm:w-50">
                            <p className="text-sm text-muted-foreground">
                                Status
                            </p>

                            <div className="flex flex-wrap items-center gap-2 font-semibold">
                                {setor.status
                                    ? (<p className="text-green-700 dark:text-green-500">Ativa</p>)
                                    : (<p className="text-red-700 dark:text-red-500">Inativa</p>)
                                }
                            </div>
                        </div>

                        <div className="rounded-xl border bg-muted/30 p-3 sm:w-50">
                            <p className="text-sm text-muted-foreground">
                                Setor registrado em
                            </p>

                            <p className="flex items-center gap-2 font-semibold break-words">
                                <Calendar size={14} />
                                <span>{format(new Date(setor.data_criacao), 'dd/MM/yyyy', { locale: ptBR })} </span>
                            </p>
                        </div>

                        {!setor.status && (
                            <div className="rounded-xl border bg-muted/30 p-3 sm:w-50">
                                <p className="text-sm text-muted-foreground">
                                    Setor desativada em
                                </p>

                                <p className="flex items-center gap-2 font-semibold break-words text-red-700 dark:text-red-500">
                                    <Calendar size={14} />
                                    <span>{format(new Date(setor.data_criacao), 'dd/MM/yyyy', { locale: ptBR })} </span>
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="
                        flex flex-wrap gap-3 items-center
                        rounded-xl
                    ">
                        <Button className="button-background border w-full sm:w-50" asChild>
                            <Link href={`/admin/empresas/${id_empresa}/setores/${cod_setor}/editar`}>
                                <Pencil /> Editar setor
                            </Link>
                        </Button>

                        {!setor.status
                            ? (<Button className="
                                    bg-green-700 hover:bg-green-600
                                    dark:bg-green-600 dark:hover:bg-green-700
                                    text-white
                                    w-full sm:w-50"
                            >
                                <CheckCircle2 /> Reativar setor
                            </Button>)
                            : (<Button className="
                                    bg-red-700 hover:bg-red-600 
                                    dark:bg-red-600 dark:hover:bg-red-700
                                    text-white
                                    w-full sm:w-50"
                            >
                                <MinusCircle /> Desativar setor
                            </Button>)
                        }
                    </div>
                </Card>

                <Card
                    className="
                        w-full border p-5
                        flex flex-col
                        gap-4
                        overflow-hidden
                    "
                    style={{
                        backgroundColor: `#${setor.cor_fundo}`,
                        color: `#${setor.cor_texto}`,
                    }}
                >
                    <div className="flex gap-4">
                        {/* ICONE */}
                        <div
                            className="
                            flex items-center justify-center
                            w-16 h-16 rounded-xl
                            bg-black/10
                            shrink-0
                        "
                        >
                            <Icon size={36} />
                        </div>

                        {/* NOME E CÓDIGO */}
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-col gap-2 font-genty">
                                <h1 className="text-2xl font-bold truncate">
                                    {setor?.nome}
                                </h1>

                                <span
                                    className="
                                    text-xs font-medium
                                    px-2 py-1 rounded-full
                                    bg-black/10
                                    w-fit
                                "
                                >
                                    # {setor?.cod_setor}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* <div>
                        {setor?.descricao && (
                            <p className="mt-2 text-md opacity-90 leading-relaxed">
                                {setor.descricao}
                            </p>
                        )}
                    </div> */}
                </Card>

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