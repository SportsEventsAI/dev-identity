import { LogLevel } from '@azure/msal-browser';
import MsalConfig from './msalConfig';

// Get the configuration instance
const config = MsalConfig.getInstance();

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */
/**
 * Configuration object for MSAL (Microsoft Authentication Library).
 */
export const msalConfig = {
    /**
     * Authentication configuration.
     */
    auth: {
        /**
         * The client ID of the application.
         */
        clientId: config.appid,
        /**
         * The authority URL for authentication.
         */
        authority: config.authority,
        /**
         * The known authorities for authentication.
         */
        knownAuthorities: [config.b2clogin],
        /**
         * The redirect URI for authentication.
         */
        redirectUri: config.redirectUri,
    },
    /**
     * Cache configuration.
     */
    cache: {
        /**
         * The location to store the cache.
         */
        cacheLocation: "sessionStorage",
        /**
         * The temporary cache location.
         */
        temporaryCacheLocation: "sessionStorage",
        /**
         * Indicates whether to store the authentication state in a cookie.
         */
        storeAuthStateInCookie: false,
        /**
         * Indicates whether to use secure cookies.
         */
        secureCookies: false,
        /**
         * Indicates whether claims-based caching is enabled.
         */
        claimsBasedCachingEnabled: true,
    },
    /**
     * System configuration.
     */
    system: {
        /**
         * Logger options.
         */
        loggerOptions: {
            /**
             * The callback function for logging.
             */
            loggerCallback: (
                level: LogLevel,
                message: string,
                containsPii: boolean
            ): void => {
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
            /**
             * Indicates whether PII (Personally Identifiable Information) logging is enabled.
             */
            piiLoggingEnabled: false,
        },
        /**
         * The timeout for window hash operations.
         */
        windowHashTimeout: 60000,
        /**
         * The timeout for iframe hash operations.
         */
        iframeHashTimeout: 6000,
        /**
         * The timeout for loading frames.
         */
        loadFrameTimeout: 0,
        /**
         * Indicates whether popups are asynchronous.
         */
        asyncPopups: false,
    },
    /**
     * Telemetry configuration.
     */
    telemetry: {
        /**
         * Application telemetry.
         */
        application: {
            /**
             * The name of the application.
             */
            appName: config.appname,
            /**
             * The version of the application.
             */
            appVersion: config.appversion,
        },
    },
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
    scopes: config.scopes,
};

/**
 * Enter here the coordinates of your web API and scopes for access token request
 * The current application coordinates were pre-registered in a B2C tenant.
 */
export const apiConfig = {
    scopes: config.scopes,
    uri: config.apiUri,
};
