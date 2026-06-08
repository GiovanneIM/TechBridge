import { API_URL } from "./utils";

// Função para padronizar as requisições à API (Sempre envia os cookies)
export async function apiFetch(endpoint, options = {}) {
    const { ignoreAuthError, ...fetchOptions } = options;

    const url = API_URL + endpoint;

    const response = await fetch(url, {
        ...fetchOptions,
        credentials: 'include'
    });

    console.log(response);


    // Sessão expirada
    if (response.status === 401 && !ignoreAuthError) {
        window.dispatchEvent(new Event('sessionExpired'));
        throw new Error('Sessão expirada');
    }


    // Outros erros HTTP
    // if (!response.ok) {
    //     const message = await response.text();
    //     throw new Error(message || 'Erro na requisição');
    // }


    return response;
}