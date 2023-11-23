// authCore.tsx
import { UserRole, UserModel } from './model/authTypes';

interface AuthCoreProps {
  login: (userModel: UserModel) => void;
  validateCredentials: (userModel: UserModel) => boolean;
  fetchUserInfo: () => Promise<UserModel | null>;
}

class AuthCore {
  private loginCallback: (userModel: UserModel) => void;
  private validateCredentialsCallback: (userModel: UserModel) => boolean;
  private fetchUserInfoCallback: () => Promise<UserModel | null>;

  constructor(props: AuthCoreProps) {
    this.loginCallback = props.login;
    this.validateCredentialsCallback = props.validateCredentials;
    this.fetchUserInfoCallback = props.fetchUserInfo;
  }

  async handleLogin(username: string, password: string): Promise<boolean> {
    const isValidCredentials = this.validateCredentialsCallback({ username, password, name: '', role: UserRole.admin });

    if (isValidCredentials) {
      const userInfo = await this.fetchUserInfoCallback();

      if (userInfo) {
        const user = { username, password, name: userInfo.name, role: userInfo.role };
        this.loginCallback(user);
        return true;
      }
    }

    return false;
  }
}

export default AuthCore;
