// src/components/AuthButton.tsx

import React from 'react';
import { useAuth } from '../hooks/useAuth';

/**
 * AuthButton component handles login and logout actions based on authentication state.
 *
 * @component
 * @filename src/components/AuthButton.tsx
 */
const AuthButton = () => {
    const { isAuthenticated, handleLogin, handleLogout } = useAuth();

    return (
        <button onClick={isAuthenticated ? handleLogout : handleLogin}>{isAuthenticated ? 'Logout' : 'Login'}</button>
    );
};

export default AuthButton;
