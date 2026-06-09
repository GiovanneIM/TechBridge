'use client'

// PÁGINAS DE ADMIN

import { useAuth } from "@/context/AuthContext";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Cpu, Factory, Siren, Square, User2, Warehouse } from "lucide-react";
import { HeaderContext } from "@/context/HeaderContext";
import HeaderPage from "@/components/blocks/Header/HeaderPage";
import ButtonNav from "@/components/Sidebar/btn/ButtonNav";
import { Separator } from "@/components/ui/separator";




export default function LayoutAdminEmpresa({ children }) {
    const params = useParams();
    const id_empresa = params.id;

    const [header, setHeader] = useState({
        icon: Square,
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
                    <div className="z-50 sticky top-[64px]">
                        <HeaderPage
                            icon={header.icon}
                            title={header.title}
                        />
                    </div>

                    {/* CONTEÚDO */}
                    <div className="flex flex-1 flex-col md:flex-row">

                        <div className="
                            z-50 sticky top-[110px] bg-background
                            h-fit md:h-[calc(100vh-111px)] 
                            w-full md:w-fit
                            flex flex-row md:flex-col
                            justify-between md:justify-start
                            border-e-0 border-b md:border-e md:border-b-0
                            
                        ">
                            <ButtonNav icon={Factory} label={'Empresa'} href={`/admin/empresas/${id_empresa}`} />
                            <Separator orientation="vertical" className='md:hidden'/>

                            <ButtonNav icon={User2} label={'Membros'} href={`/admin/empresas/${id_empresa}/membros`} />
                            <Separator orientation="vertical" className='md:hidden'/>

                            <ButtonNav icon={Warehouse} label={'Setores'} href={`/admin/empresas/${id_empresa}/setores`} />
                            <Separator orientation="vertical" className='md:hidden'/>

                            <ButtonNav icon={Cpu} label={'Máquina'} href={`/admin/empresas/${id_empresa}/maquinas`} />
                            <Separator orientation="vertical" className='md:hidden'/>

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
