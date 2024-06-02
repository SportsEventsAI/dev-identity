import { useMsal } from '@azure/msal-react';
import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const LoginButton = () => {
    const { instance } = useMsal();
    const { handleLogin } = useAuth(instance);

    return (
        <button type="button" onClick={handleLogin}>
            Login
        </button>
    );
};

export default LoginButton;
