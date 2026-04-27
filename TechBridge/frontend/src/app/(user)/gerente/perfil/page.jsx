import PagePerfil from "@/components/blocks/Pages/PagePerfil";
import { cookies } from "next/headers";

//Chamando a rota dos usuários
async function getUsuarioLogado(token) {
    try {
        const response = await fetch(`http://localhost:3000/techbridge/user/userLog`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            cache: "no-store"
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar usuário logado");
        }

        const data = await response.json();

        return data.dados; // 🔥 CORRETO (era o erro principal)
    } catch (err) {
        console.error(err);
        return null;
    }
}

export default async function Perfil() {
    //Realizando a autenticação e proteção da rota
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    const tecnicos = await getUsuarioLogado(token);

    return (<PagePerfil usuario = {tecnicos}/>)
}