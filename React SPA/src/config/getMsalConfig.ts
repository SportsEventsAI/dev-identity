/**
 * @file src/config/getMsalConfig.ts
 * @version 0.1.1
 * @date 2024-05-31
 * @summary Provides the MSAL configuration for authentication.
 * @contact Geoff DeFilippi, geoff@sportsevents.ai
 * @github SportsEventsAI/dev-identity
 * @description This module exports a function to generate the MSAL configuration object.
 * The configuration is based on the settings provided in the singleton configuration.
 * @reference https://github.com/AzureAD/microsoft-authentication-library-for-js
 */

import { Configuration, LogLevel } from '@azure/msal-browser';
import { useConfig } from '../hooks/useConfig';
import { B2CDomainTypes, B2CPolicyTypes } from '../types';

/**
 * Generates the MSAL configuration object.
 *
 * @returns {Configuration} The MSAL configuration object.
 */
export const getMsalConfig = (): Configuration => {
    const config = useConfig();

    return {
        auth: {
            clientId: config.app.id,
            authority: config.b2c.getPolicyAuthority(B2CPolicyTypes.SignUpSignIn) ?? 'susi',
            knownAuthorities: [
                config.b2c.getDomainUrl(B2CDomainTypes.Login) ?? 'login.local',
                config.b2c.getDomainUrl(B2CDomainTypes.Tenant) ?? 'tenant.local',
            ],
            redirectUri: config.app.redirectUri,
        },
        cache: {
            cacheLocation: 'localStorage', // This configures where your cache will be stored
            storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
        },
        system: {
            loggerOptions: {
                loggerCallback: (level, message, containsPii) => {
                    if (containsPii) {
                        return;
                    }
                    switch (level) {
                        case LogLevel.Error:
                            console.error(message);
                            return;
                        case LogLevel.Info:
                            console.info(message);
                            return;
                        case LogLevel.Verbose:
                            console.debug(message);
                            return;
                        case LogLevel.Warning:
                            console.warn(message);
                            return;
                    }
                },
                logLevel: LogLevel.Info,
            },
        },
    };
};
