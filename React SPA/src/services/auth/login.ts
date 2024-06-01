// src/services/auth/login.ts
import { IPublicClientApplication } from '@azure/msal-browser';
import Config from '../../config/config';
import { IAuthResponse } from './types/interfaces/IAuthResponse';

/**
 * Function to handle login logic
 * @param instance {IPublicClientApplication} - The MSAL instance
 * @returns {Promise<IAuthResponse>} - The login response containing user and token
 */
const login = async (instance: IPublicClientApplication): Promise<IAuthResponse> => {
    // Get the configuration instance
    const config = Config.getInstance();

    const loginRequest = {
        scopes: [config.b2c.scopes.read],
    };

    try {
        const response = await instance.loginPopup(loginRequest);
        const user = response.account;
        const token = response.idToken;
        return { user, token };
    } catch (error) {
        console.error('Login error:', error);
        return { user: null, token: null };
    }
};

export default login;
