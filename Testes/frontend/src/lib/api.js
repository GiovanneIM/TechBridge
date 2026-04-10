// /lib/api.js
export async function apiFetch(url, options = {}) {
    const { ignoreAuthError, ...fetchOptions } = options;

    const response = await fetch(url, {
        ...fetchOptions,
        credentials: 'include'
    });

    console.log(response);
    

    if (response.status === 401 && !ignoreAuthError) {
        window.dispatchEvent(new Event('sessionExpired'));
        throw new Error('Sessão expirada');
    }

    return response;
}