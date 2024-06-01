// src/services/auth/resetPassword.ts
import { IPublicClientApplication } from '@azure/msal-browser';
import { IAuthResponse } from './types/interfaces/IAuthResponse';
import Config from '../../config/config';

/**
 * Function to handle password reset logic
 * @param instance {IPublicClientApplication} - The MSAL instance
 * @returns {Promise<IAuthResponse>} - The response containing user and token after password reset
 */
const resetPassword = async (instance: IPublicClientApplication): Promise<IAuthResponse> => {
    // Get the configuration instance
    const config = Config.getInstance();

    try {
        // Assuming the reset password flow uses a different policy or authority
        const resetPasswordRequest = {
            scopes: [config.b2c.scopes.read],
            authority: config.getAuthority('resetPassword'),
        };

        const response = await instance.loginPopup(resetPasswordRequest);
        const user = response.account;
        const token = response.idToken;
        return { user, token };
    } catch (error) {
        console.error('Password reset error:', error);
        return { user: null, token: null };
    }
};

export default resetPassword;
