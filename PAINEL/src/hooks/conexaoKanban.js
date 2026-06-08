import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import { API_URL } from '@/lib/utils';

const API_BASE_URL = API_URL + '/painel';

export function conexaoKanban({ conectOnMount = true }) {
    const [chamados, setChamados] = useState([]);

    useEffect(() => {
        if (!conectOnMount) return;

        // Fazendo requisição á API
        fetch(`${API_BASE_URL}/chamados`)
            .then(res => res.json())
            .then(data => setChamados(data.dados.painel));

        // Abrindo conexão SSE
        const eventSource = new EventSource(API_BASE_URL);

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);

            console.log("Evento recebido:", data);

            if (data.tipo === "NOVO_CHAMADO") {
                // setChamados(prev => [...prev, data.chamado]);
                console.log(data);
            }

            if (data.tipo === "STATUS_ATUALIZADO") {
                console.log(data);

                // setChamados(prev =>
                //     prev.map(c =>
                //         c.id === data.chamado.id ? data.chamado : c
                //     )
                // );
            }
        };

        eventSource.onerror = (err) => {
            console.error("Erro SSE:", err);
        };

        return () => {
            eventSource.close();
        };
    }, [conectOnMount]);

    return { chamados };
}