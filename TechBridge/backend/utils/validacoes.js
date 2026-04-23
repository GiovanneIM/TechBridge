export function validarEmail(email) {

    // Validação de tipo
    if (typeof dados.email !== "string") {
        return {
            sucesso: false,
            erro: 'Email inválido',
            mensagem: 'O e-mail deve ser um texto'
        };
    }

    // Verificando se o email existe e não está vazio
    if (!email || email.trim() === '') {
        return {
            sucesso: false,
            erro: 'Email obrigatório',
            mensagem: 'O email é obrigatório'
        };
    }

    // Validação básica de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return {
            sucesso: false,
            erro: 'Email inválido',
            mensagem: 'Formato de email inválido'
        };
    }

    // Validando o tamanho mínimo do e-mail
    if (email.length === 0) {
        return {
            sucesso: false,
            erro: 'Email inválido',
            mensagem: "O e-mail não pode estar vazio"
        };
    }

    // Validando o tamanho máximo do e-mail
    if (email.length > 255) {
        return {
            sucesso: false,
            erro: 'Email inválido',
            mensagem: 'O e-mail pode ter no máximo 255 caracteres'
        };
    }



    return { sucesso: true }
}

export function validarSenha(senha) {
    // Verificando se o tipo está correto
    if (typeof senha !== "string") {
        return {
            sucesso: false,
            erro: 'Senha inválida',
            mensagem: 'A senha deve ser um texto'
        };
    }

    // Verificando se a senha foi enviada e não está vazia
    if (!senha || senha.trim() === '') {
        return {
            sucesso: false,
            erro: 'Senha obrigatória',
            mensagem: 'A senha é obrigatória'
        };
    }

    // Verificando o tamanho da senha 
    if (senha.length < 6) {
        return {
            sucesso: false,
            erro: 'Senha inválida',
            mensagem: 'A nova senha deve ter no mínimo 6 caracteres'
        };
    }

    return { sucesso: true }
}

export function validarNome(nome) {
    // Verificando se o tipo está correto
    if (typeof nome !== "string") {
        return {
            sucesso: false,
            erro: 'Nome inválido',
            mensagem: 'O nome deve ser um texto'
        };
    }

    // Verificando se o nome existe e não está vazio
    if (!nome || nome.trim() === '') {
        return {
            sucesso: false,
            erro: 'Nome obrigatório',
            mensagem: 'O nome é obrigatório'
        };
    }

    // Validando o tamanho mínimo do nome
    if (nome.length === 0) {
        return res.status(400).json({
            sucesso: false,
            erro: 'Nome inválido',
            mensagem: "O nome não pode estar vazio"
        });
    }

    // Validando o tamanho máximo do nome
    if (nome.length > 255) {
        return res.status(400).json({
            sucesso: false,
            erro: 'Nome inválido',
            mensagem: 'O nome pode ter no máximo 255 caracteres'
        });
    }



    return { sucesso: true }
}