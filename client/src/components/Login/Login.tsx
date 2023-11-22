// Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '../../auth/AuthLogin';
import './Login.scss';

interface ErrorMessages {
  username: string;
  password: string;
  general: string;
}

const Login: React.FC = () => {
  const { login, fetchUserInfo } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({
    username: '',
    password: '',
    general: '',
  });

  const resetErrorMessages = () => {
    setErrorMessages({
      username: '',
      password: '',
      general: '',
    });
  };

  const handleLogin = async () => {
    resetErrorMessages();

    // Check for empty fields
    if (username.trim() === '' || password.trim() === '') {
      setErrorMessages((prev) => ({
        ...prev,
        general: 'Username and password are required',
        username: username.trim() === '' ? 'Username is required' : '',
        password: password.trim() === '' ? 'Password is required' : '',
      }));
      return;
    }
    const userInfo = await fetchUserInfo();
    if (userInfo && userInfo.password === password) {
      const user = { username, password, name: userInfo.name, role: userInfo.role };
      login(user);
        switch (user.role) {
          case UserRole.admin:
            navigate('/admin');
            break;
          case UserRole.teacher:
            navigate('/teacher');
            break;
          case UserRole.student:
            navigate('/student');
            break;
          default:
            navigate('/');
        }
      } else {
        // Display error messages
        setErrorMessages((prev) => ({ ...prev, general: 'Invalid username or password' }));
      }
  };

  return (
    <div className="login-form">
      <div className="login-form-container">
        <h1 className="text-center text-3xl font-semibold mb-6 text-gray-800">Login</h1>
        <div className="mb-4">
          <label htmlFor="username" className="text-sm text-gray-600">
            ID Card:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
          {errorMessages.username && (
            <p className="error-message">{errorMessages.username}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="text-sm text-gray-600">
            ID Student:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          {errorMessages.password && (
            <p className="error-message">{errorMessages.password}</p>
          )}
        </div>
        {errorMessages.general && (
          <p className="error-message mt-2">{errorMessages.general}</p>
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

export default Login;
