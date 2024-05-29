// src/components/Login.tsx
import { useMsal } from '@azure/msal-react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { loginRequest } from '../config/authConfig';
import { AppDispatch } from '../store';
import { loginSuccess } from '../store/authSlice';

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
