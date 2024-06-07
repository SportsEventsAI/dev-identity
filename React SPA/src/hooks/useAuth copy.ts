// src/hooks/useAuth.ts

import { useDispatch, useSelector } from 'react-redux';
import { updateAuthState } from '../redux/authActions';
import { RootState } from '../redux/store';
import { useMsal } from '@azure/msal-react';
import { useConfig } from './useConfig';
import { AuthenticationResult } from '@azure/msal-browser';
import { AuthActionStatus, AuthActionTypes, B2CPolicyTypes } from '../types/IConfig';

export const useAuth = () => {
    // hooks
    const { instance } = useMsal();
    const dispatch = useDispatch();
    const config = useConfig();

    // selectors (Listening to this state in the component will trigger a re-render when the state changes.)
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const user = useSelector((state: RootState) => state.auth.user);
    const error = useSelector((state: RootState) => state.auth.error);

    // helper function to handle the different auth actions
    const handleAuthAction = async (action: AuthActionTypes, request?: any) => {
        try {
            let authResponse: AuthenticationResult | void;

            console.group('useAuth->handleAuthAction');
            console.trace('Action:', action);
            switch (action) {
                //--------------------------------------------------------------------------------
                // LOGIN ACTION
                case AuthActionTypes.Login:
                    console.group('Login Action');
                    // The actual call wrapped in MSAL to the B2C instance / policy
                    // this is based on the configuration that has been used to construct
                    // the MSAL instance
                    console.trace('request', request);
                    authResponse = await instance.loginPopup(request);

                    dispatch(
                        updateAuthState({
                            status: AuthActionStatus.Success,
                            user: authResponse.account,
                            token: authResponse.idToken,
                            claims: authResponse.idTokenClaims,
                        }),
                    );
                    console.groupEnd();
                    break;
                //--------------------------------------------------------------------------------
                // LOGOUT ACTION
                case AuthActionTypes.Logout:
                    console.group('Logout Action');
                    // The actual call wrapped in MSAL to the B2C instance / policy
                    console.trace('request', request);
                    await instance.logoutPopup(request);

                    dispatch(updateAuthState({ status: AuthActionStatus.Success }));
                    console.groupEnd();
                    break;
                //--------------------------------------------------------------------------------
                // RESET PASSWORD ACTION
                case AuthActionTypes.ResetPassword:
                    console.group('Reset Password Action');
                    // The actual call wrapped in MSAL to the B2C instance / policy
                    console.trace('request', request);
                    authResponse = await instance.loginPopup(request);

                    dispatch(updateAuthState({ status: AuthActionStatus.Success }));
                    console.groupEnd();
                    break;
                default:
                    break;
            }
        } catch (error: any) {
            dispatch(updateAuthState({ status: AuthActionStatus.Failure, error: error.message }));
            // rethrow error to allow the caller to handle it
            throw error;
        } finally {
            console.groupEnd();
        }
    };

    const handleLogin = async () => {
        console.group('useAuth->handleLogin');
        console.trace('Login Action');

        const loginRequest = {
            scopes: [config.b2c.scopes.read, config.b2c.scopes.write],
        };
        console.trace('loginRequest', loginRequest);
        await handleAuthAction(AuthActionTypes.Login, loginRequest);
        console.trace('Login Action completed');
        console.groupEnd();
    };

    const handleLogout = async () => {
        console.group('useAuth->handleLogout');
        console.trace('Logout Action');
        const logoutRequest = {
            postLogoutRedirectUri: '/',
        };
        console.trace('logoutRequest', logoutRequest);
        await handleAuthAction(AuthActionTypes.Logout, logoutRequest);
        console.trace('Logout Action completed');
        console.groupEnd();
    };

    const handleResetPassword = async () => {
        console.group('useAuth->handleResetPassword');
        console.trace('Reset Password Action');
        const resetRequest = {
            authority: config.b2c.getPolicyAuthority(B2CPolicyTypes.ResetPassword),
        };
        console.trace('resetRequest', resetRequest);

        await handleAuthAction(AuthActionTypes.ResetPassword, resetRequest);
        console.trace('Reset Password Action completed');
        console.groupEnd();
    };

    return { isAuthenticated, user, error, handleLogin, handleLogout, handleResetPassword };
};
