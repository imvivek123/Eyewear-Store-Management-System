import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function InventoryTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/inventory');
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
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
            <th className="border p-3 text-left">Name</th>
            <th className="border p-3 text-left">Brand</th>
            <th className="border p-3 text-left">SKU</th>
            <th className="border p-3 text-left">Category</th>
            <th className="border p-3 text-right">Price</th>
            <th className="border p-3 text-right">Stock</th>
            <th className="border p-3 text-left">Status</th>
            <th className="border p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="border p-3">{product.name}</td>
              <td className="border p-3">{product.brand}</td>
              <td className="border p-3">{product.sku}</td>
              <td className="border p-3 text-xs bg-blue-100">{product.category}</td>
              <td className="border p-3 text-right">${product.price}</td>
              <td className="border p-3 text-right font-semibold">{product.stock_quantity}</td>
              <td className="border p-3">
                {product.stock_quantity <= product.low_stock_threshold ? (
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                    Low Stock
                  </span>
                ) : (
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                    In Stock
                  </span>
                )}
              </td>
              <td className="border p-3">
                <button className="text-blue-600 hover:underline mr-2">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
