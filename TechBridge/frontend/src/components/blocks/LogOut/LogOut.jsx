"use client";

import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export default function LogOut() {
    const { loading } = useAuth();

    if (!loading.logout) return null;

    return (
        <div className="fixed inset-0 bg-blue-50 z-9999 flex flex-col items-center justify-center">
            <div className="flex flex-col gap-4 bg-white rounded-full p-100">
                <Image
                    src="/TechBridge/Logo.svg"
                    width={200}
                    height={200}
                    alt="Logo TechBridge"
                    className="animate-wiggle"
                    priority
                />
                <div className="text-techbridge font-bold font-genty text-2xl lg:text-4xl text-center">
                    Obrigado, até a próxima!
                </div>
            </div>
        </div>


    );
}