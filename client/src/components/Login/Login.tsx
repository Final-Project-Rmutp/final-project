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
  const { login, validateCredentials, validCredentials } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({
    username: '',
    password: '',
    general: '',
  });

  const handleLogin = async () => {
    // Reset error messages
    setErrorMessages({
      username: '',
      password: '',
      general: '',
    });
  
    // Validate credentials
    const isValidCredentials = validateCredentials({ username, password, name: '', role: UserRole.admin });
  
    if (isValidCredentials) {
      const foundUser = validCredentials.find((cred) => cred.username === username);
      if (foundUser) {
        const user = { username, password, name: '', role: foundUser.role };
        login(user);
  
        // Use the navigate function to redirect to the appropriate route
        switch (user.role) {
          case UserRole.admin:
            navigate('/admin');
            break;
          case UserRole.teacher:
            navigate('/teacher'); // You can customize the route for teachers
            break;
          case UserRole.student:
            navigate('/student');
            break;
          default:
            // Navigate to a default route if the role is not recognized
            navigate('/');
        }
      }
    } else {
      // Display error messages
      if (username.trim() === '') {
        setErrorMessages((prev) => ({ ...prev, username: 'Username is required' }));
      }
      if (password.trim() === '') {
        setErrorMessages((prev) => ({ ...prev, password: 'Password is required' }));
      } else {
        setErrorMessages((prev) => ({ ...prev, general: 'Invalid username or password' }));
      }
    }
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
          {errorMessages.username && (
            <p className="error-message">{errorMessages.username}</p>
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
