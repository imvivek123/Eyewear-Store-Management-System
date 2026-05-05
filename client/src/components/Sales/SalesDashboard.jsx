import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function SalesDashboard() {
  const [todayTotal, setTodayTotal] = useState(0);
  const [monthTotal, setMonthTotal] = useState(0);

  useEffect(() => {
    fetchTotals();
  }, []);

  const fetchTotals = async () => {
    try {
      const summary = await api.get('/sales/summary');
      const today = new Date().toISOString().split('T')[0];
      const todaySale = summary.data.find(s => s.date === today);
      setTodayTotal(todaySale?.total || 0);
      setMonthTotal(summary.data.reduce((sum, s) => sum + s.total, 0));
    } catch (error) {
      console.error('Failed to fetch sales totals:', error);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
        <h4 className="text-sm font-semibold text-gray-600">Today's Sales</h4>
        <p className="text-2xl font-bold text-green-600">${todayTotal.toFixed(2)}</p>
      </div>
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <h4 className="text-sm font-semibold text-gray-600">Month Total</h4>
        <p className="text-2xl font-bold text-blue-600">${monthTotal.toFixed(2)}</p>
      </div>
    </div>
  );
}
