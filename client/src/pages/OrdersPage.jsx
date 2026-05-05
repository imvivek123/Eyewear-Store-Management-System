import { useState } from 'react';
import OrderList from '../components/Orders/OrderList';
import OrderForm from '../components/Orders/OrderForm';

export default function OrdersPage() {
  const [refresh, setRefresh] = useState(0);

  const handleSuccess = () => {
    setRefresh(refresh + 1);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>
      <OrderForm onSuccess={handleSuccess} />
      <OrderList key={refresh} />
    </div>
  );
}
