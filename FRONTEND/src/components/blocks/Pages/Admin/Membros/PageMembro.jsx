"use client"

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { User2, Mail, Phone, Building2, BadgeCheck, PlusCircle } from "lucide-react";
import LoadingPage from "../../../Holders/LoadingPage";
import ErrorPage from "../../../Holders/ErrorPage";
import { useHeader } from "@/context/HeaderContext";
import { API_URL } from "@/lib/api";
import { useEmpresas } from "@/hooks/useEmpresas";
import { useMembros } from "@/hooks/useMembros";

export default function PageMembro() {
    const { id: id_empresa, cod_user } = useParams();

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    // HOOKS

    // EMPRESAS
    const {
        loading: loadingEmpresas, error: errorEmpresas, mensagem: mensagemEmpresas,
        empresa, obterEmpresa,
    } = useEmpresas();

    // MEMBROS
    const {
        loading: loadingMembros, error: errorMembros, mensagem: mensagemMembros,
        membro, obterMembro
    } = useMembros();

    // OBTER EMPRESA
    useEffect(() => {
        if (!empresa) {
            obterEmpresa(id_empresa)
        }
    }, [empresa, obterEmpresa])

    // OBTER MEMBRO
    useEffect(() => {
        if (!membro) {
            obterMembro(id_empresa, cod_user)
        }
    }, [membro, obterMembro]);

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    // CONTEÚDO
    let content;

    // CARREGANDO MEMBRO
    if (loadingMembros.obterMembro && !membro) {
        content = <LoadingPage loadingTitle="Carregando usuário..." loadingSubtitle={[]} />;
    }

    // ERRO AO CARREGAR USUÁRIO
    else if (errorMembros.obterMembro) {
        content = (
            <ErrorPage
                errorTitle="Erro ao carregar usuário"
                errorSubtitle={[
                    "Não foi possível carregar os dados do usuário.",
                    "Tente novamente mais tarde."
                ]}
            />
        );
    }

    // USUÁRIO CARREGADO
    else {
        content = (
            <div className="p-6 space-y-6">

                {/* HEADER CARD */}
                <div className="bg-card border rounded-2xl p-6 flex items-center gap-6">

                    <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center overflow-hidden border">
                        {membro?.foto_perfil ? (
                            <img
                                src={API_URL + `/uploads/imagens/usuarios/${membro.id}/${membro.foto_perfil}`}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <User2 className="text-muted-foreground" size={36} />
                        )}
                    </div>

                    <div className="flex flex-col">
                        <h1 className="text-xl font-bold">{membro?.nome}</h1>

                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                            <BadgeCheck size={16} />
                            {membro?.cargo}
                        </div>

                        <div className="text-xs text-muted-foreground mt-1">
                            {membro?.empresa}
                        </div>
                    </div>

                </div>

                {/* INFOS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div className="bg-card border rounded-xl p-4 flex items-center gap-3">
                        <Mail className="text-muted-foreground" />
                        <div>
                            <p className="text-xs text-muted-foreground">Email</p>
                            <p className="font-medium">{membro?.email}</p>
                        </div>
                    </div>

                    <div className="bg-card border rounded-xl p-4 flex items-center gap-3">
                        <Phone className="text-muted-foreground" />
                        <div>
                            <p className="text-xs text-muted-foreground">Telefone</p>
                            <p className="font-medium">{membro?.telefone}</p>
                        </div>
                    </div>

                    <div className="bg-card border rounded-xl p-4 flex items-center gap-3">
                        <Building2 className="text-muted-foreground" />
                        <div>
                            <p className="text-xs text-muted-foreground">Empresa</p>
                            <p className="font-medium">{membro?.empresa}</p>
                        </div>
                    </div>

                    <div className="bg-card border rounded-xl p-4 flex items-center gap-3">
                        <BadgeCheck className="text-muted-foreground" />
                        <div>
                            <p className="text-xs text-muted-foreground">Status</p>
                            <p className="font-medium">
                                {membro?.status === 1 ? "Ativo" : "Inativo"}
                            </p>
                        </div>
                    </div>

                </div>

                {/* BIO */}
                <div className="bg-card border rounded-xl p-5">
                    <h2 className="font-semibold mb-2">Sobre</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {membro?.bio || "Sem descrição disponível."}
                    </p>
                </div>

                {/* DEBUG (opcional) */}
                {/* <pre>{JSON.stringify(membro, null, 2)}</pre> */}

            </div>
        )
    }

    // HEADER
    const { setHeader } = useHeader();

    useEffect(() => {
        setHeader({
            icon: User2,
            title: `[#${id_empresa}] ${empresa?.nome_fantasia} - Membros da empresa`,
        });
    }, [setHeader, empresa]);

    return content;
}