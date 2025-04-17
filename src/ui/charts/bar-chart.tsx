import {
  Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip
} from 'recharts'
import React, { useState, useEffect } from 'react'

type DataInfo = {
  rol: string
  count_users: number
}

interface DataBarChartProps {
  data: DataInfo[]
}

export function GraphicBarChart({ data }: DataBarChartProps) {
  const [dataBar, setDataBar] = useState<DataInfo[]>(data);
  const [selectedRol, setSelectedRol] = useState<string>('Todos');

  useEffect(() => {
    if (selectedRol === 'Todos') {
      setDataBar(data);
    } else {
      setDataBar(data.filter(item => item.rol === selectedRol));
    }
  }, [data, selectedRol]);

  const roles = ['Todos', ...Array.from(new Set(data.map(item => item.rol)))];

  return (
    <div>
      <div className="mb-4 pl-16 w-full">
        <label className="text-white mr-2">Seleccionar rol:</label>
        <select
          value={selectedRol}
          onChange={(e) => setSelectedRol(e.target.value)}
          className="bg-gray-800 text-white px-2 py-1 rounded"
        >
         {roles.map(rol => (
            <option key={rol} value={rol}>{rol}</option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={dataBar}>
          <XAxis dataKey="rol" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip />
          <Bar dataKey="count_users" fill="#fff" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
