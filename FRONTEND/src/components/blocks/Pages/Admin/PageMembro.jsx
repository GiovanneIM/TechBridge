"use client"

import { useEmpresa } from "@/hooks/useEmpresa";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { Cpu, Factory, Siren, User2, Warehouse, Mail, Phone, Building2, BadgeCheck } from "lucide-react";
import HeaderPage from "../../Header/HeaderPage";
import LoadingPage from "../../Holders/LoadingPage";
import ErrorPage from "../../Holders/ErrorPage";
import ButtonNav from "@/components/Sidebar/btn/ButtonNav";

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

    let content = (
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
    )

    return (
        <div className="flex-1 flex flex-col">
            {/* HEADER DA PÁGINA */}
            <div className="z-50 sticky top-[61px]">
                <HeaderPage
                    icon={User2}
                    title={`Usuário (#${id_empresa}) - ${membro?.nome}`}
                />
            </div>

            {/* CONTEÚDO */}
            <div className="flex flex-1 flex-col md:flex-row">

                <div className="
                    z-50 sticky top-[110px] bg-background
                    h-fit md:h-[calc(100vh-110px)] 
                    w-full md:w-fit
                    flex flex-row md:flex-col
                    justify-between md:justify-start
                    border-e-0 border-b md:border-e md:border-b-0
                    p-1 gap-1 
                ">
                    <ButtonNav icon={Factory} label={'Empresa'} href={`/admin/empresas/${id_empresa}`} />
                    <ButtonNav icon={User2} label={'Membros'} href={`/admin/empresas/${id_empresa}/membros`} />
                    <ButtonNav icon={Warehouse} label={'Setores'} href={`/admin/empresas/${id_empresa}/setores`} />
                    <ButtonNav icon={Cpu} label={'Máquina'} href={`/admin/empresas/${id_empresa}/maquinas`} />
                    <ButtonNav icon={Siren} label={'Chamados'} href={`/admin/empresas/${id_empresa}/chamados`} />
                </div>

                <div className="flex-1 flex">
                    {content}
                </div>
            </div>
        </div>
    );
}