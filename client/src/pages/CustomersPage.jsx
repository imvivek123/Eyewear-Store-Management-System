import { useState } from 'react';
import CustomerList from '../components/Customers/CustomerList';
import CustomerForm from '../components/Customers/CustomerForm';

export default function CustomersPage() {
  const [refresh, setRefresh] = useState(0);

  const handleSuccess = () => {
    setRefresh(refresh + 1);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Customers</h1>
      <CustomerForm onSuccess={handleSuccess} />
      <CustomerList key={refresh} />
    </div>
  );
}
