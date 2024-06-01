import { AccountInfo } from '@azure/msal-browser';

/**
 * Represents the response object returned from an authentication request.
 */
export interface IAuthResponse {
    user: AccountInfo | null;
    token: string | null;
}
