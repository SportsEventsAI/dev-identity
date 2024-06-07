// src/hooks/useAuth.ts

import { useDispatch, useSelector } from 'react-redux';
import { updateAuthState } from '../redux/authActions';
import { RootState } from '../redux/store';
import { useMsal } from '@azure/msal-react';
import { useConfig } from './useConfig';
import { AuthenticationResult } from '@azure/msal-browser';
import { AuthActionStatus, AuthActionTypes, B2CPolicyTypes } from '../types/IConfig';

export const useAuth = () => {
    const { instance } = useMsal();
    const dispatch = useDispatch();
    const config = useConfig();

    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const user = useSelector((state: RootState) => state.auth.user);
    const error = useSelector((state: RootState) => state.auth.error);

    const handleAuthAction = async (action: AuthActionTypes, request?: any) => {
        try {
            let authResponse: AuthenticationResult | void;

            switch (action) {
                case AuthActionTypes.Login:
                    authResponse = await instance.loginPopup(request);
                    dispatch(
                        updateAuthState({
                            status: AuthActionStatus.Success,
                            user: authResponse.account,
                            token: authResponse.idToken,
                            claims: authResponse.idTokenClaims,
                        }),
                    );
                    break;
                case AuthActionTypes.Logout:
                    await instance.logoutPopup(request);
                    dispatch(updateAuthState({ status: AuthActionStatus.Success }));
                    break;
                case AuthActionTypes.ResetPassword:
                    authResponse = await instance.loginPopup(request);
                    dispatch(updateAuthState({ status: AuthActionStatus.Success }));
                    break;
                default:
                    break;
            }
        } catch (error: any) {
            dispatch(updateAuthState({ status: AuthActionStatus.Failure, error: error.message }));
        }
    };

    const handleLogin = async () => {
        const loginRequest = {
            scopes: [config.b2c.scopes.read, config.b2c.scopes.write],
        };
        await handleAuthAction(AuthActionTypes.Login, loginRequest);
    };

    const handleLogout = async () => {
        const logoutRequest = {
            postLogoutRedirectUri: '/',
        };
        await handleAuthAction(AuthActionTypes.Logout, logoutRequest);
    };

    const handleResetPassword = async () => {
        const resetRequest = {
            authority: config.b2c.getPolicyAuthority(B2CPolicyTypes.ResetPassword),
        };
        await handleAuthAction(AuthActionTypes.ResetPassword, resetRequest);
    };

    return { isAuthenticated, user, error, handleLogin, handleLogout, handleResetPassword };
};
