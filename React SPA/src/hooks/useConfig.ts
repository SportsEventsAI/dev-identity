// src/hooks/useConfig.ts
import { config } from '../config';
import { IConfig } from '../types/IConfig';

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
