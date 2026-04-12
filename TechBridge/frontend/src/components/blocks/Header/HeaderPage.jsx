import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function HeaderPage({
    icon,
    title,
    actions
}) {
    return (<>
        <div
            className="
						flex h-12 shrink-0 items-center gap-2  
						transition-[width,height] ease-linear 
						group-has-data-[collapsible=icon]/sidebar-wrapper:h-12
					"
        >
            <div className="w-full flex items-center justify-between gap-3 px-4 lg:px-6">
                <div className='flex gap-1 lg:gap-2'>
                    {icon}

                    <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-6" />

                    <h1 className="text-base font-genty">{title}</h1>
                </div>

                {/* Botão para buscar os chamados novamente */}
                <div className="flex items-center gap-2">
                    {actions && actions.map((ac, i) => (
                        <Button
                            key={i}
                            variant="ghost"
                            onClick={ac.onClick}
                            className="flex items-center border text-muted-foreground"
                            disabled={ac.disabled}
                        >
                            {ac.icon}
                            <span className="hidden font-medium sm:inline">{ac.text}</span>
                        </Button>
                    ))}
                </div>
            </div>
        </div>

        <Separator/>
    </>)
}