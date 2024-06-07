// src/redux/authActions.ts

import { createAction } from '@reduxjs/toolkit';
import { AccountInfo, IdTokenClaims } from '@azure/msal-browser';
import { AuthActionStatus } from '../types/IConfig';

export interface AuthPayload {
    status: AuthActionStatus;
    user?: AccountInfo | null;
    token?: string | null;
    claims?: IdTokenClaims | null;
    error?: string | null;
}

export const updateAuthState = createAction<AuthPayload>('auth/updateAuthState');
