// src/config/appConfig.ts

import { IAppConfig } from '../types/IConfig';

export const appConfig: IAppConfig = {
    id: import.meta.env.VITE_APP_ID || 'default-app-id',
    name: import.meta.env.VITE_APP_NAME || 'default-app-name',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    redirectUri: import.meta.env.VITE_APP_REDIRECT_URI || 'http://localhost:3000',
};
