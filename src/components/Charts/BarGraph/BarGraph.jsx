import React from 'react'
import { BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function BarGraph({ data, xAxis, yAxis, children }) {
    return (
        <ResponsiveContainer width='100%' height='100%'>
            <Tooltip />
            <BarChart data={data}>
                {children}
                {xAxis &&
                    <XAxis
                        dataKey={xAxis}
                        tick={{ fontSize: 12 }}
                        tickLine={false} />}

                {yAxis &&
                    <YAxis
                        tick={{ fontSize: 10 }}
                        tickLine={false} />}
            </BarChart>
        </ResponsiveContainer>
    )
}
