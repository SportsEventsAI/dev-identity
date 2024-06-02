// src/config/apiConfig.ts

import { IApiConfig } from '../types/IConfig';

export const apiConfig: IApiConfig = {
    uri: import.meta.env.VITE_API_URI || 'https://api.yourdomain.com',
};
