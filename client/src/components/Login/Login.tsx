// Login.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';

const Login: React.FC = () => {
    const [errorMessage, setErrorMessage] = React.useState('');
    const navigate = useNavigate();

    const handleLogin = (username: string, password: string) => {
    // Simulate a login check (replace with your actual authentication logic)
    if (username === 'admin' && password === 'password') {
      // Login successful
        setErrorMessage('');
      // Redirect to the home page
        navigate('/room');
    } else {
      // Login failed
        setErrorMessage('Invalid username or password');
    }
};

return (
    <div>
        <h2>Login</h2>
        <LoginForm onLogin={handleLogin} errorMessage={errorMessage} />
    </div>
    );
};

export default Login;
