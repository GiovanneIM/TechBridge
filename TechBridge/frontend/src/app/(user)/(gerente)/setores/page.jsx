import PageSetores from "@/components/blocks/PageSetores";
import { cookies } from "next/headers";

async function getSetores(token) {
    try {
        const response = await fetch(`http://localhost:3000/techbridge/setores/buscar`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: "include"
        });

        // Convertendo a resposta para json
        const data = await response.json();

        

        return data.dados.setores;
    } catch (err) {
    }
}

export default async function Setores() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    const setores = await getSetores(token);
    

    return (
        <PageSetores setores={setores}/>
    )
}