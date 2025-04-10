import React from 'react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'

const data = [
  { name: 'Mon', total: 2400 },
  { name: 'Tue', total: 1398 },
  { name: 'Wed', total: 9800 },
  { name: 'Thu', total: 3908 },
  { name: 'Fri', total: 4800 },
  { name: 'Sat', total: 3800 },
  { name: 'Sun', total: 4300 },
]

export function SubscriptionChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888" />
        <YAxis stroke="#888" />
        <Tooltip />
        <Bar dataKey="total" fill="#fff" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
