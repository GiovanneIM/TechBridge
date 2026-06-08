export const CARGOS = {
    ADMIN: 1,
    GERENTE_PRINCIPAL: 2,
    GERENTE: 3,
    TECNICO: 4,
}

export const CARGOS_FORMATADOS = {
    'admin': 'Admin',
    'gerente_principal': 'Gerente Principal',
    'gerente': 'Gerente',
    'tecnico': 'Técnico',
}


export function pertenceAEmpresa(req, id_empresa) {
    // VERIFICANDO SE O USUÁRIO É ADMIN
    if (req.usuario.tipo_usuario != CARGOS.ADMIN) {
        // SE NÃO FOR ADMIN, SÓ CONTINUA SE ELE PERTENCER À EMPRESA
        if (req.usuario.id_empresa != id_empresa) {
            return false
        }
    }

    return true
}
