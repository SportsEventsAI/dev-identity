/**
 * @file src/config/getDomainUrl.ts
 * @version 0.1.1
 * @date 2024-05-31
 * @brief Provides utility to generate domain URLs.
 * @contact Geoff DeFilippi, geoff@sportsevents.ai
 * @github SportsEventsAI/dev-identity
 * @subdirectory react spa
 * @filename src/config/getDomainUrl.ts
 * @details This module exports a function to generate the domain URL based on the type.
 * The configuration is provided in the singleton configuration.
 * @reference https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-reference-oauth-code
 */

import ConfigSingleton from '.';
import { B2CDomainTypes } from '../types/IConfig';

/**
 * Generates the domain URL based on the type.
 *
 * @param {B2CDomainTypes} domainType - The type of domain (tenant or login).
 * @returns {string} The domain URL.
 * @throws {Error} If the domain type is invalid.
 */
export const getDomainUrl = (domainType: B2CDomainTypes): string => {
    const config = ConfigSingleton.getInstance().config;
    if (domainType === B2CDomainTypes.Tenant) {
        return `${config.b2c.tenant.name}.${config.b2c.tenant.domain}`;
    } else if (domainType === B2CDomainTypes.Login) {
        return `${config.b2c.tenant.name}.${config.b2c.login.domain}`;
    } else {
        throw new Error(`Invalid domain type: ${domainType}`);
    }
};
