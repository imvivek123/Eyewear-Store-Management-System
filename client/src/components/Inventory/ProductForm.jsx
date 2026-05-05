import { useState } from 'react';
import api from '../../services/api';

export default function ProductForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: 'frame',
    sku: '',
    price: '',
    stock_quantity: '',
    low_stock_threshold: 5
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/inventory', formData);
      setFormData({
        name: '',
        brand: '',
        category: 'frame',
        sku: '',
        price: '',
        stock_quantity: '',
        low_stock_threshold: 5
      });
      onSuccess?.();
    } catch (error) {
      console.error('Failed to add product:', error);
      alert('Failed to add product');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-4">
      <h3 className="text-lg font-bold mb-4">Add New Product</h3>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="sku"
          placeholder="SKU"
          value={formData.sku}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="frame">Frame</option>
          <option value="lens">Lens</option>
          <option value="accessory">Accessory</option>
        </select>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          step="0.01"
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="stock_quantity"
          placeholder="Stock Quantity"
          value={formData.stock_quantity}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="low_stock_threshold"
          placeholder="Low Stock Threshold"
          value={formData.low_stock_threshold}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Add Product
      </button>
    </form>
  );
}
