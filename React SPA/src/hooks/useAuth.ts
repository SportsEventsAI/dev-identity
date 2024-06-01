// src/hooks/useAuth.ts
import { IPublicClientApplication } from '@azure/msal-browser';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { loginSuccess } from '../store/authSlice';
import login from '../services/auth/login';

/**
 * Custom hook to handle authentication logic
 * @param instance {IPublicClientApplication} - The MSAL instance
 */
export const useAuth = (instance: IPublicClientApplication) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleLogin = async () => {
        try {
            const { user, token } = await login(instance);
            dispatch(loginSuccess({ user, token }));
        } catch (error) {
            console.error(error);
        }
    };

    return { handleLogin };
};
