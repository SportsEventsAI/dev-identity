/**
 * @file src/redux/authActions.ts
 * @version 0.1.1
 * @date 2024-06-08
 * @summary Authactions
 * @contact geoff@sportsevents.ai
 * @github SportsEventsAI/dev-identity
 * @description This file contains the authactions related logic.
 * @author Geoffrey DeFilippi
 */
import { createAction } from '@reduxjs/toolkit';
import { AccountInfo, IdTokenClaims } from '@azure/msal-browser';
import { AuthActionStatus } from '../types';

export interface AuthPayload {
    status: AuthActionStatus;
    user?: AccountInfo | null;
    token?: string | null;
    claims?: IdTokenClaims | null;
    error?: string | null;
}

export const updateAuthState = createAction<AuthPayload>('auth/updateAuthState');
