import Link from "next/link";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { ArrowRight, Building2, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";


export default function CardEmpresas({
    empresa
}) {
    return (
        <div
            className="
                flex flex-col gap-2
                min-h-[180px]
                p-2
                border bg-card rounded
                shadow-md hover:shadow-xl
                transition-all duration-300
                text-sm
            "
        >
            <div className="flex-1 flex gap-2">
                {/* LOGO */}
                <div className=" 
                    relative w-28 h-28 shrink-0 
                    border rounded-xl bg-muted 
                    flex items-center justify-center overflow-hidden 
                " >
                    {empresa?.logo
                        ? (<img src={`http://localhost:3000/uploads/imagens/empresas/${empresa.id}/logo/${empresa.logo}`} alt={empresa.nome_fantasia} className="w-full h-full object-cover" />)
                        : (<Building2 size={40} className="text-muted-foreground" />)
                    }

                    {/* STATUS */}
                    <div className={` absolute top-2 right-2 w-3 h-3 rounded-full border-2 border-white ${empresa.status ? "bg-green-500" : "bg-red-500"} `} />

                    {/* ID */}
                    <div className=" absolute bottom-2 right-2 text-[10px] bg-black/70 text-white px-2 py-1 rounded-md font-medium " >
                        #{empresa.id}
                    </div>
                </div>

                {/* INFORMAÇÕES DA EMPRESA */}
                <div className="flex flex-col flex-1 min-w-0 gap-2">
                    <div>
                        <div className="font-genty text-xl">
                            {empresa.nome_fantasia}
                        </div>
                        <div className="font-genty text-muted-foreground text-md">
                            {empresa.razao_social}
                        </div>
                    </div>

                    <div className="flex gap-2 font-semibold">
                        <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{format(new Date(empresa.data_criacao), 'dd/MM/yyyy', { locale: ptBR })} </span>
                        </div>

                        {!empresa.status && (
                            <div className="flex items-center gap-1 text-red-500">
                                <Calendar size={14} />
                                <span>{format(new Date(empresa.data_desativacao), 'dd/MM/yyyy', { locale: ptBR })} </span>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <MapPin size={14} />
                        <span> {empresa.cidade} - {empresa.estado} </span>
                    </div>

                </div>

            </div>


            <Button asChild className="
                    text-white bg-techbridge/85
                    w-full
                "
                // variant="outline"
            >
                <Link href={`/admin/empresas/${empresa.id}`} className="flex justify-center items-center">
                    Ver empresa <ArrowRight className="inline" />
                </Link>
            </Button>

        </div>
    );
}