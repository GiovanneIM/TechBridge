import { useEffect, useState, useCallback } from 'react';
import { API_FETCH, API_LOGIN, apiFetch } from '@/lib/api';


// URL base da API
const API_BASE_URL = '/auth';

export function useAuth({
    initialUser = null,
    fetchOnMount = true
} = {}
) {
    // USUÁRIO
    const [user, setUser] = useState(initialUser)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    // LOADING
    const [loading, setLoading] = useState({
        login: false,
        perfil: false,
        logout: false,
    });

    // ERRO
    const [error, setError] = useState({
        login: null,
        perfil: null,
    });

    // FAZER LOGIN
    const login = useCallback(async (dadosLogin) => {
        setLoading((prev) => ({ ...prev, login: true }));
        setError((prev) => ({ ...prev, login: null }));

        try {
            console.log(dadosLogin);

            // REQUISIÇÃO
            const data = await API_LOGIN(dadosLogin);

            // ERRO
            if (!data.sucesso) {
                setError((prev) => ({ ...prev, login: data.mensagem }))
            }

            // SUCESSO
            else {
                setUser(data.dados.usuario)
                setIsAuthenticated(true)
            }
        } catch (err) {
            // Caso dê erro de rede, CORS, servidor, etc, guardamos uma mensagem amigável em `error`
            if (err.message === 'Sessão expirada') return;

            setError((prev) => ({
                ...prev,
                login: 'Erro ao solicitar login, tente novamente mais tarde.'
            }));

        } finally {
            // ENCERRANDO LOADING
            setLoading((prev) => ({ ...prev, login: false }));
        }
    }, []);

    // OBTER PERFIL
    const perfil = useCallback(async () => {
        setLoading((prev) => ({ ...prev, perfil: true }));
        setError((prev) => ({ ...prev, perfil: null }));

        try {
            // REQUISIÇÃO
            const data = await API_FETCH(`${API_BASE_URL}/perfil`, {
                method: 'GET'
            });

            // ERRO
            if (!data.sucesso) {
                setError((prev) => ({ ...prev, perfil: data.mensagem }))
                setUser(null)
            }

            // SUCESSO
            else {
                setUser(data.dados.usuario)
                setIsAuthenticated(true)
            }

        } catch (err) {
            // Caso dê erro de rede, CORS, servidor, etc, guardamos uma mensagem amigável em `error`
            setError((prev) => ({ ...prev, perfil: 'Erro ao solicitar perfil, tente novamente mais tarde.' }))

        } finally {
            // ENCERRANDO LOADING
            setLoading((prev) => ({ ...prev, perfil: false }));
        }
    }, []);

    // FAZER LOGOUT
    const logout = async () => {
        setLoading((prev) => ({ ...prev, logout: true }));

        try {
            // REQUISIÇÃO
            await API_FETCH(`${API_BASE_URL}/logout`, {
                method: 'POST',
                credentials: 'include'
            });

            // APAGAR TOKEN
            sessionStorage.removeItem('token');

            // LIMPANDO USUÁRIO
            setUser(null);
            setIsAuthenticated(false)
        } catch (err) {
            console.error(err);
        } finally {
            // ENCERRANDO LOADING
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
        isAuthenticated,
        loading,
        setLoading,
        error,
        login,
        perfil,
        logout,
    };
}