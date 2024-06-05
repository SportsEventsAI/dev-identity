/**
 * @file src/config/ConfigSingleton.ts
 * @version 0.1.1
 * @date 2024-05-31
 * @brief Singleton class for application configuration.
 * @contact Geoff DeFilippi, geoff@sportsevents.ai
 * @github SportsEventsAI/dev-identity
 * @subdirectory react spa
 * @filename src/config/ConfigSingleton.ts
 * @details This singleton class ensures that the configuration is initialized once and provides
 * methods to access various configuration settings.
 * @reference https://en.wikipedia.org/wiki/Singleton_pattern
 */

import { appConfig } from './appConfig';
import { apiConfig } from './apiConfig';
import { b2cConfig } from './b2cConfig';
import { IConfig } from '../types/IConfig';

class ConfigSingleton {
    private static instance: ConfigSingleton | null = null;
    public config: IConfig;

    /**
     * Private constructor to prevent direct instantiation.
     */
    private constructor() {
        this.config = {
            app: appConfig,
            api: apiConfig,
            b2c: b2cConfig,
        };
    }

    /**
     * Initializes the singleton instance.
     */
    public static init(): void {
        if (!ConfigSingleton.instance) {
            ConfigSingleton.instance = new ConfigSingleton();
        }
    }

    /**
     * Returns the singleton instance.
     *
     * @returns {ConfigSingleton} The singleton instance.
     * @throws {Error} If the singleton is not initialized.
     */
    public static getInstance(): ConfigSingleton {
        if (!ConfigSingleton.instance) {
            throw new Error('ConfigSingleton is not initialized. Call ConfigSingleton.init() first.');
        }
        return ConfigSingleton.instance;
    }
}

export default ConfigSingleton;
