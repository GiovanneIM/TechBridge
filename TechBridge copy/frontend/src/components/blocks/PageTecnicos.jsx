import { UserCog2 } from "lucide-react"
import { Separator } from "../ui/separator"

export default function PageTecnicos({
    tecnicosIniciais
}) {
    return (<div>
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
                    <UserCog2 className="-ml-1" />

                    <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-6" />

                    <h1 className="text-base font-genty">Tecnicos</h1>
                </div>
            </div>
        </div>
    </div>)
}