'use client'

import { useEffect, useState } from "react";
import {
    CartesianGrid,
    Line,
    LineChart,
    XAxis,
    ResponsiveContainer,
    Tooltip,
} from "recharts"

export default function GraficoLinha({
    data = [],
    linhas = [],
    xDataKey = "data",
    selects = false,
}) {
    const [seriesGrafico, setSeriesGrafico] = useState({});


    // INICIALIZANDO AS SÉRIES
    useEffect(() => {
        const initialState = {};
        linhas.forEach((linha) => {
            initialState[linha.dataKey] = true;
        });
        setSeriesGrafico(initialState);
    }, [linhas]);


    // FUNÇÃO PARA O TOGGLE
    const toggleSerie = (key) => {
        setSeriesGrafico(prev => ({
            ...prev,
            [key]: !prev[key],
        }));
    };


    // filtrar linhas ativas
    const linhasAtivas = linhas.filter(linha => seriesGrafico[linha.dataKey]);

    return (<>
        {/* SELECTS */}
        {selects && <>
            <div className="flex gap-3 flex-wrap">
                {linhas.map(linha => {
                    const ativo = seriesGrafico[linha.dataKey] ?? true;

                    return (
                        <div
                            key={linha.dataKey}
                            onClick={() => toggleSerie(linha.dataKey)}
                            className={`
                    flex items-center gap-2 cursor-pointer px-3 py-1.5 rounded-md border
                    transition-all duration-150
                    ${!ativo && "bg-gray-100 border-gray-200 opacity-60"}
                    hover:bg-blue-100
                `}
                        >
                            <span
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: linha.color }}
                            />

                            <span className="text-sm font-medium">
                                {linha.name}
                            </span>
                        </div>
                    );
                })}
            </div>

        </>}

        {/* GRÁFICO */}
        <div className="border rounded p-2">
            <ResponsiveContainer width="100%" height="100%" className='min-h-100'>
                <LineChart data={data} >
                    <CartesianGrid vertical={false} opacity={0.3} />

                    <XAxis dataKey={xDataKey} />

                    <Tooltip />

                    {linhasAtivas.map((linha) => (
                        <Line
                            key={linha.dataKey}
                            type="monotone"
                            dataKey={linha.dataKey}
                            stroke={linha.color}
                            strokeWidth={linha.strokeWidth ?? 2}
                            dot={linha.dot ?? false}
                            name={linha.name}
                        />
                    ))}

                </LineChart>
            </ResponsiveContainer>
        </div>
    </>)
}