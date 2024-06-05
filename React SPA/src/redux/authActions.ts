// src/redux/authActions.ts

import { createAction } from '@reduxjs/toolkit';
import { AccountInfo, IdTokenClaims } from '@azure/msal-browser';

export enum AuthStatus {
    SUCCESS = 'SUCCESS',
    FAILURE = 'FAILURE',
}

export interface AuthPayload {
    status: AuthStatus;
    user?: AccountInfo | null;
    token?: string | null;
    claims?: IdTokenClaims | null;
    error?: string | null;
}

export const updateAuthState = createAction<AuthPayload>('auth/updateAuthState');
