// LoginForm.tsx
import React, { useState } from 'react';

interface LoginFormProps {
    onLogin: (username: string, password: string) => void;
    errorMessage: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, errorMessage }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = () => {
        onLogin(username, password);
    };

return (
    <div>
        <label htmlFor="username">Username:</label>
        <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
    );
};

export default LoginForm;
