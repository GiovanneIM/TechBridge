'use client'

import { useEmpresa } from "@/hooks/useEmpresa";
import { useParams } from "next/navigation";
import { useEffect } from "react";

import HeaderPage from "../../Header/HeaderPage";

import { Warehouse } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function PageEmpresa() {
    const params = useParams();
    const id_empresa = params.id;

    const {
        loading, error,
        empresa, obterEmpresa,
        membros, obterMembros,
        setores, obterSetores,
        maquinas, obterMaquinas,
    } = useEmpresa()

    useEffect(() => {
        if (!empresa) obterEmpresa(id_empresa)
    }, [empresa, obterEmpresa])

    useEffect(() => {
        if (!membros) obterMembros(id_empresa)
    }, [membros, obterMembros])

    useEffect(() => {
        if (!setores) obterSetores(id_empresa)
    }, [setores, obterSetores])

    useEffect(() => {
        if (!maquinas) obterMaquinas(id_empresa)
    }, [maquinas, obterMaquinas])


    let content;


    if (true) {
        content = (<>
            <div className="p-4 flex-1 flex flex-col gap-4">
                <Card className="
                    w-full border p-4 flex xl:flex-row gap-4
                ">
                    <Image
                        height={320}
                        width={320}
                        src={"/avulsos/600x600.svg"}
                        alt={`Logo empresa ${id_empresa}`}
                    />

                    <div className="w-60 grid grid-rows-4 gap-4">
                        <div>
                            <p className="font-bold text-lg">Razão Social</p>
                            <p className="text-lg">{empresa?.razao_social ?? "Razão social da empresa"}</p>
                        </div>

                        <div>
                            <p className="font-bold text-lg">Nome Fantasia</p>
                            <p className="text-lg">{empresa?.nome_fantasia ?? "Nome fantasia da empresa"}</p>
                        </div>

                        <div>
                            <p className="font-bold text-lg">CNPJ</p>
                            <p className="text-lg">{empresa?.cnpj ?? "0000.0000.0000"}</p>
                        </div>
                    </div>

                    <div className="w-120 grid grid-cols-2 gap-4">
                        <div>
                            <p className="font-bold text-lg">CEP</p>
                            <p className="text-lg">{empresa?.cep ?? "00000-000"}</p>
                        </div>

                        <div>
                            <p className="font-bold text-lg">Rua</p>
                            <p className="text-lg">{empresa?.rua ?? "Rua do endereço"}</p>
                        </div>

                        <div>
                            <p className="font-bold text-lg">Número</p>
                            <p className="text-lg">{empresa?.numero ?? "00"}</p>
                        </div>

                        <div>
                            <p className="font-bold text-lg">Complemento</p>
                            <p className="text-lg">{empresa?.complemento ?? "Complemento"}</p>
                        </div>

                        <div>
                            <p className="font-bold text-lg">Bairro</p>
                            <p className="text-lg">{empresa?.bairro ?? "Bairro do endereço"}</p>
                        </div>

                        <div>
                            <p className="font-bold text-lg">Cidade</p>
                            <p className="text-lg">{empresa?.cidade ?? "Cidade do endereço"}</p>
                        </div>

                        <div>
                            <p className="font-bold text-lg">Estado</p>
                            <p className="text-lg">{empresa?.estado ?? "Estado do endereço"}</p>
                        </div>
                    </div>
                </Card>

                <div className="flex gap-4">
                    <Card className="
                        w-1/2 border p-4 gap-4
                    ">
                        <p className="w-full font-bold text-xl">
                            Integrantes da empresa
                        </p>

                        <Separator />

                        <div>
                            <div className="flex gap-4">
                                <p>0</p>
                                <p>Total de membros</p>
                            </div>
                        </div>

                        <div>
                            <p className="font-semibold text-muted-foreground">Gerente principal</p>
                            <div className="border rounded p-4">

                            </div>
                        </div>

                        <div>
                            <p className="font-semibold text-muted-foreground">Gerentes</p>
                            <div className="border rounded p-4">

                            </div>
                        </div>

                        <div>
                            <p className="font-semibold text-muted-foreground">Técnicos</p>
                            <div className="border rounded p-4">

                            </div>
                        </div>
                    </Card>

                    <Card className="
                        w-1/2 border p-4 flex xl:flex-row gap-4
                    ">

                    </Card>
                </div>
            </div>



            <p>DADOS DA EMPRESA</p>
            <pre>
                {
                    JSON.stringify(empresa, null, 2)
                }
            </pre>

            <Separator />

            <p>INTEGRANTES DA EMPRESA</p>
            <pre>
                {
                    JSON.stringify(membros, null, 2)
                }
            </pre>

            <Separator />

            <p>SETORES DA EMPRESA</p>
            <pre>
                {
                    JSON.stringify(setores, null, 2)
                }
            </pre>

            <Separator />

            <p>MAQUINAS DA EMPRESA</p>
            <pre>
                {
                    JSON.stringify(maquinas, null, 2)
                }
            </pre>
        </>)
    }

    return (
        <div className="flex-1 flex flex-col">
            {/* Header da página */}
            <HeaderPage
                icon={Warehouse}
                title="Empresa"
            />

            {content}
        </div>
    );
}