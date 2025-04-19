import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: async (email: string, password: string) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((u: User & { password: string }) => 
          u.email === email && u.password === password
        );
        
        if (!user) {
          throw new Error('Invalid credentials');
        }
        
        const { password: _, ...userWithoutPassword } = user;
        set({ user: userWithoutPassword });
      },
      register: async (email: string, password: string, name: string) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        if (users.some((u: User) => u.email === email)) {
          throw new Error('Email already exists');
        }
        
        const newUser = {
          id: crypto.randomUUID(),
          email,
          password,
          name,
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        const { password: _, ...userWithoutPassword } = newUser;
        set({ user: userWithoutPassword });
      },
      logout: () => {
        localStorage.removeItem('user'); 
        set({ user: null });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);