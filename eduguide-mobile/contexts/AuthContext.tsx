import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'expo-router';

interface User {
  id: string;
  username: string;
  role: string;

}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuthState();
  }, []);

  // Check auth state
  const checkAuthState = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('authToken');
      
      if (storedToken) {
        const decoded: any = jwtDecode(storedToken);
        const currentTime = Date.now() / 1000;
        
        // Check if token is expired
        if (decoded.exp < currentTime) {
          await AsyncStorage.removeItem('authToken');
          return;
        }

        const user: User = {
          id: decoded.id,
          username: decoded.username,
          role: decoded.role,
        };

        setUser(user);
        setToken(storedToken);

        // Auto-navigate based on role
        if (decoded.role === 'student') {
          router.replace('/(student)/homeScreen');
        } else if (decoded.role === 'instructor') {
          (router.replace as any)('/(instructor)/dashboard');
        }
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
      await AsyncStorage.removeItem('authToken');
    } finally {
      setIsLoading(false);
    }
  };

  // Login
  const login = async (authToken: string) => {
    try {
      const decoded: any = jwtDecode(authToken);
      const user: User = {
        id: decoded.id,
        username: decoded.username,
        role: decoded.role,
      };

      setUser(user);
      setToken(authToken);

      await AsyncStorage.setItem('authToken', authToken);

    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      setUser(null);
      setToken(null);
      router.replace('/(auth)/login');

    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    // Provide auth context
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );


}

export function useAuth() {

  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
