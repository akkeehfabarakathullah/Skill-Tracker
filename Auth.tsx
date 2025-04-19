import React, { useState } from 'react'; 
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import Lottie from 'lottie-react';
import componentsAnimation from '../assets/animation - 1744966881849.json';

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  const { login, register } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(email, password);
        toast.success('Welcome back!');
      } else {
        await register(email, password, name);
        toast.success('Registration successful!');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <div className={`min-h-screen flex flex-col md:flex-row items-center justify-center transition-colors duration-300 ${darkMode ? 'bg-zinc-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      
      {/* Lottie Animation - Left Side */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-6">
        <Lottie
          animationData={componentsAnimation}
          loop={true}
          className="w-80 h-80 md:w-[500px] md:h-[500px]"
        />
      </div>

      {/* Auth Form - Right Side */}
      <div className={`w-full md:w-1/2 max-w-md space-y-8 p-8 rounded-xl shadow-lg ${darkMode ? 'bg-zinc-800' : 'bg-white'}`}>
        <div className="text-center">
          <h2 className="text-3xl font-extrabold">
            {isLogin ? 'Welcome back!' : 'Create your account'}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black"
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLogin ? 'Sign in' : 'Register'}
            </button>
          </div>
        </form>
        <div className="text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-indigo-400 hover:text-indigo-300"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
        <div className="text-center mt-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-xs underline"
          >
            Switch to {darkMode ? 'Light' : 'Dark'} Mode
          </button>
        </div>
      </div>
    </div>
  );
}
