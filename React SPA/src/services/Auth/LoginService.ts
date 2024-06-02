// src/services/Auth/loginService.ts

// src/services/login.ts

import { useMsal } from '@azure/msal-react';
import Config from '../../config';
import { IAuthResponse } from '../../types/IAuthResponse';
import { AuthenticationResult, PopupRequest } from '@azure/msal-browser';

/**
 * Authenticates a user by sending a login request to the server.
 * @param username - The username of the user.
 * @param password - The password of the user.
 * @returns A Promise that resolves to an IAuthResponse object containing the authentication response.
 * @throws An Error if the login fails.
 * @filename src/services/Auth/loginService.ts
 */
const LoginService = async (): Promise<IAuthResponse> => {
    const config = Config.getInstance();
    const { instance } = useMsal();

    try {
        const loginRequest: PopupRequest = {
            scopes: [config.getAuthority('signIn')],
        };

        const authResult: AuthenticationResult = await instance.loginPopup(loginRequest);
        return { user: authResult.account, token: authResult.accessToken };
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message || 'Login failed');
        }
        throw new Error('Login failed');
    }
};

export default LoginService;
