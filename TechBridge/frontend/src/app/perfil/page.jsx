import PagePerfil from "@/components/blocks/Pages/PagePerfil";
import { cookies } from "next/headers";

//Chamando a rota dos usuários
async function getTecnicos(token) {
    try {
        const response = await fetch(`http://localhost:3000/techbridge/user/buscar`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: "include"
        });

        // Convertendo a resposta para json
        const data = await response.json();



        return data.dados.tecnicos;
    } catch (err) {
    }
}

export default async function Perfil() {
    //Realizando a autenticação e proteção da rota
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    const tecnicos = await getTecnicos(token);

    console.log(tecnicos);

    return (<PagePerfil tecnicosIniciais = {tecnicos}/>)
}