import React, { createContext, useContext, useState, useCallback } from 'react';
import type { User } from '../types';
import { mockUsers } from '../mock-data';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: 'user' | 'admin') => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Check localStorage for persisted user
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = useCallback(async (email: string, _password: string): Promise<void> => {
    // Mock login - in real app, this would call an API
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // Simple mock: check against mock users
        const mockUser = Object.values(mockUsers).find((u) => u.email === email);
        if (mockUser) {
          setUser(mockUser);
          localStorage.setItem('currentUser', JSON.stringify(mockUser));
          resolve();
        } else {
          throw new Error('Invalid email or password');
        }
      }, 1000);
    });
  }, []);

  const signup = useCallback(
    async (email: string, _password: string, name: string, role: 'user' | 'admin'): Promise<void> => {
      // Mock signup - in real app, this would call an API
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          const newUser: User = {
            id: Date.now().toString(),
            email,
            name,
            role,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          setUser(newUser);
          localStorage.setItem('currentUser', JSON.stringify(newUser));
          resolve();
        }, 1000);
      });
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('currentUser');
  }, []);

  const updateUser = useCallback((updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
