"use client";

import { createContext, useContext } from "react";
import { useAuth as useAuthHook } from "@/hooks/useAuth";

// Criando o contexto
const AuthContext = createContext();

// Provider
export function AuthProvider({ children }) {
    const auth = useAuthHook({
        initialUser: null,
        fetchOnMount: true
    });

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook para consumir
export function useAuth() {
    return useContext(AuthContext);
}