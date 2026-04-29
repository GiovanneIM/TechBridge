export function vermelho(texto) {
    return `\u001b[31m${texto}\u001b[m`;
}

export function verde(texto) {
    return `\u001b[\u001b[32m${texto}\u001b[m`;
}

export function amarelo(texto) {
    return `\u001b[\u001b[33m${texto}\u001b[m`;
}

export function azul(texto) {
    return `\u001b[34m${texto}\u001b[m`;
}

export function magenta(texto) {
    return `\u001b[35m${texto}\u001b[m`;
}

export function negrito(texto) {
    return `\u001b[1m${texto}\u001b[m`;
}