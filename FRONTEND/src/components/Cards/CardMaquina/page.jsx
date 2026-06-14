import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator";
import { icons, ArrowRightCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation";



export function CardMaquina({ maquina }) {

    return (
        <div
            className="
                rounded-2xl overflow-hidden
                shadow-sm hover:shadow-xl 
                hover:-translate-y-1 transition-all duration-300
            "
        >
            {/* HEADER */}
            <div
                className={`
                    relative px-4 h-[80px] bg-techbridge
                    flex justify-center items-center gap-4
                `}
            >
                {/* NOME */}
                <div className="flex-1">
                    <h2 className="text-xl font-genty text-white">
                        {maquina?.nome}
                    </h2>

                    <h2 className="text-sm font-genty text-slate-800">
                        Setor: {maquina?.nome_setor}
                    </h2>
                </div>

                {/* STATUS */}
                <div
                    className={`
                        top-2 right-2 w-4 h-4 rounded-full border-2 border-white 
                        ${maquina.status ? "bg-green-500" : "bg-red-500"}
                    `}
                />
            </div>

            {/* CORPO */}
            <div className="p-4 flex flex-col gap-4 border rounded-b-2xl">
                {/* CODIGO */}
                <p className="
                    text-secondary-foreground font-genty 
                    text-sm border rounded p-2
                ">
                    # {maquina.cod_setor} - {maquina?.cod_maquina}
                </p>

                {/* DESCRIÇÃO */}
                <p className="text-secondary-foreground text-sm line-clamp-2">
                    {
                        maquina?.descricao
                    }
                </p>

                <Separator />

                <Button asChild className="
                    button-background
                    w-full border
                "
                >
                    <Link
                        href={`/admin/empresas/${maquina.id_empresa}/setores/${maquina.cod_setor}/maquina/${maquina.cod_maquina}`}
                        className="flex justify-center items-center"
                    >
                        Ver máquina <ArrowRightCircle className="inline" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}