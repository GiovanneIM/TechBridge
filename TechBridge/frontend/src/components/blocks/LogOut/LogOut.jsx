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
            <div className="relative flex flex-col justify-center items-center gap-10 bg-white rounded-full p-25 sm:p-30 md:p-75">
                <div className="relative w-fit h-fit">
                    <Spinner className="text-techbridge absolute top-1/2 left-1/2 -translate-1/2 w-[175%] h-[175%] font-normal" />
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