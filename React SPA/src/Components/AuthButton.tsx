// src/components/AuthButton.tsx

/**
 * @file src/components/AuthButton.tsx
 * @version 0.1.1
 * @date 2024-06-08
 * @summary Button component for authentication actions.
 * @contact Geoff DeFilippi, geoff@sportsevents.ai
 * @github SportsEventsAI/dev-identity
 * @description This component renders a button that triggers authentication actions such as login or logout.
 * @notes Ensure that the AuthContext is correctly configured to use this component.
 */
import React from 'react';
import useAuth from '../hooks/useAuth';

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
