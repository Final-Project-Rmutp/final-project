// LoginForm.tsx
import './LoginForm.scss';
import React, { useState } from 'react';

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
  usernameErrorMessage: string;
  passwordErrorMessage: string;
  generalErrorMessage: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onLogin,
  usernameErrorMessage,
  passwordErrorMessage,
  generalErrorMessage,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    onLogin(username, password);
  };

  return (
    <div className="login-form">
      <div className="login-form-container">
        <h1 className="text-center text-3xl font-semibold mb-6 text-gray-800">Login</h1>
        <div className="mb-4">
          <label htmlFor="username" className="text-sm text-gray-600">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
          {usernameErrorMessage && (
            <p className="error-message">{usernameErrorMessage}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="text-sm text-gray-600">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          {passwordErrorMessage && (
            <p className="error-message">{passwordErrorMessage}</p>
          )}
        </div>
        {generalErrorMessage && (
          <p className="error-message mt-2">{generalErrorMessage}</p>
        )}
        <button
          onClick={handleLogin}
          className="login-button"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
