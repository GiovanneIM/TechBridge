import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";
import { icons, ArrowRightCircle, User2, ArrowRight } from "lucide-react"
import Link from "next/link"



export function CardSetor({ setor }) {
    const Icon = icons[setor.icone];

    const cor_fundo = `#5C94FF`;
    const cor_texto = `#021B4C`;
    
    return (
        <div
            key={
                setor?.id || i
            }
            onClick={() => {
                if (
                    setor?.cod_setor
                ) {
                    router.push(
                        `/gerente/setores/${setor.cod_setor}`
                    );
                }
            }}
            className="
                cursor-pointer rounded-2xl overflow-hidden
                shadow-sm hover:shadow-xl 
                hover:-translate-y-1 transition-all duration-300
            "
        >
            {/* HEADER */}
            <div
                className={`
                    relative px-4 h-[80px]
                    flex justify-center items-center gap-4
                    text-[${cor_texto}] bg-[${cor_fundo}]
                `}
            >
                {/* <div className="relative flex gap-4 items-center"> */}
                {/* ICONE */}
                <Icon />

                {/* NOME */}
                <h2 className="flex-1 text-xl font-genty">
                    {setor?.nome}
                </h2>

                {/* STATUS */}
                <div className={`
                        top-2 right-2 w-5 h-5 rounded-full border-2 border-white 
                        ${setor.status ? "bg-green-500" : "bg-red-500"} `}
                />
                {/* </div> */}
            </div>

            {/* DESCRIÇÃO */}
            <div className="p-4 flex flex-col gap-4 border rounded-b-2xl">
                <p className="text-secondary-foreground font-genty text-sm">
                    # {setor?.cod_setor}
                </p>

                <p className="text-secondary-foreground text-sm line-clamp-2">
                    {
                        setor?.descricao
                    }
                </p>

                <Separator />

                <Button asChild className="
                    button-background
                    w-full border
                "
                >
                    <Link
                        href={`/admin/empresas/${setor.id_empresa}/setor${setor.id}`}
                        className="flex justify-center items-center"
                    >
                        Ver empresa <ArrowRight className="inline" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}