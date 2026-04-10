"use client";

import Image from "next/image";

import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function NotAuthenticated({ }) {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/");
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (<>
        <div className="fixed inset-0 bg-blue-50 z-51 flex flex-col items-center justify-center">
            <div className="relative flex flex-col justify-center items-center gap-8">
                <div className="relative w-fit h-fit">
                    <div className="w-40 h-40 -z-10 bg-techbridge absolute top-1/2 left-1/2 -translate-1/2 rounded-full animate-ping"></div>
                    <Image
                        src="/TechBridge/Logo.svg"
                        width={200}
                        height={200}
                        alt="Logo TechBridge"
                        priority
                    />
                </div>

                <div className="text-center">
                    <p className="font-genty text-2xl">Erro de permissão</p>
                    <p className="font-bold text-muted-foreground text-sm">Faça login para acessar essa página</p>
                </div>
            </div>
        </div>
    </>);
}