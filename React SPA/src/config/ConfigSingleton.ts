/**
 * @file src/config/ConfigSingleton.ts
 * @version 0.1.1
 * @date 2024-05-31
 * @summary Singleton class for application configuration.
 * @contact Geoff DeFilippi, geoff@sportsevents.ai
 * @github SportsEventsAI/dev-identity
 * @classdesc This singleton class ensures that the configuration is initialized once and provides
 * methods to access various configuration settings.
 * @details Please use the useConfig hook to access the configuration in your components.
 * @reference https://en.wikipedia.org/wiki/Singleton_pattern
 */

import { appConfig } from './appConfig';
import { apiConfig } from './apiConfig';
import { b2cConfig } from './b2cConfig';
import { Configuration } from '@azure/msal-browser';
import { getMsalConfig } from './getMsalConfig';
import { getDomainUrl } from './getDomainUrl';
import { getPolicyAuthority } from './getPolicyAuthority';
import { B2CPolicyTypes, IApiConfig, IAppConfig, IB2CConfig, IConfig } from '../types/IConfig';

export class ConfigSingleton {
    private static _instance: IConfig;

    public b2c: IB2CConfig;
    public app: IAppConfig;
    public api: IApiConfig;
    /**
     * Private constructor to prevent direct instantiation.
     */
    private constructor() {
        this.api = apiConfig;
        this.app = appConfig;
        this.b2c = b2cConfig;
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
     * Returns the singleton instance.
     *
     * @returns {IConfigs} The singleton instance.
     * @throws {Error} If the singleton is not initialized.
     */
    public static get instance(): IConfig {
        if (!ConfigSingleton._instance) {
            ConfigSingleton._instance = new ConfigSingleton();
        }
        return ConfigSingleton._instance;
    }
}
