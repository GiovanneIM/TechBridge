"use client";

import Image from "next/image";

import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogOut() {
    const router = useRouter();

    const { loading, logout } = useAuth();



    useEffect(() => {
        logout();
    }, []);

    useEffect(() => {
        if (!loading.logout) {
            router.replace("/");
        }
    }, [loading.logout]);

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