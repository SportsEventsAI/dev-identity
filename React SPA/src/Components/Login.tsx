// src/components/Login.tsx
import React from 'react';
import { useMsal } from '@azure/msal-react';
import { useDispatch } from 'react-redux';
import { loginRequest } from '../Components/auth-config/authConfig';
import { loginSuccess } from '../store/authSlice';
import { AppDispatch } from '../store';

const Login: React.FC = () => {
    const { instance } = useMsal();
    const dispatch = useDispatch<AppDispatch>();

    const handleLogin = async () => {
        try {
            const response = await instance.loginPopup(loginRequest);
            const user = response.account;
            const token = response.idToken;
            dispatch(loginSuccess({ user, token }));
        } catch (error) {
            console.error(error);
        }
    };

    return <button onClick={handleLogin}>Login</button>;
};

export default Login;
