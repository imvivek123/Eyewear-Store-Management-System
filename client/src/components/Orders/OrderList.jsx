import { useEffect, useState } from 'react';
import OrderCard from './OrderCard';
import api from '../../services/api';

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  const fetchOrders = async () => {
    try {
      const url = filter ? `/orders?status=${filter}` : '/orders';
      const response = await api.get(url);
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setFilter('')}
          className={`px-4 py-2 rounded ${!filter ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded ${filter === 'pending' ? 'bg-yellow-600 text-white' : 'bg-gray-300'}`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter('processing')}
          className={`px-4 py-2 rounded ${filter === 'processing' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
        >
          Processing
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded ${filter === 'completed' ? 'bg-green-600 text-white' : 'bg-gray-300'}`}
        >
          Completed
        </button>
      </div>
      <div>
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
