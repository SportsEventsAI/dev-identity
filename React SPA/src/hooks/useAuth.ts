// src/hooks/useAuth.ts

import { useDispatch, useSelector } from 'react-redux';
import LoginService from '../services/Auth/LoginService';
import { LoginAction, LogoutAction } from '../redux/authSlice';
import { RootState } from '../redux/store';

export const useAuth = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const user = useSelector((state: RootState) => state.auth.user);

    const handleLogin = async (username: string, password: string) => {
        try {
            const authResponse = await LoginService(username, password);
            dispatch(LoginAction({ user: authResponse.user, token: authResponse.token }));
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    const handleLogout = () => {
        dispatch(LogoutAction());
    };

    return { isAuthenticated, user, handleLogin, handleLogout };
};
