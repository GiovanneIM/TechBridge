'use client'

import { Warehouse } from "lucide-react";
import HeaderPage from "../../Header/HeaderPage";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function PageEmpresasAdd() {
    const [empresa, setEmpresa] = useState({
        razao_social: '',
        nome_fantasia: '',
        cnpj: '',
        endereco: {
            cep: '',
            rua: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
            estado: '',
        }
    })
    const [gerente, setGerente] = useState({
        nome: '',
        email: '',
    })

    let content;

    content = (<>
        <div className="p-4 lg:p-6">
            <div className="flex flex-col bg-secondary p-2 w-lg justify-center rounded gap-3">

                <div className="grid grid-cols-2 gap-1">
                    <div className="font-bold text-lg col-span-2">Dados da empresa</div>
                    <div className="flex flex-col">
                        <label className="font-semibold">Razão Social</label>
                        <input placeholder="" className="border bg-muted p-1 rounded" />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold">Nome Fantasia</label>
                        <input placeholder="" className="border bg-muted p-1 rounded" />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold">CNPJ</label>
                        <input placeholder="" className="border bg-muted p-1 rounded" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-1">
                    <div className="font-bold text-lg col-span-2">Endereço da empresa</div>
                    <div className="flex flex-col">
                        <label className="font-semibold">CEP</label>
                        <input placeholder="" className="border bg-muted p-1 rounded" />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold">Rua</label>
                        <input placeholder="" className="border bg-muted p-1 rounded" />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold">Cidade</label>
                        <input placeholder="" className="border bg-muted p-1 rounded" />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold">Bairro</label>
                        <input placeholder="" className="border bg-muted p-1 rounded" />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold">Estado</label>
                        <input placeholder="" className="border bg-muted p-1 rounded" />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold">Número</label>
                        <input placeholder="" className="border bg-muted p-1 rounded" />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold">Complemento</label>
                        <input placeholder="" className="border bg-muted p-1 rounded" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-1">
                    <div className="font-bold text-lg col-span-2">Endereço da empresa</div>
                    <div className="flex flex-col">
                        <label className="font-semibold">Nome</label>
                        <input placeholder="" className="border bg-muted p-1 rounded" />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold">E-mail</label>
                        <input placeholder="" className="border bg-muted p-1 rounded" />
                    </div>
                </div>



                <Button>Registrar</Button>

            </div>

            <div>

            </div>
        </div>
    </>)


    return (
        <div className="flex-1 flex flex-col">
            {/* Header da página */}
            <HeaderPage
                icon={Warehouse}
                title="Registrar Empresa"
            />

            {content}
        </div>
    );
}