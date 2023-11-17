// Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import { useAuth } from '../../auth/AuthContext';

const Login: React.FC = () => {
  const { login, validateCredentials } = useAuth();
  const navigate = useNavigate();
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [generalErrorMessage, setGeneralErrorMessage] = useState('');

  const handleLogin = (username: string, password: string) => {
    // Reset error messages
    setUsernameErrorMessage('');
    setPasswordErrorMessage('');
    setGeneralErrorMessage('');

    // Validate credentials
    if (validateCredentials({
        username, password,
        name: ''
    })) {
      // Perform authentication logic here
      // For simplicity, assume successful login
      login({ 
        username, password,
        name: ''
      });
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
