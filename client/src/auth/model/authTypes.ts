// authTypes.ts
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
