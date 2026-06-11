import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ArrowRightCircle, Icon, User2 } from "lucide-react"
import Link from "next/link"

// ===============================
// ÍCONES
// ===============================
// const icones = {
//     Wrench: <Wrench className="h-14 w-14 opacity-90" />,
//     PaintRoller: <PaintRoller className="h-14 w-14 opacity-90" />,
//     BriefcaseBusiness: (
//         <BriefcaseBusiness className="h-14 w-14 opacity-90" />
//     ),
//     Network: <Network className="h-14 w-14 opacity-90" />,
//     default: <Warehouse className="h-14 w-14 opacity-90" />,
// };

// ===============================
// CORES FIXAS
// ===============================
const coresFixas = [
    "bg-gradient-to-r from-blue-600 to-indigo-600",
    "bg-gradient-to-r from-emerald-600 to-teal-600",
    "bg-gradient-to-r from-rose-600 to-red-600",
    "bg-gradient-to-r from-amber-500 to-orange-500",
    "bg-gradient-to-r from-purple-600 to-pink-600",
    "bg-gradient-to-r from-slate-600 to-slate-800",
];

// ===============================
// PEGA COR PELO ÍNDICE
// ===============================
function getCor(index) {
    return coresFixas[index % coresFixas.length];
}

const cor = getCor(1);

export function CardSetor({ setor }) {

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
                group cursor-pointer rounded-2xl overflow-hidden
                bg-white dark:bg-sidebar
                border border-gray-200 dark:border-slate-800
                shadow-sm hover:shadow-xl
                transition-all duration-300
                hover:-translate-y-1
            "
        >
            {/* HEADER */}
            <div
                className={`
                    p-6 flex flex-col justify-between
                    min-h-[170px]
                    text-white
                    relative
                    ${cor}
                `}
            >
                {/* overlay */}
                <div className="absolute inset-0 bg-black/10"></div>

                <div className="relative">
                    <div className="">
                        <Icon />
                    </div>

                    <h2 className="text-xl font-bold mt-3">
                        {
                            setor?.nome
                        }
                    </h2>

                    {setor?.badge && (
                        <span className="inline-block mt-2 text-xs bg-white/20 px-3 py-1 rounded-full">
                            {
                                setor.badge
                            }
                        </span>
                    )}
                </div>
            </div>

            {/* DESCRIÇÃO */}
            <div className="p-5">
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {
                        setor?.descricao
                    }
                </p>
            </div>

            {/* FOOTER */}
            <div className="px-5 pb-4">
                <span className="text-sm text-blue-600 dark:text-white font-medium opacity-0 group-hover:opacity-100 transition">
                    Ver detalhes →
                </span>
            </div>
        </div>
    )
}