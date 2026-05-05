import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await api.get('/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('Failed to fetch customers:', error);
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
            <th className="border p-3 text-left">Phone</th>
            <th className="border p-3 text-left">Email</th>
            <th className="border p-3 text-left">DOB</th>
            <th className="border p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className="hover:bg-gray-50">
              <td className="border p-3">{customer.name}</td>
              <td className="border p-3">{customer.phone}</td>
              <td className="border p-3">{customer.email}</td>
              <td className="border p-3">{customer.date_of_birth}</td>
              <td className="border p-3">
                <button className="text-blue-600 hover:underline mr-2">
                  Edit
                </button>
                <button className="text-green-600 hover:underline">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
