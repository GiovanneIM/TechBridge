// URL base da API
// export const API_URL = 'http://localhost:3000/techbridge';
export const API_URL = 'https://techbridge-api.up.railway.app/techbridge';
// export const API_URL = 'https://symmetrical-cod-44x7vxqjg67fjqvp-3000.app.github.dev/techbridge';

// REALIZAR LOGIN
async function API_LOGIN(user) {

    // FAZER A REQUISIÇÃO
    const response = await fetch(API_URL + '/auth/login', {
        method: 'POST',
        credentials: 'include',
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

    const isFormData = options.body instanceof FormData;

    const response = await fetch(API_URL + ENDPOINT, {
        ...options,
        credentials: 'include',
        headers: {
            authorization: `bearer ${token}`,
            ...(isFormData ? {} : {
                'Content-Type': 'application/json'
            }),
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
    console.log('- - - - - - - - - - - - -');
    console.log(options?.method + ' - ' + response.status + ' - ' + ENDPOINT);
    console.log(data);
    console.log('- - - - - - - - - - - - -');

    // RETORNAR A RESPOSTA
    return data;
}



export {
    API_URL,
    API_FETCH,
    API_LOGIN
}