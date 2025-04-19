// components/Sidebar.js
import React from 'react';
import { BarChart2, BookOpen, Flag, Layout, LogOut, Menu, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore'; // Import the Zustand auth store



export function SidebarToggle({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <button
      onClick={toggleSidebar}
      className="p-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none"
    >
      <Menu className="h-6 w-6" />
    </button>
  );
}

const navigation = [
  { name: 'Dashboard', icon: Layout, href: '#dashboard' },
  { name: 'Skills', icon: BookOpen, href: '#skills' },
  { name: 'Goals', icon: Target, href: '#goals' },
  { name: 'Progress', icon: BarChart2, href: '#progress' },
  { name: 'Achievements', icon: Flag, href: '#achievements' },
];

export function Sidebar() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout); // Get logout from Zustand store

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear the token from localStorage
    logout(); // Clear the user state from Zustand store
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="flex h-screen w-64 flex-col bg-gray-900 text-white">
      {/* Header */}
      <div className="flex h-16 items-center justify-center border-b border-gray-800">
        <h1 className="text-xl font-bold">Learning Tracker</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </a>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="border-t border-gray-800 p-4">
        <button
          onClick={handleLogout}
          className="flex items-center text-red-500 hover:text-red-600 text-sm px-3 py-2"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
}
