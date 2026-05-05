import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function SalesTable() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await api.get('/sales');
      setSales(response.data);
    } catch (error) {
      console.error('Failed to fetch sales:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-3 text-left">Sale ID</th>
            <th className="border p-3 text-left">Customer</th>
            <th className="border p-3 text-left">Product</th>
            <th className="border p-3 text-right">Quantity</th>
            <th className="border p-3 text-right">Total</th>
            <th className="border p-3 text-left">Date</th>
            <th className="border p-3 text-left">Store</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id} className="hover:bg-gray-50">
              <td className="border p-3">{sale.id}</td>
              <td className="border p-3">{sale.customer_id}</td>
              <td className="border p-3">{sale.product_id}</td>
              <td className="border p-3 text-right">{sale.quantity}</td>
              <td className="border p-3 text-right font-semibold">${sale.total_price.toFixed(2)}</td>
              <td className="border p-3">{new Date(sale.sale_date).toLocaleDateString()}</td>
              <td className="border p-3">{sale.store_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
