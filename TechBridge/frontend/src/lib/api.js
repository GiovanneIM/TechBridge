// URL base da API
// PC DO ARTHUT -> localhost
// OUTROS -> 10.84.7.5
export const API_URL = 'http://localhost:3000/techbridge'

// REALIZAR LOGIN
async function API_LOGIN(user) {

    // FAZER A REQUISIÇÃO
    const response = await fetch(API_URL + '/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    // OBTER OS DADOS
    const data = await response.json();

    // VERIFICAR SE HOUVE SUCESSO
    if (response.status === 200) {
        // SALVAR TOKEN
        sessionStorage.setItem('token', data.dados.token);
    }

    // RETORNAR A RESPOSTA
    return data;
}

// FAZER REQUISIÇÃO À API (Usuário já logado)
async function API_FETCH(ENDPOINT, options = {}) {
    // OBTER TOKEN
    const token = sessionStorage.getItem('token');

    // FAZER A REQUISIÇÃO
    const response = await fetch(API_URL + ENDPOINT, {
        ...options,
        credentials: 'include',
        headers: {
            'authorization': `bearer ${token}`,
            ...options.headers
        }
    });

    // SESSÃO EXPIRADA
    if (response.status === 401 && !ignoreAuthError) {
        if (typeof window !== "undefined") {
            // window.dispatchEvent(new Event('sessionExpired'));
        }
        // throw new Error('Sessão expirada');
    }

    // OBTER OS DADOS
    const data = await response.json();

    // RETORNAR A RESPOSTA
    return data;

    // RETORNAR A RESPOSTA
    // return response;
}



// Função para padronizar as requisições à API (Sempre envia os cookies)
export async function apiFetch(endpoint, options = {}) {
    const token = sessionStorage.getItem('token');

    const { ignoreAuthError, ...fetchOptions } = options;

    const response = await fetch(API_URL + endpoint, {
        ...fetchOptions,
        credentials: 'include',
        headers: {
            'authorization': `bearer ${token}`,
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



export {
    API_URL,
    API_FETCH,
    API_LOGIN
}