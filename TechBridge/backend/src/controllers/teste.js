import { supabase } from '../supabase/supabase.js'

export async function listarUsuarios(req, res) {

    const { data, error } = await supabase
        .from('usuarios')
        .select(`
            *,
            empresas (
                *
            ),
            tipos_usuarios (
                descricao
           )
        `)
        .eq('email', 'admin@tb.com');

    console.log('DATA:', data)
    console.log('ERROR:', error)

    return res.json({
        data,
        error
    })
}