// src/hooks/useAuth.ts

import { useDispatch, useSelector } from 'react-redux';
import { updateAuthState, AuthStatus } from '../redux/authActions';
import { RootState } from '../redux/store';
import { useMsal } from '@azure/msal-react';
import { IConfigResult } from '../types/IConfig';
import { useConfig } from './useConfig';
import { AuthenticationResult } from '@azure/msal-browser';
import { AuthActionType } from '../types/AuthTypes';
import { getPolicyUrl } from '../config';

export const useAuth = () => {
    const { instance } = useMsal();
    const dispatch = useDispatch();
    const { config } = useConfig() as IConfigResult;
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const user = useSelector((state: RootState) => state.auth.user);
    const error = useSelector((state: RootState) => state.auth.error);

    const handleAuthAction = async (action: AuthActionType, request?: any) => {
        try {
            let authResponse: AuthenticationResult | void;

            switch (action) {
                case AuthActionType.LOGIN:
                    authResponse = await instance.loginPopup(request);
                    dispatch(
                        updateAuthState({
                            status: AuthStatus.SUCCESS,
                            user: authResponse.account,
                            token: authResponse.idToken,
                            claims: authResponse.idTokenClaims,
                        }),
                    );
                    break;
                case AuthActionType.LOGOUT:
                    await instance.logoutPopup(request);
                    dispatch(updateAuthState({ status: AuthStatus.SUCCESS }));
                    break;
                case AuthActionType.RESET_PASSWORD:
                    authResponse = await instance.loginPopup(request);
                    dispatch(updateAuthState({ status: AuthStatus.SUCCESS }));
                    break;
                default:
                    break;
            }
        } catch (error: any) {
            dispatch(updateAuthState({ status: AuthStatus.FAILURE, error: error.message }));
        }
    };

    const handleLogin = async () => {
        const loginRequest = {
            scopes: [config.b2c.scopes.read, config.b2c.scopes.write],
        };
        await handleAuthAction(AuthActionType.LOGIN, loginRequest);
    };

    const handleLogout = async () => {
        const logoutRequest = {
            postLogoutRedirectUri: '/',
        };
        await handleAuthAction(AuthActionType.LOGOUT, logoutRequest);
    };

    const handleResetPassword = async () => {
        const resetRequest = {
            authority: getPolicyUrl("resetPassword"),
        };
        await handleAuthAction(AuthActionType.RESET_PASSWORD, resetRequest);
    };

    return { isAuthenticated, user, error, handleLogin, handleLogout, handleResetPassword };
};
