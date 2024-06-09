/**
 * @file src/hooks/useConfig.ts
 * @version 0.1.1
 * @date 2024-06-08
 * @summary Singleton class for managing application-wide settings.
 * @contact geoff@sportsevents.ai
 * @github SportsEventsAI/dev-identity
 * @description This singleton class ensures that the configuration is initialized once and provides methods to access various configuration settings.
 * @author Geoffrey DeFilippi
 * @notes
 * @reference https://en.wikipedia.org/wiki/Singleton_pattern
 */

import { config } from '../config';
import { IConfig } from '../types';

// The config import is an export of the ConfigSingleton instance, which is a singleton instance of the configuration.

/**
 * useConfig hook to access configuration values.
 *
 * @hook
 * @filename src/hooks/useConfig.ts
 */
export const useConfig = (): IConfig => {
    return {
        app: config.app,
        api: config.api,
        b2c: config.b2c,
    };
};
export default useConfig;
