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

    // const auth = useAuthHook({
    //     initialUser: {
    //         nome: 'Giovanne Isaac Marques',
    //         email: 'giovanne.isaac@gmail.com',
    //         senha:'123456',
    //         foto_perfil: 'https://images-news.now.com/newsimage/NewsImage/2025-02-07-15-22-5103GxLf4N.jpg',
    //         ativo: true,
    //         tipo_usuario: 1,
    //         id_empresa: null
    //     },
    //     fetchOnMount: false
    // });

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