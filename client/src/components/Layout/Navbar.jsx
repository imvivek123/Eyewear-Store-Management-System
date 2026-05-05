import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">
        Eyewear Store Management
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm">
          {user ? `${user.username} (${user.role})` : 'Guest'}
        </span>
        {user && (
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-700 px-3 py-1 rounded text-sm"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
