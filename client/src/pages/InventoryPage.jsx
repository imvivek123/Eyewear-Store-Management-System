import { useState } from 'react';
import InventoryTable from '../components/Inventory/InventoryTable';
import ProductForm from '../components/Inventory/ProductForm';
import LowStockAlert from '../components/Inventory/LowStockAlert';

export default function InventoryPage() {
  const [refresh, setRefresh] = useState(0);

  const handleSuccess = () => {
    setRefresh(refresh + 1);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Inventory Management</h1>
      <LowStockAlert />
      <ProductForm onSuccess={handleSuccess} />
      <InventoryTable key={refresh} />
    </div>
  );
}
