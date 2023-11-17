// AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

export class Model {
  username!: string;
  password!: string;
  name!: string;
}

export class AuthContextProps {
  user!: string | null;
  login!: (model: Model) => void;
  logout!: () => void;
  validateCredentials!: (model: Model) => boolean;
  getUserInfo!: () => Model;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<string | null>(localStorage.getItem('user') || null);

  const validCredentials: Model[] = [
    { username: 'admin', password: 'admin', name: 'Admin' },
    { username: 'user1', password: 'pass1', name: 'User1' },
  ];

  const login = (model: Model) => {
    if (validateCredentials(model)) {
      setUser(model.username);
      localStorage.setItem('user', model.username);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const validateCredentials = (model: Model) => {
    return validCredentials.some(
      (cred) => cred.username === model.username && cred.password === model.password
    );
  };

  const getUserInfo = (): Model => {
    const userInfo: Model | undefined = validCredentials.find(
      (cred) => cred.username === user
    );
    return userInfo || { username: '', password: '', name: '' };
  };

  const value: AuthContextProps = {
    user,
    login,
    logout,
    validateCredentials,
    getUserInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
