// Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import { useAuth,UserRole } from '../../auth/AuthContext';

const Login: React.FC = () => {
  const { login, validateCredentials } = useAuth();
  const navigate = useNavigate();
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [generalErrorMessage, setGeneralErrorMessage] = useState('');

  const handleLogin = async (username: string, password: string) => {
    // Reset error messages
    setUsernameErrorMessage('');
    setPasswordErrorMessage('');
    setGeneralErrorMessage('');

    // Validate credentials
    const isValidCredentials = validateCredentials({ username, password, name: '', role: UserRole.admin });

    if (isValidCredentials) {
      // Perform authentication logic here
      const user = { username, password, name: '', role: UserRole.admin };
      login(user);
      navigate('/room');
    } else {
      // Display error messages
      if (username.trim() === '') {
        setUsernameErrorMessage('Username is required');
      }
      if (password.trim() === '') {
        setPasswordErrorMessage('Password is required');
      } else {
        setGeneralErrorMessage('Invalid username or password');
      }
    }
  };

  return (
    <div>
      <LoginForm
        onLogin={handleLogin}
        usernameErrorMessage={usernameErrorMessage}
        passwordErrorMessage={passwordErrorMessage}
        generalErrorMessage={generalErrorMessage}
      />
    </div>
  );
};

export default Login;
