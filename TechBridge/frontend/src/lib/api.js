// Função para padronizar as requisições à API (Sempre envia os cookies)
export async function apiFetch(endpoint, options = {}) {
    const { ignoreAuthError, ...fetchOptions } = options;

    const url = 'http://localhost:3000/techbridge' + endpoint

    const response = await fetch(url, {
        ...fetchOptions,
        credentials: 'include'
    });

    console.log(response);
    

    // Se o status da requisição for 401 (Unauthorized), é dado como sessão expirada
    if (response.status === 401 && !ignoreAuthError) {
        window.dispatchEvent(new Event('sessionExpired'));
        throw new Error('Sessão expirada');
    }

    return response;
}