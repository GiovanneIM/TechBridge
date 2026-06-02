"use client";

import { ArrowUpCircle } from "lucide-react";

export default function NavigateToTop() {
    function handleScrollTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <div
                onClick={handleScrollTop}
                className="
                    bg-techbridge w-12 h-12 rounded-full
                    flex justify-center items-center
                    shadow-2xl cursor-pointer
                    transition-transform duration-200 ease-out
                    hover:scale-110
                    active:scale-95
                "
            >
                <ArrowUpCircle size={32} className="text-white" />
            </div>
        </div>
    );
}