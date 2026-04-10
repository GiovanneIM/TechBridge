import PageChamados from "@/components/blocks/PageChamados";
import { cookies } from "next/headers";

async function getChamados(token) {
    try {
        const response = await fetch(`http://localhost:3000/api/chamados/buscar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ options: { limit: 25 } }),
            credentials: "include"
        });

        // Convertendo a resposta para json
        const data = await response.json();

        return data.dados.chamados;
    } catch (err) {
    }
}

export default async function Chamados() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    // const chamados = await getChamados(token);
    const chamados = await getChamados(token);


    return (
        <PageChamados chamados={chamados}/>
    )
}