import { Button } from "@/components/ui/button"

export default function HeaderPage({
    icon: Icon,
    title,
    actions
}) {
    return (<>
        <div
            className="
						flex h-[49px] shrink-0 items-center gap-2  
						transition-[width,height] ease-linear bg-sidebar border-b
					"
        >
            <div className="w-full flex items-center justify-between gap-3 px-3">
                <div className='flex gap-4'>
                    <Icon size={24}/>

                    <h1 className="text-base font-genty">{title}</h1>
                </div>

                {/* Botão */}
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
    </>)
}