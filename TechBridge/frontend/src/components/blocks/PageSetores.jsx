import { BriefcaseBusiness, Network, PaintRoller, Warehouse, Wrench } from "lucide-react"
import { Separator } from "../ui/separator"
import { spawnDynamicRequests } from "next/dist/client/components/router-reducer/ppr-navigations"

export default function PageSetores({
    setoresIniciais
}) {
    return (
        <div className='flex-1 flex flex-col'>
            {/* Header da página */}
            <div
                className="
						flex h-12 shrink-0 items-center gap-2 border-b 
						transition-[width,height] ease-linear 
						group-has-data-[collapsible=icon]/sidebar-wrapper:h-12
					"
            >
                <div className="w-full flex items-center justify-between gap-3 px-4 lg:px-6">
                    <div className='flex gap-1 lg:gap-2'>
                        <Warehouse className="-ml-1" />

                        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-6" />

                        <h1 className="text-base font-genty">Setores</h1>
                    </div>
                </div>
            </div>

            <div className="flex flex-row gap-3 items-center justify-center p-5">
                {/* Card dos setores */}
                {setores.map((setor, i) => (
                    <div key={i} data-slot="card" className="hover:-translate-y-1 transition-all flex flex-col rounded-xl border bg-card py-10 text-card-foreground shadow-sm relative w-full max-w-sm overflow-hidden pt-0 pb-4 gap-4">
                        <div>
                            <div>{setor.icone}</div>
                        </div>
                        <div>
                            <div data-slot="card-header" className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 px-4">
                                <div data-slot="card-action" className="col-start-2 row-span-2 row-start-1 self-start justify-self-end">
                                    <span data-slot="badge" data-variant="secondary" className="inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&amp;&gt;svg]:pointer-events-none [&amp;&gt;svg]:size-3 bg-secondary text-secondary-foreground dark:bg-techbridge text-center font-genty">
                                        {setor.span}</span>
                                </div>
                                <div data-slot="card-title" className="font-semibold text-techbridge font-genty text-2xl dark:text-gray-300">
                                    {setor.nome}
                                </div>
                                <div data-slot="card-description" className="text-sm text-muted-foreground">
                                </div>
                            </div>
                            <div data-slot="card-content" className="px-4">
                                <ul className="text-muted-foreground text-justify font-genty">
                                    <li className="mt-2"></li>
                                    <li className="mt-2"></li>
                                    <li className="mt-2"></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const setores = [
    {
        value: "setor-1",
        nome: "Ferramentaria",
        icone: <Wrench className="text-techbridge h-15 w-20 pt-4 dark:text-gray-300" />,
        span: "Ferramental"
    },
    {
        value: "setor-2",
        nome: "RH",
        icone: <BriefcaseBusiness className="text-techbridge h-15 w-20 pt-4 dark:text-gray-300" />,
        span: " Gestão de pessoas"
    },
    {
        value: "setor-3",
        nome: "Pintura",
        icone: <PaintRoller className="text-techbridge h-15 w-20 pt-4 dark:text-gray-300" />,
        span: "Acabamento"
    },
    {
        value: "setor-4",
        nome: "GA",
        icone: <Network className="text-techbridge h-15 w-20 pt-4 dark:text-gray-300" />,
        span: "Logística"
    },
]