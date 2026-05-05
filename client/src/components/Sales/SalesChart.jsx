import { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '../../services/api';

export default function SalesChart() {
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState('line');

  useEffect(() => {
    fetchSalesSummary();
  }, []);

  const fetchSalesSummary = async () => {
    try {
      const response = await api.get('/sales/summary');
      setData(response.data);
    } catch (error) {
      console.error('Failed to fetch sales summary:', error);
    }
  };

  const Chart = chartType === 'line' ? LineChart : BarChart;
  const ChartComponent = chartType === 'line' ? Line : Bar;

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Sales Chart (Last 30 Days)</h3>
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="line">Line Chart</option>
          <option value="bar">Bar Chart</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <Chart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <ChartComponent
            type="monotone"
            dataKey="total"
            stroke="#2563eb"
            fill="#1e40af"
            name="Daily Revenue"
          />
        </Chart>
      </ResponsiveContainer>
    </div>
  );
}
