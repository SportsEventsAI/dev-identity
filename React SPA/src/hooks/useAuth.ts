/**
 * @file src/hooks/useAuth.ts
 * @version 0.1.1
 * @date 2024-06-08
 * @summary Authentication logic and components.
 * @contact Geoff DeFilippi, geoff@sportsevents.ai
 * @github SportsEventsAI/dev-identity
 * @description This file contains authentication-related logic and components to manage user authentication.
 * @notes This is more like the auth service.  we will consider it an auth service wrapper.
 * Each one of these is expected to dispatch state to the store using some action.
 * TODO: Add caching and error handling.
 * @reference
 */

import { useDispatch, useSelector } from 'react-redux';
import { updateAuthState } from '../redux/authActions';
import { RootState } from '../redux/store';
import { useMsal } from '@azure/msal-react';
import { useConfig } from './useConfig';
import { AuthenticationResult } from '@azure/msal-browser';
import { AuthActionStatus, AuthActionTypes, B2CPolicyTypes } from '../types';
import { onMethodCall } from '../aspects/loggingAspects';

/**
 *
 * It should be apparent from the code below that this is an implementation of
 * MSAL and AD B2C.  It is expected that the B2C configuration that will be used
 * is correctly setup.  This uses default B2C policies that aren't provisioned with the
 * service and will require setup in Azure.
 */
// Custom hook for authentication logic
const useAuthLogic = () => {
    // hooks
    const { instance } = useMsal(); // Access the MSAL instance
    const dispatch = useDispatch(); // Access the Redux dispatch function
    const config = useConfig(); // Access the configuration

    // selectors (Listening to this state in the component will trigger a re-render when the state changes.)
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated); // Check if the user is authenticated
    const user = useSelector((state: RootState) => state.auth.user); // Get the user object
    const error = useSelector((state: RootState) => state.auth.error); // Get the error object

    // helper function to handle the different auth actions
    const handleAuthAction = async (action: AuthActionTypes, request?: any): Promise<void> => {
        let authResponse: AuthenticationResult | void;

        try {
            switch (action) {
                // LOGIN ACTION
                case AuthActionTypes.Login:
                    authResponse = await instance.loginPopup(request); // Perform login using MSAL
                    dispatch(
                        updateAuthState({
                            status: AuthActionStatus.Success,
                            user: authResponse.account,
                            token: authResponse.idToken,
                            claims: authResponse.idTokenClaims,
                        }),
                    ); // Dispatch the updated authentication state to the Redux store
                    break;
                // LOGOUT ACTION
                case AuthActionTypes.Logout:
                    await instance.logoutPopup(request); // Perform logout using MSAL
                    dispatch(updateAuthState({ status: AuthActionStatus.Success })); // Dispatch the updated authentication state to the Redux store
                    break;
                // RESET PASSWORD ACTION
                case AuthActionTypes.ResetPassword:
                    authResponse = await instance.loginPopup(request); // Perform password reset using MSAL
                    dispatch(updateAuthState({ status: AuthActionStatus.Success })); // Dispatch the updated authentication state to the Redux store
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error(`Error in ${action}`, error);
            throw error;
        }
    };

    // Function to handle login action
    const handleLogin = async (): Promise<void> => {
        const loginRequest = {
            // This isn't a token request, it's a login request.
            //  so it's not necessary to specify the scopes here.
            //  but they would or could be:
            // 'openid profile offline_access'
            // or a subset of those
            // https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/working-with-b2c.md
            // scopes: [config.b2c.scopes.read, config.b2c.scopes.write], // Specify the scopes for login
        };
        await handleAuthAction(AuthActionTypes.Login, loginRequest); // Call the helper function to handle the login action
    };

    // Function to handle logout action
    const handleLogout = async (): Promise<void> => {
        const logoutRequest = {
            //postLogoutRedirectUri: '/', // Specify the redirect URI after logout
        };
        await handleAuthAction(AuthActionTypes.Logout, logoutRequest); // Call the helper function to handle the logout action
    };

    // Function to handle password reset action
    const handleResetPassword = async (): Promise<void> => {
        const resetRequest = {
            authority: config.b2c.getPolicyAuthority(B2CPolicyTypes.ResetPassword), // Get the authority for password reset
        };
        await handleAuthAction(AuthActionTypes.ResetPassword, resetRequest); // Call the helper function to handle the password reset action
    };

    // Return the necessary variables and functions for authentication
    return { isAuthenticated, user, error, handleLogin, handleLogout, handleResetPassword };
};

// Custom hook for using authentication logic
export const useAuth = () => {
    const authLogic = useAuthLogic(); // Call the authentication logic hook
    onMethodCall({ target: authLogic }, { key: 'useAuth' }, { args: [] }); // Log the method call
    return authLogic; // Return the authentication logic
};

export default useAuth; // Export the default hook
