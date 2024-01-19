import React from 'react'
import { AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts'

export default function AreaGraph({ data, xAxis, yAxis, children }) {
    return (
        <ResponsiveContainer width='100%' height='100%' isAnimationActive={true}>
            <AreaChart data={data}>
                <Tooltip />
                {children}
                {
                    xAxis &&
                    <XAxis
                        dataKey={xAxis}
                        tick={{ fontSize: 12 }}
                        axisLine={false}
                        tickLine={false} />
                }
                {
                    yAxis &&
                    <YAxis
                        tick={{ fontSize: 10 }}
                        axisLine={false}
                        tickLine={false} />
                }
            </AreaChart>
        </ResponsiveContainer>
    )
}
