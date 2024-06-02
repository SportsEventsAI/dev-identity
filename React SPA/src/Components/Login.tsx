// src/components/Auth/Login.tsx
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

/**
 * Login component handles user login using MSAL.
 * 
 * @component
 * @filename src/components/Login.tsx
 */
const Login = (): React.ReactNode => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { handleLogin } = useAuth();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            await handleLogin(username);
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit">Login</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default Login;