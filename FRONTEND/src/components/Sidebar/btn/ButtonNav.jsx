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
                flex-1 md:flex-initial h-12 md:w-12 gap-2 px-3 text-md
                md:border-b rounded-none
                flex items-center justify-center 

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