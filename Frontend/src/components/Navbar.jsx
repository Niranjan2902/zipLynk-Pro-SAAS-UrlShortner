import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, User, LogOut, Home } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <Link to="/" className="flex items-center text-white font-bold text-xl">
            <span className="mr-2">🔗</span> ZipLynk Pro
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/dashboard" className="text-white hover:text-blue-200 flex items-center">
                  <User className="mr-1 h-4 w-4" /> Dashboard
                </Link>
                <button onClick={() => { logout(); navigate('/'); }} className="text-white hover:text-red-200 flex items-center">
                  <LogOut className="mr-1 h-4 w-4" /> Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="text-white hover:text-blue-200 flex items-center">
                <LogIn className="mr-1 h-4 w-4" /> Login
              </Link>
            )}
          </div>
          <button className="md:hidden text-white" onClick={() => navigate(user ? '/dashboard' : '/login')}>
            {user ? <User className="h-6 w-6" /> : <LogIn className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </nav>
  );
}