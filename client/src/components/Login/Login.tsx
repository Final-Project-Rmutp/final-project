import React, { useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import './Login.scss';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { toast } from 'sonner'
import { useNavigate } from 'react-router';
const apiUrl = environment.apiUrl;

const Login: React.FC = () => {
  const navigate = useNavigate();
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
        if (!loginData.id.trim()) {
          toast.error('ID Card is required');
        }
        if (!loginData.citizen_id.trim()){
        toast.error('ID Student is required');
        }
        // if (!loginData.id.trim() && !loginData.citizen_id.trim()) {
        //   toast.error('Username and password are required');
        // }
        setErrorMessages({
          username: !loginData.id.trim() ? 'ID Card is required' : '',
          password: !loginData.citizen_id.trim() ? 'ID Student is required' : '',
          general: 'Username and password are required',
        });
        return;
      }

      const response = await axios.post(`${apiUrl}/auth/login`, loginData);

      if (response.status === 200 && response.data.token) {
        const { token, accountrole } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('role', accountrole);
        toast.success('Login Success');

        if (accountrole === 'admin') {
          navigate('/admin');
        } else {
          navigate('/user');
        }
      } else {
        setErrorMessages((prevState) => ({
          ...prevState,
          general: 'Invalid username or password',
        }));
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Invalid username or password');
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
