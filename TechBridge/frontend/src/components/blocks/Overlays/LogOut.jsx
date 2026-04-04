"use client";

import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { Spinner } from "@/components/ui/spinner";

export default function LogOut() {
    const { loading, setLoading } = useAuth();
    const pathname = usePathname();

    // Se o usuário estiver vindo de um redirecionamento, termina o loading
    useEffect(() => {
        if (loading.logout) {
            setLoading((prev) => ({ ...prev, logout: false }));
        }
    }, [pathname]);

    if (!loading.logout) return null;

    return (
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
            </div>
        </div>


    );
}