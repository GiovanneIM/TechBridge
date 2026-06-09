import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ButtonNav({ icon: Icon, label, href }) {
    const pathname = usePathname();

    const botao = (
        <Button
            variant="ghost"
            asChild
            className={`
                w-fit h-10 gap-2 px-3 text-md
                flex items-center justify-start 
                
                group-data-[collapsible=icon]:gap-0
                group-data-[collapsible=icon]:px-3
                group-data-[collapsible=icon]:aspect-square
                

                ${pathname.endsWith(href) && "bg-techbridge font-semibold text-white"}
            `}
        >
            <Link href={href}>
                <Icon size={18} />
            </Link>
        </Button>
    );

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {botao}
                </TooltipTrigger>

                <TooltipContent side="right" className="font-genty text-sm">
                    {label}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}