import { useEffect, useState, useCallback } from 'react';


// URL base da API
const API_BASE_URL = 'http://localhost:3000/api/auth';

export function useAuth({
    initialUser = null,
    fetchOnMount = true
} = {}
) {
    // Estado com o usuário
    const [user, setUser] = useState(initialUser)

    // Estado que indica se há uma requisição em andamento
    const [loading, setLoading] = useState({
        login: false,
        perfil: false,
        logout: false
    });

    // Estado para armazenar mensagem de erro (se houver)
    const [error, setError] = useState({
        login: null,
        perfil: null,
    });


    const login = useCallback(async (dadosLogin) => {
        setLoading((prev) => ({ ...prev, login: true }));
        setError((prev) => ({ ...prev, login: null }));

        try {
            // Chamada à API
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosLogin),
                credentials: 'include'
            });

            // Convertendo a resposta para json
            const data = await response.json();

            // Se a resposta veio com status de erro
            if (!data.sucesso) {
                setError((prev) => ({ ...prev, login: data.mensagem }))
            }
            else {
                // Atualizando o estado do usuário
                setUser(data.dados.usuario)
            }
        } catch (err) {
            // Caso dê erro de rede, CORS, servidor, etc, guardamos uma mensagem amigável em `error`
            setError((prev) => ({ ...prev, login: 'Erro ao solicitar login, tente novamente mais tarde.' }))

        } finally {
            // Independente de sucesso ou erro, o loading termina aqui
            setLoading((prev) => ({ ...prev, login: false }));
        }
    }, []);

    const perfil = useCallback(async () => {
        setLoading((prev) => ({ ...prev, perfil: true }));
        setError((prev) => ({ ...prev, perfil: null }));

        try {
            // Chamada à API
            const response = await fetch(`${API_BASE_URL}/perfil`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            // Convertendo a resposta para json
            const data = await response.json();

            // Se a resposta veio com status de erro
            if (!data.sucesso) {
                setError((prev) => ({ ...prev, perfil: data.mensagem }))
                setUser(null)
            }
            else {
                // Atualizando o estado do usuário
                setUser(data.dados.usuario)
                console.log(data.dados.usuario);

            }

        } catch (err) {
            // Caso dê erro de rede, CORS, servidor, etc, guardamos uma mensagem amigável em `error`
            setError((prev) => ({ ...prev, perfil: 'Erro ao solicitar perfil, tente novamente mais tarde.' }))

        } finally {
            // Independente de sucesso ou erro, o loading termina aqui
            setLoading((prev) => ({ ...prev, perfil: false }));
        }
    }, []);

    const logout = async () => {
        setLoading((prev) => ({ ...prev, logout: true }));

        try {
            await fetch('/api/logout', {
                method: 'POST',
                credentials: 'include'
            });

            // Limpando estados locais
            setUser(null);
            
        } catch (err) {
            console.error(err);
        } finally {
            setLoading((prev) => ({ ...prev, logout: false }));
        }
    };


    // Obtendo o perfil
    useEffect(() => {
        if (!fetchOnMount) return;
        perfil();
    }, [fetchOnMount, perfil]);

    return {
        user,
        loading,
        error,
        login,
        perfil,
        logout,
    };
}