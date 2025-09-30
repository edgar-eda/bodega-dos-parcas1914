import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { User, Address } from '../types';
import { USERS } from '../constants'; // We'll use this for mock auth

interface AuthContextType {
  user: User | null;
  users: User[];
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
  register: (name: string, email: string, password: string, address: Address) => Promise<User | null>;
  updateUserRole: (userId: number, newRole: 'client' | 'admin') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return null;
    }
  });

  const [users, setUsers] = useState<User[]>(() => {
    try {
      const storedUsers = localStorage.getItem('users');
      // Initialize with mock data if localStorage is empty
      return storedUsers ? JSON.parse(storedUsers) : [...USERS];
    } catch (error) {
        console.error("Failed to parse users from localStorage", error);
        return [...USERS];
    }
  });

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<User | null> => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const { password, ...userToStore } = foundUser;
      setUser(userToStore as User);
      return userToStore as User;
    }
    return null;
  };
  
  const logout = () => {
    setUser(null);
  };

  const register = async (name: string, email: string, password: string, address: Address): Promise<User | null> => {
    if (users.some(u => u.email === email)) {
      return null; // User already exists
    }
    const newUser: User = {
      id: Date.now(),
      name,
      email,
      password,
      role: 'client',
      address,
    };
    setUsers(prevUsers => [...prevUsers, newUser]);
    const { password: _, ...userToStore } = newUser;
    setUser(userToStore);
    return userToStore;
  };

  const updateUserRole = (userId: number, newRole: 'client' | 'admin') => {
    setUsers(prevUsers => 
        prevUsers.map(u => u.id === userId ? { ...u, role: newRole } : u)
    );
  };

  return (
    <AuthContext.Provider value={{ user, users, login, logout, register, updateUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};