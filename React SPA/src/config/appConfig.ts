/**
 * @file src/config/appConfig.ts
 * @version 0.1.1
 * @date 2024-06-08
 * @summary Appconfig
 * @contact geoff@sportsevents.ai
 * @github SportsEventsAI/dev-identity
 * @description This file contains the appconfig related logic.
 * @author Geoffrey DeFilippi
 */
import { IAppConfig } from '../types';

export const appConfig: IAppConfig = {
    id: import.meta.env.VITE_APP_ID || 'default-app-id',
    name: import.meta.env.VITE_APP_NAME || 'default-app-name',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    redirectUri: import.meta.env.VITE_APP_REDIRECT_URI || 'http://localhost:3000',
};
