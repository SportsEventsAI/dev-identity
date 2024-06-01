// src/services/auth/logout.ts
import { IPublicClientApplication } from '@azure/msal-browser';
import { IAuthResponse } from './types/interfaces/IAuthResponse';

/**
 * Function to handle logout logic
 * @param instance {IPublicClientApplication} - The MSAL instance
 * @returns {Promise<IAuthResponse>} - The logout response containing user and token
 */
const logout = async (instance: IPublicClientApplication): Promise<IAuthResponse> => {
    try {
        const account = instance.getAllAccounts()[0];
        if (account) {
            await instance.logoutPopup({ account });
        }
        return { user: null, token: null };
    } catch (error) {
        console.error('Logout error:', error);
        return { user: null, token: null };
    }
};

export default logout;
