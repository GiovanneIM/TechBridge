"use client";

import Image from "next/image";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";


export default function NotPermission({ }) {
    const router = useRouter();
    const { user } = useAuth()

    useEffect(() => {
        if (!user) return;

        const timer = setTimeout(() => {
            router.replace(`/${user.cargo}/dashboard`);
        }, 2000);

        return () => clearTimeout(timer);
    }, [user]);

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
                    <p className="font-bold text-muted-foreground text-sm">Você não tem permissão para acessar essa página</p>
                </div>
            </div>
        </div>
    </>);
}