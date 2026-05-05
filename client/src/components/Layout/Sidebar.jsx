import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Sidebar() {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const isActive = (path) => location.pathname === path ? 'bg-blue-700' : '';

  if (!user) return null;

  return (
    <aside className="w-64 bg-blue-800 text-white min-h-screen">
      <div className="p-4">
        <h2 className="text-lg font-bold mb-8">Menu</h2>
        <nav className="space-y-2">
          <Link
            to="/dashboard"
            className={`block p-3 rounded ${isActive('/dashboard')} hover:bg-blue-700`}
          >
            Dashboard
          </Link>
          <Link
            to="/customers"
            className={`block p-3 rounded ${isActive('/customers')} hover:bg-blue-700`}
          >
            Customers
          </Link>
          <Link
            to="/inventory"
            className={`block p-3 rounded ${isActive('/inventory')} hover:bg-blue-700`}
          >
            Inventory
          </Link>
          <Link
            to="/sales"
            className={`block p-3 rounded ${isActive('/sales')} hover:bg-blue-700`}
          >
            Sales
          </Link>
          <Link
            to="/orders"
            className={`block p-3 rounded ${isActive('/orders')} hover:bg-blue-700`}
          >
            Orders
          </Link>
          {user.role === 'hq' && (
            <Link
              to="/hq"
              className={`block p-3 rounded ${isActive('/hq')} hover:bg-blue-700`}
            >
              HQ Dashboard
            </Link>
          )}
        </nav>
      </div>
    </aside>
  );
}
