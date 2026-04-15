'use client'
import Link from "next/link";

import { useSidebar } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation"

import {
    ChevronRight,
} from "lucide-react";
import {
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem
} from "@/components/ui/sidebar";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from "@/components/ui/collapsible";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";


export default function ItemColapsavel({ label, icon: Icon, lista }) {
    const pathname = usePathname();
    const isGroupActive = lista.some(l =>
        pathname.startsWith(l.url)
    );

    const { state } = useSidebar();
    const isCollapsed = state === "collapsed";


    const trigger = (
        <Button
            variant={isGroupActive? 'outline' : 'ghost'}
            className={`
                w-full h-10 gap-2 px-3 text-md
                flex items-center justify-start 
                
                transition-all duration-400

                group-data-[collapsible=icon]:gap-0
                group-data-[collapsible=icon]:px-3
                group-data-[collapsible=icon]:aspect-square

                ${isGroupActive && "bg-secondary text-techbridge"}
            `}
        >

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

            <ChevronRight className="
                ml-auto transition-transform duration-200 
                group-data-[state=open]/collapsible:rotate-90
                group-data-[collapsible=icon]:hidden
            " />
        </Button>
    )

    if (isCollapsed) {
        return (
            <TooltipProvider>
                <Tooltip>

                    <Popover>
                        <PopoverTrigger asChild>
                            <TooltipTrigger asChild>
                                {trigger}
                            </TooltipTrigger>


                        </PopoverTrigger>

                        <PopoverContent side="right">
                            <div className="flex flex-col gap-2">
                                {lista.map((l, i) => (
                                    <Button
                                        key={i}
                                        variant="ghost"
                                        asChild
                                        className={`
                                            w-full h-10 gap-2 px-3 text-md
                                            flex items-center justify-start 
                                            
                                            ${(pathname === l.url || pathname === `${l.url}/`) && "bg-techbridge text-white"}
                                        `}
                                    >
                                        <Link href={l.url}>
                                            <l.icon size={18} />
                                            <span>{l.label}</span>
                                        </Link>
                                    </Button>
                                ))
                                }
                            </div>
                        </PopoverContent>
                    </Popover>
                    <TooltipContent side="right" className="font-genty text-sm">
                        {label}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

        );
    }


    return (<>
        <Collapsible
            asChild
            className="group/collapsible"
        >
            <SidebarMenuItem>

                <CollapsibleTrigger asChild>
                    {trigger}
                </CollapsibleTrigger>

                <CollapsibleContent>
                    {lista.map((l, i) => (
                        <SidebarMenuSub key={i}>
                            <SidebarMenuSubItem>
                                <SidebarMenuSubButton
                                    variant="ghost"
                                    asChild
                                    className={`
                                        w-full h-10 text-md gap-2 px-3
                                        flex items-center justify-start 

                                        ${(pathname === l.url || pathname === `${l.url}/`) && "bg-techbridge text-white [&>svg]:text-white"}
                                    `}
                                >
                                    <Link href={l.url}>
                                        <l.icon size={18} />
                                        <span>{l.label}</span>
                                    </Link>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        </SidebarMenuSub>
                    ))}
                </CollapsibleContent>
            </SidebarMenuItem>
        </Collapsible>
    </>)
}