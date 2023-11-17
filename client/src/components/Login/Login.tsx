// Login.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';

const Login: React.FC = () => {
    const [errorMessage, setErrorMessage] = React.useState('');
    const navigate = useNavigate();

    const handleLogin = (username: string, password: string) => {
    if (username === 'admin' && password === 'password') {
        setErrorMessage('');
        navigate('/room');
    } else {
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
