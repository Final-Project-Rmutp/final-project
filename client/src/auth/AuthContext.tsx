// AuthContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export enum UserRole {
  admin = 'admin',
  user = 'user',
}

interface AuthContextProps {
  user: { account_role?: UserRole };
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Your user authentication logic here
  const user = { account_role: UserRole.user }; // Replace with your actual authentication logic

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
