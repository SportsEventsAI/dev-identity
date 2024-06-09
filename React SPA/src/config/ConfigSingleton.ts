import { appConfig } from './appConfig';
import { apiConfig } from './apiConfig';
import { b2cConfig } from './b2cConfig';
import { Configuration } from '@azure/msal-browser';
import { getMsalConfig } from './getMsalConfig';
import { getDomainUrl } from './getDomainUrl';
import { getPolicyAuthority } from './getPolicyAuthority';
import { B2CPolicyTypes, IApiConfig, IAppConfig, IB2CConfig, IConfig } from '../types';

/**
 * @file src/config/ConfigSingleton.ts
 * @version 0.1.1
 * @date 2024-06-08
 * @summary Singleton class for application configuration.
 * @contact Geoff DeFilippi, geoff@sportsevents.ai
 * @github SportsEventsAI/dev-identity
 * @description This singleton class ensures that the configuration is initialized once and provides methods to access various configuration settings.
 * @notes Please use the useConfig hook to access the configuration in your components.
 * @reference https://en.wikipedia.org/wiki/Singleton_pattern
 */

/**
 * to use this class to extend config you could
 * extend the IConfig interface and add the new properties
 * which would require also updating the constructor and other items
 */
export class ConfigSingleton {
    private static _instance: IConfig;

    public b2c: IB2CConfig;
    public app: IAppConfig;
    public api: IApiConfig;

    /**
     * Private constructor to prevent direct instantiation.
     * Initializes the configuration settings.
     */
    private constructor() {
        this.api = apiConfig; // Assigns the API configuration settings
        this.app = appConfig; // Assigns the application configuration settings
        this.b2c = b2cConfig; // Assigns the B2C configuration settings

        // Defines methods to access B2C configuration settings
        this.b2c.getMsalConfig = (): Configuration => {
            return getMsalConfig();
        };
        this.b2c.getDomainUrl = (domainType): string => {
            return getDomainUrl(domainType);
        };
        this.b2c.getPolicyAuthority = (policy: B2CPolicyTypes): string => {
            return getPolicyAuthority(policy);
        };
    }

    /**
     * Returns the singleton instance of the configuration.
     * If the instance doesn't exist, it creates a new one.
     *
     * @returns {IConfigs} The singleton instance of the configuration.
     * @throws {Error} If the singleton is not initialized.
     */
    public static get instance(): IConfig {
        if (!ConfigSingleton._instance) {
            ConfigSingleton._instance = new ConfigSingleton();
        }
        return ConfigSingleton._instance;
    }
}
