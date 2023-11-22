import React, { createContext, useContext, useState, ReactNode } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export enum UserRole {
  admin = 'admin',
  teacher = 'teacher',
  student = 'student',
}

export interface UserModel {
  username: string;
  password: string;
  name: string;
  role: UserRole;
}

export interface AuthContextProps {
  user: string | null;
  login: (userModel: UserModel) => void;
  logout: () => void;
  validateCredentials: (userModel: UserModel) => boolean;
  getUserInfo: () => UserModel;
  isAdmin: () => boolean;
  isTeacher: () => boolean;
  isStudent: () => boolean;
  fetchUserInfo: () => Promise<UserModel | null>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const initialUser: string | null = localStorage.getItem('user') || null;

const initialValidCredentials: UserModel[] = [
  { username: 'admin', password: 'admin', name: 'Admin', role: UserRole.admin },
  { username: 'teacher', password: 'teacher', name: 'Teacher', role: UserRole.teacher },
  { username: 'student', password: 'student', name: 'Student', role: UserRole.student },
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
    return userInfo || { username: '', password: '', name: '', role: UserRole.admin };
  };

  const fetchUserInfo = async (): Promise<UserModel | null> => {
    try {
      const response = await fetch('http://localhost:5000/user/getuser');
  
      if (response.ok) {
        const userDataArray = await response.json();
  
        if (userDataArray.length > 0) {
          const userData = userDataArray[0];
  
          return {
            username: userData.id_card,
            password: userData.id_student,
            name: '', // Set the name based on your data structure
            role: UserRole.student, // Set the role based on your data structure
          };
        }
      }
  
      // Handle other cases where the response is not okay
      console.error('Error fetching user information:', response.statusText);
      return null;
    } catch (error) {
      console.error('Error fetching user information:', error);
      return null;
    }
  };
  

  const value: AuthContextProps = {
    user,
    login,
    logout,
    validateCredentials,
    getUserInfo,
    isAdmin: () => getUserInfo().role === UserRole.admin,
    isTeacher: () => getUserInfo().role === UserRole.teacher,
    isStudent: () => getUserInfo().role === UserRole.student,
    fetchUserInfo,
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
