import Link from "next/link";
import { useSidebar } from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ItemSidebar({ icon: Icon, label, href, active }) {
    const { state } = useSidebar();
    const isCollapsed = state === "collapsed";

    const botao = (
        <Button
            variant="ghost"
            asChild
            className={`
                w-full h-10
                text-md
                flex items-center justify-start 
                gap-2 px-3
                transition-all duration-400

                group-data-[collapsible=icon]:gap-0
                group-data-[collapsible=icon]:px-3
                group-data-[collapsible=icon]:aspect-square
                

                ${active && "bg-techbridge text-white"}
            `}
        >
            <Link href={href}>

                <Icon size={18} />

                <span
                    className="
                        whitespace-nowrap transition-all duration-400
                        group-data-[collapsible=icon]:opacity-0
                        group-data-[collapsible=icon]:w-0
                        group-data-[collapsible=icon]:overflow-hidden
                    "
                >
                    {label}
                </span>

            </Link>
        </Button>
    );

    if (isCollapsed) {
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

    return botao;
}