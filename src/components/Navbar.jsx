import { Link, useLocation, useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';

export default function Navbar() {
  const { pathname } = useLocation();
  const logout = useStore((state) => state.logout);
  const navigate = useNavigate();

  // Hide navbar on login page
  if (pathname === '/') return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <div className="text-xl font-bold text-blue-600">📚 Bayesn Library App</div>
      <div className="space-x-4">
        <Link to="/categories" className="text-blue-500 hover:underline">
          Categories
        </Link>
        <Link to="/catalogue" className="text-blue-500 hover:underline">
          Catalogue
        </Link>
        <Link to="/checkout" className="text-blue-500 hover:underline">
          Checkout
        </Link>
        <button
          onClick={handleLogout}
          className="text-red-500 hover:underline ml-4"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
