import Link from "next/link";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";


export default function CardEmpresas({
    empresa
}) {
    return (
        <div className="w-sm">
            <div
                key={empresa.id}
                className="items-center bg-card border rounded shadow-xl p-3 text-xs"
            >
                <div className="flex gap-3">

                    <div className="flex items-center justify-center relative border p-2 w-40 h-40">

                        {empresa?.logo && <img
                            className="inset-0"
                            src={`http://localhost:3000/uploads/imagens/empresas/${empresa.id}/logo/${empresa.logo}`}
                            alt={`Empresa ${empresa.id} - Logo`}
                        />
                        }

                        <Building2 size={40} />


                        <div className={`absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center ${empresa.status ? 'bg-ativo' : 'bg-inativo'}`}>
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                        </div>
                    </div>

                    <div className="h-30 flex flex-col gap-1 flex-1 overflow-y-auto">
                        <div className="font-bold text-xl">{empresa.nome_fantasia}</div>

                        <div className="text-muted-foreground text-md">
                            {empresa.razao_social}
                        </div>

                        <div>
                            Registro em {format(new Date(empresa.data_criacao), 'dd/MM/yyyy', { locale: ptBR })}
                        </div>

                        {!empresa.status && (
                            <div>
                                Desativada em {format(new Date(empresa.data_desativacao), 'dd/MM/yyyy', { locale: ptBR })}
                            </div>
                        )}

                        <div>{empresa.endereco?.estado}</div>


                    </div>

                </div>

                <Button asChild className='text-white mt-3 w-full'>
                    <Link href={`/admin/empresas/${empresa.id}`}>
                        Ver empresa
                    </Link>
                </Button>

            </div>
        </div>
    );
}