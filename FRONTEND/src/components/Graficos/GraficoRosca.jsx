'use client'

import { useEffect, useState } from "react";
import {
    ResponsiveContainer,
    Tooltip,
    PieChart,
    Pie,
} from "recharts"

export default function GraficoRosca({
    data = [],
    series = [],
    selects = false,
}) {
    const [seriesGrafico, setSeriesGrafico] = useState({});


    // INICIALIZANDO AS SÉRIES
    useEffect(() => {
        const initialState = {};
        series.forEach((serie) => {
            initialState[serie.dataKey] = true;
        });
        setSeriesGrafico(initialState);
    }, [series]);


    // FUNÇÃO PARA O TOGGLE
    const toggleSerie = (key) => {
        setSeriesGrafico(prev => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    
    const chartData = series
        .filter(serie => seriesGrafico[serie.dataKey])
        .map(serie => {
            const item = data.find(d => d.estado === serie.dataKey);

            return {
                estado: serie.name,
                total: item?.total ?? 0,
                fill: serie.color
            };
        });

    const total = chartData.reduce((acc, cur) => acc + cur.total, 0);


    return (<>
        {/* SELECTS */}
        {selects && <>
            <div className="flex gap-3 flex-wrap">
                {series.map(serie => {
                    const ativo = seriesGrafico[serie.dataKey] ?? true;

                    return (
                        <div
                            key={serie.dataKey}
                            onClick={() => toggleSerie(serie.dataKey)}
                            className={`
                    flex items-center gap-2 cursor-pointer px-3 py-1.5 rounded-md border
                    transition-all duration-150
                    ${!ativo && "bg-gray-100 border-gray-200 opacity-60"}
                    hover:bg-blue-100
                `}
                        >
                            <span
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: serie.color }}
                            />

                            <span className="text-sm font-medium">
                                {serie.name}
                            </span>
                        </div>
                    );
                })}
            </div>

        </>}

        {/* GRÁFICO */}
        <div className="border rounded p-2">
            <ResponsiveContainer width="100%" height="100%" className='min-h-100'>

                <PieChart>
                    <Tooltip />

                    <Pie
                        data={chartData}
                        dataKey="total"
                        nameKey="estado"
                        innerRadius="60%"
                        outerRadius="80%"
                        strokeWidth={3}
                    />

                    <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="font-genty"
                    >
                        <tspan x="50%" dy="-10" className="text-md text-gray-500">
                            Total
                        </tspan>
                        <tspan x="50%" dy="20" className="text-3xl">
                            {total}
                        </tspan>
                    </text>

                </PieChart>
            </ResponsiveContainer>
        </div>
    </>)
}