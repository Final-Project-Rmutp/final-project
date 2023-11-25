import React, { useState } from 'react';
import { useAuth, UserRole } from '../../auth/AuthLogin';
import './Login.scss';
import axios, { AxiosInstance } from 'axios'; // Import AxiosInstance
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl;

interface User {
  id: string;
  citizen_id: string;
  accountrole: UserRole;
}

const Login: React.FC = () => {
  useAuth();
  const [loginData, setLoginData] = useState({ id: '', citizen_id: '' });
  const [errorMessages, setErrorMessages] = useState({ username: '', password: '', general: '' });
  const resetErrorMessages = () => {
    setErrorMessages({ username: '', password: '', general: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    resetErrorMessages(); 
  };

  const handleLogin = async () => {
    resetErrorMessages();

    try {
      if (!loginData.id.trim() || !loginData.citizen_id.trim()) {
        setErrorMessages({
          username: !loginData.id.trim() ? 'ID Card is required' : '',
          password: !loginData.citizen_id.trim() ? 'ID Student is required' : '',
          general: 'Username and password are required',
        });
        return;
      }

      const response = await axios.post(`${apiUrl}/auth/login`, loginData);

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('authToken', token);

        // Create an instance of Axios with the custom configuration
        const authAxios: AxiosInstance = axios.create({
          headers: {
            Authorization: `Bearer ${token}`,
          },
          baseURL: apiUrl, // Set the base URL for subsequent requests
        });

        const responseGetAllUsers = await authAxios.get('/admin/user/getalluser');

        if (responseGetAllUsers.status === 200) {
          const users: User[] = responseGetAllUsers.data;
          const user = users[3];
          if (user) {
            switch (user.accountrole) {
              case UserRole.admin:
                window.location.href = '/student-list';
                break;
              case UserRole.user:
                window.location.href = '/teacher';
                break;
              default:
                window.location.href = '/';
            }
          }
        }
      } else {
        setErrorMessages((prevState) => ({
          ...prevState,
          general: 'Invalid username or password',
        }));
      }
    } catch (error) {
      console.error('Authentication failed:', error);
      setErrorMessages({
        username: '',
        password: '',
        general: 'Authentication failed. Please try again.',
      });
    }
  };

  return (
    <div className="login-form">
      <div className="login-form-container">
        <h1 className="text-center text-3xl font-semibold mb-6 text-gray-800">Login</h1>
        <div className="mb-4">
          <label htmlFor="id" className="text-sm text-gray-600">
            ID Card:
          </label>
          <input type="text" name="id" value={loginData.id} onChange={handleInputChange} />
          {errorMessages.username && <p className="error-message">{errorMessages.username}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="citizen_id" className="text-sm text-gray-600">
            ID Student:
          </label>
          <input type="text" name="citizen_id" value={loginData.citizen_id} onChange={handleInputChange} />
          {errorMessages.password && <p className="error-message">{errorMessages.password}</p>}
        </div>
        {errorMessages.general && <p className="error-message mt-2">{errorMessages.general}</p>}
        <button onClick={handleLogin} className="login-button">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
