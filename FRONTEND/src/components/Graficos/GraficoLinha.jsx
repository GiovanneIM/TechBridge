'use client'

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
}) {
    return (
        <ResponsiveContainer width="100%" height="100%" className='min-h-100'>
            <LineChart data={data}>
                <CartesianGrid vertical={false} opacity={0.3} />

                <XAxis dataKey={xDataKey} />

                <Tooltip />

                {/* <Line type="monotone" dataKey="aberto" stroke={cores.aberto} strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="andamento" stroke={cores.andamento} strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="concluido" stroke={cores.concluido} strokeWidth={2} dot={false} /> */}

                {linhas.map((linha) => (
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
    )
}