'use client'

// PÁGINAS DE ADMIN

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
    Sidebar,
    SidebarContent,
} from "@/components/ui/sidebar";
import SidebarBase from "@/components/Sidebar";
import SidebarNavAdmin from "@/components/Sidebar/nav/navAdmin";
import { Cpu, Factory, Siren, User2, Warehouse } from "lucide-react";




export default function LayoutAdminEmpresa({ children }) {

    const [header, setHeader] = useState({
        icon: null,
        title: ''
    });

    return (<>
        {/* CONTEXT */}
        <HeaderContext.Provider value={{ header, setHeader }}>

            {/* CONTEÚDO */}
            <main className=" flex-1 flex justify-center dark:bg-sidebar">
                {/* {children} */}

                <div className="flex-1 flex flex-col">
                            {/* HEADER DA PÁGINA */}
                            <div className="z-50 sticky top-[61px]">
                                <HeaderPage
                                    icon={header.icon}
                                    title={header.title}
                                />
                            </div>
                
                            {/* CONTEÚDO */}
                            <div className="flex flex-1 flex-col md:flex-row">
                                
                                <div className="
                                    z-50 sticky top-[110px] bg-background
                                    h-fit md:h-[calc(100vh-110px)] 
                                    w-full md:w-fit
                                    flex flex-row md:flex-col
                                    justify-between md:justify-start
                                    border-e-0 border-b md:border-e md:border-b-0
                                    p-1 gap-1 
                                ">
                                    <ButtonNav icon={Factory} label={'Empresa'} href={`/admin/empresas/${id_empresa}`} />
                                    <ButtonNav icon={User2} label={'Membros'} href={`/admin/empresas/${id_empresa}/membros`} />
                                    <ButtonNav icon={Warehouse} label={'Setores'} href={`/admin/empresas/${id_empresa}/setores`} />
                                    <ButtonNav icon={Cpu} label={'Máquina'} href={`/admin/empresas/${id_empresa}/maquinas`} />
                                    <ButtonNav icon={Siren} label={'Chamados'} href={`/admin/empresas/${id_empresa}/chamados`} />
                                </div>
                
                                <div className="flex-1 flex">
                                    {children}
                                </div>
                            </div>
                        </div>
            </main>
        </HeaderContext.Provider>
    </>);
}
