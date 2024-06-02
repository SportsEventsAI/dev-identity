// src/config/index.ts

import { appConfig } from './appConfig';
import { apiConfig } from './apiConfig';
import { b2cConfig } from './b2cConfig';
import { IConfig, B2CDomainTypes } from '../types/IConfig';

class ConfigSingleton {
    private static instance: IConfig;

    public static getInstance(): IConfig {
        if (!ConfigSingleton.instance) {
            ConfigSingleton.instance = {
                app: appConfig,
                api: apiConfig,
                b2c: b2cConfig,
            };
        }
        return ConfigSingleton.instance;
    }
}

export const getPolicyUrl = (policyName: keyof IConfig['b2c']['policies']): string => {
    const config = ConfigSingleton.getInstance();
    const policy = config.b2c.policies[policyName];
    if (!policy) {
        throw new Error(`Policy ${policyName} not found`);
    }
    return `https://${config.b2c.tenant.name}.${config.b2c.login.domain}/${config.b2c.tenant.name}.${config.b2c.tenant.domain}/${policy}`;
};

export const getDomainUrl = (domainType: B2CDomainTypes): string => {
    const config = ConfigSingleton.getInstance();
    if (domainType === B2CDomainTypes.Tenant) {
        return `${config.b2c.tenant.name}.${config.b2c.tenant.domain}`;
    } else if (domainType === B2CDomainTypes.Login) {
        return `${config.b2c.tenant.name}.${config.b2c.login.domain}`;
    } else {
        throw new Error(`Invalid domain type: ${domainType}`);
    }
};

export default ConfigSingleton.getInstance();
