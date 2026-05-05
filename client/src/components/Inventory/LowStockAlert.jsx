import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function LowStockAlert() {
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetchLowStock();
  }, []);

  const fetchLowStock = async () => {
    try {
      const response = await api.get('/inventory/low-stock');
      setLowStockProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch low stock:', error);
    }
  };

  if (lowStockProducts.length === 0) return null;

  return (
    <div className="bg-red-50 border border-red-300 rounded p-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full font-bold text-red-700"
      >
        <span>
          ⚠️ Low Stock Alert ({lowStockProducts.length} products)
        </span>
        <span>{expanded ? '▼' : '▶'}</span>
      </button>
      {expanded && (
        <div className="mt-3 space-y-2">
          {lowStockProducts.map((product) => (
            <div key={product.id} className="bg-white p-2 rounded text-sm border-l-4 border-red-500">
              <p className="font-semibold">{product.name} ({product.brand})</p>
              <p className="text-gray-600">
                Current: {product.stock_quantity} / Threshold: {product.low_stock_threshold}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
