import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { FaRocket, FaSignOutAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Navbar = ({ user, currentPage, setCurrentPage }) => {
  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem('finquest_user');
    window.location.reload();
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'learn', label: 'Learn', icon: '📚' },
    { id: 'portfolio', label: 'Portfolio', icon: '💼' },
    { id: 'goals', label: 'Goals', icon: '🎯' },
    { id: 'scam', label: 'Scam Alert', icon: '⚠️' }
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <FaRocket className="text-primary text-2xl" />
            <span className="text-xl font-bold text-gray-800">FinQuest</span>
          </div>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                  currentPage === item.id
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:text-primary hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </motion.button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Welcome, {user?.displayName || user?.email?.split('@')[0]}
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
            >
              <FaSignOutAlt />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex space-x-2 overflow-x-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg whitespace-nowrap transition-all ${
                  currentPage === item.id
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:text-primary hover:bg-gray-100'
                }`}
              >
                <span>{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;