import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator";
import { icons, ArrowRightCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation";



export function CardSetor({ setor }) {
    const router = useRouter()
    const Icon = icons[setor.icone];

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
                    relative px-4 h-[80px]
                    flex justify-center items-center gap-4
                `}

                style={{
                    backgroundColor: `#${setor.cor_fundo}`,
                    color: `#${setor.cor_texto}`,
                }}
            >
                {/* ICONE */}
                <Icon />

                {/* NOME */}
                <h2 className="flex-1 text-xl font-genty">
                    {setor?.nome}
                </h2>

                {/* STATUS */}
                <div
                    className={`
                        top-2 right-2 w-4 h-4 rounded-full border-2 border-white 
                        ${setor.status ? "bg-green-500" : "bg-red-500"}
                    `}
                />
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
                        href={`/admin/empresas/${setor.id_empresa}/setores/${setor.cod_setor}`}
                        className="flex justify-center items-center"
                    >
                        Ver empresa <ArrowRightCircle className="inline" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}