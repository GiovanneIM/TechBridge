// URL base da API
export const API_URL = 'http://localhost:3000/techbridge'

// Função para padronizar as requisições à API (Sempre envia os cookies)
export async function apiFetch(endpoint, options = {}) {
    const { ignoreAuthError, ...fetchOptions } = options;

    const response = await fetch(API_URL + endpoint, {
        ...fetchOptions,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...fetchOptions.headers
        },
    });

    let data;

    try {
        data = await response.json();
    } catch {
        data = null;
    }


    // Sessão expirada
    if (response.status === 401 && !ignoreAuthError) {
        if (typeof window !== "undefined") {
            // window.dispatchEvent(new Event('sessionExpired'));
        }
        // throw new Error('Sessão expirada');
    }


    // Outros erros HTTP
    // if (!response.ok) {
    //     const message = await response.text();
    //     throw new Error(message || 'Erro na requisição');
    // }


    return data;
}