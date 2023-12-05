import React, { createContext, useContext, useState, ReactNode } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export enum UserRole {
  admin = 'admin',
  user = 'user',
}

export interface UserModel {
  username: string;
  password: string;
  name: string;
  account_role: UserRole;
}

export interface AuthContextProps {
  user: string | null;
  login: (userModel: UserModel) => void;
  logout: () => void;
  validateCredentials: (userModel: UserModel) => boolean;
  getUserInfo: () => UserModel;
  isAdmin: () => boolean;
  isUser: () => boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const initialUser: string | null = localStorage.getItem('user') || null;

const initialValidCredentials: UserModel[] = [
  { username: 'admin', password: 'admin', name: 'Admin', account_role: UserRole.admin },
  { username: 'user', password: 'user', name: 'user', account_role: UserRole.user },
];

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(initialUser);
  const [validCredentials] = useState<UserModel[]>(initialValidCredentials);

  const login = (userModel: UserModel) => {
    if (validateCredentials(userModel)) {
      setUser(userModel.username);
      localStorage.setItem('user', userModel.username);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const validateCredentials = (userModel: UserModel) => {
    return validCredentials.some(
      (cred) => cred.username === userModel.username && cred.password === userModel.password
    );
  };

  const getUserInfo = (): UserModel => {
    const userInfo: UserModel | undefined = validCredentials.find((cred) => cred.username === user);
    return userInfo || { username: '', password: '', name: '', account_role: UserRole.admin };
  };
 


  const value: AuthContextProps = {
    user,
    login,
    logout,
    validateCredentials,
    getUserInfo,
    isAdmin: () => getUserInfo().account_role === UserRole.admin,
    isUser: () => getUserInfo().account_role === UserRole.user,
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
// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth, AuthContext };
