import React from 'react'
import { ResponsiveContainer, PieChart, Tooltip  , Pie ,Cell} from 'recharts'

export default function PieGraph({ data, dataKey }) {
    const COLORS = ['var(--green)', 'var(--warning)', 'var(--coral-color)' , 'var(--purple)'];
    return (
        <ResponsiveContainer width='100%' height='100%'>
            <PieChart >
                <Tooltip />
                <Pie innerRadius={40} outerRadius={105} data={data} dataKey={dataKey} >
                    {data?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    )
}
