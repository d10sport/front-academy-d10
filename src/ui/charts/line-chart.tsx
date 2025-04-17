import React, { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

type DataInfo = {
  year: number
  month: number
  registered_users: number
}

interface DataLineChartProps {
  data: DataInfo[]
}

export const Mounths = {
  1: 'Enero',
  2: 'Febrero',
  3: 'Marzo',
  4: 'Abril',
  5: 'Mayo',
  6: 'Junio',
  7: 'Julio',
  8: 'Agosto',
  9: 'Septiembre',
  10: 'Octubre',
  11: 'Noviembre',
  12: 'Diciembre'
}

export function GraphicLineBarChart({ data }: DataLineChartProps) {
  const yearToday = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(data[0]?.year || yearToday)

  const allData = data.reduce((acc, item) => {
    const monthName = Mounths[item.month];
    if (!acc[item.year]) {
      acc[item.year] = [];
    }
    acc[item.year].push({
      name: monthName,
      total: item.registered_users
    });
    return acc;
  }, {});

  const handleChange = (e) => {
    setSelectedYear(e.target.value)
  }

  return (
    <div>
      {/* Filtro por año */}
      <div className="mb-4 pl-16 w-full">
        <label className="text-white mr-2">Seleccionar año:</label>
        <select
          value={selectedYear}
          onChange={handleChange}
          className="bg-gray-800 text-white px-2 py-1 rounded"
        >
          {Object.keys(allData).map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {/* Gráfico */}
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={allData[selectedYear]}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="name" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="#fff" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
