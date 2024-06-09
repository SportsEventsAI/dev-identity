/**
 * @file src/config/apiConfig.ts
 * @version 0.1.1
 * @date 2024-06-08
 * @summary Apiconfig
 * @contact geoff@sportsevents.ai
 * @github SportsEventsAI/dev-identity
 * @description This file contains the apiconfig related logic.
 * @author Geoffrey DeFilippi
 */
import { IApiConfig } from '../types';

export const apiConfig: IApiConfig = {
    uri: import.meta.env.VITE_API_URI || 'https://api.yourdomain.com',
};
