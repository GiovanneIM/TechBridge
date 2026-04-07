import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function HeaderPage({
    icon,
    title,
    buttonIcon,
    buttonText,
    buttonAction
}) {
    return (<>
        <div
            className="
						flex h-12 shrink-0 items-center gap-2 border-b 
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
                    {buttonAction && (
                        <Button
                            variant="ghost"
                            onClick={buttonAction}
                            className="flex items-center border text-muted-foreground"
                        >
                            {buttonIcon}
                            <span className="hidden font-medium sm:inline">{buttonText}</span>
                        </Button>
                    )}
                </div>
            </div>
        </div>
    </>)
}