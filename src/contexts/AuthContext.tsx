import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials, RegisterCredentials } from '@/types/user';
import { storage, STORAGE_KEYS } from '@/services/storage';

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: Partial<User>) => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function restoreSession() {
      try {
        const storedToken = await storage.getItem(STORAGE_KEYS.AUTH_TOKEN);
        const storedUser = await storage.getObject<User>(STORAGE_KEYS.USER_DATA);

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(storedUser);
        }
      } catch (error) {
        console.error('Failed to restore auth session:', error);
      } finally {
        setIsLoading(false);
      }
    }

    restoreSession();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      // Simulação de chamada de autenticação (substituir pela chamada à API real)
      await new Promise((resolve) => setTimeout(resolve, 800));

      const fakeToken = 'jwt_token_' + Date.now();
      const fakeUser: User = {
        id: 'usr_1',
        name: credentials.email.split('@')[0].toUpperCase(),
        email: credentials.email,
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        role: 'Desenvolvedor',
        createdAt: new Date().toISOString(),
      };

      await storage.setItem(STORAGE_KEYS.AUTH_TOKEN, fakeToken);
      await storage.setObject(STORAGE_KEYS.USER_DATA, fakeUser);

      setToken(fakeToken);
      setUser(fakeUser);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const fakeToken = 'jwt_token_' + Date.now();
      const fakeUser: User = {
        id: 'usr_' + Date.now(),
        name: credentials.name,
        email: credentials.email,
        role: 'Usuário',
        createdAt: new Date().toISOString(),
      };

      await storage.setItem(STORAGE_KEYS.AUTH_TOKEN, fakeToken);
      await storage.setObject(STORAGE_KEYS.USER_DATA, fakeUser);

      setToken(fakeToken);
      setUser(fakeUser);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await storage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      await storage.removeItem(STORAGE_KEYS.USER_DATA);
      setToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = (updatedFields: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updatedFields };
    setUser(updated);
    storage.setObject(STORAGE_KEYS.USER_DATA, updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
