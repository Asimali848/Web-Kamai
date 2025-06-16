import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, User } from '@/types';
import { toast } from '@/hooks/use-toast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo with wallet balances
const mockUsers: User[] = [
  { id: '1', email: 'admin@taskflow.com', name: 'Admin User', role: 'admin', walletBalance: 0 },
  { id: '2', email: 'uploader@taskflow.com', name: 'Task Creator', role: 'uploader', walletBalance: 500 },
  { id: '3', email: 'user@taskflow.com', name: 'Task Worker', role: 'user', walletBalance: 125 },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user session
    const savedUser = localStorage.getItem('taskflow_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Mock authentication
      const user = mockUsers.find(u => u.email === email);
      if (user && password === 'password') {
        setUser(user);
        localStorage.setItem('taskflow_user', JSON.stringify(user));
        toast({
          title: "Welcome back!",
          description: `Logged in as ${user.role}`,
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string, role: 'uploader' | 'user') => {
    setLoading(true);
    try {
      // Mock user creation
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        role,
        walletBalance: role === 'uploader' ? 100 : 0, // Give uploaders starting balance
      };
      setUser(newUser);
      localStorage.setItem('taskflow_user', JSON.stringify(newUser));
      toast({
        title: "Account created!",
        description: `Welcome to TaskFlow as a ${role}`,
      });
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "Something went wrong",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('taskflow_user');
    toast({
      title: "Logged out",
      description: "See you next time!",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};