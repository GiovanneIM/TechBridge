"use client"

import { useEmpresa } from "@/hooks/useEmpresa";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import HeaderPage from "../../Header/HeaderPage";
import { User2, Mail, Phone, Building2, BadgeCheck } from "lucide-react";
import LoadingPage from "../../Holders/LoadingPage";
import ErrorPage from "../../Holders/ErrorPage";

export default function PageMembro() {
    const { id: id_empresa, cod_user } = useParams();

    const {
        loading,
        error,
        membro,
        obterMembro
    } = useEmpresa();

    useEffect(() => {
        if (!id_empresa || !cod_user) return;
        obterMembro(id_empresa, cod_user);
    }, [id_empresa, cod_user]);

    if (loading.obterMembro && !membro) {
        return <LoadingPage loadingTitle="Carregando usuário..." loadingSubtitle={[]} />;
    }

    if (error.obterMembro) {
        return (
            <ErrorPage
                errorTitle="Erro ao carregar usuário"
                errorSubtitle={[
                    "Não foi possível carregar os dados do usuário.",
                    "Tente novamente mais tarde."
                ]}
            />
        );
    }

    return (
        <div className="flex flex-col flex-1">

            <HeaderPage
                icon={User2}
                title={`Usuário - ${membro?.nome}`}
            />

            <div className="p-6 space-y-6">

                {/* HEADER CARD */}
                <div className="bg-card border rounded-2xl p-6 flex items-center gap-6">

                    <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center overflow-hidden border">
                        {membro?.foto_perfil ? (
                            <img
                                src={`http://localhost:3000/uploads/imagens/usuarios/${membro.id}/${membro.foto_perfil}`}
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
        </div>
    );
}