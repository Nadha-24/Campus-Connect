import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  if (!isAuthenticated) return null;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/clubs" className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-600">Campus Connect</h1>
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/clubs"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive('/clubs')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              Clubs
            </Link>

            <Link
              to="/registrations"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive('/registrations')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              My Registrations
            </Link>

            <Link
              to="/profile"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive('/profile')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              Profile
            </Link>

            <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200">
              <div className="text-sm">
                <p className="text-gray-900 font-medium">{currentUser?.name}</p>
                <p className="text-gray-500 text-xs">{currentUser?.major}</p>
              </div>
              <button
                onClick={handleLogout}
                className="btn-secondary text-sm px-4 py-1"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
