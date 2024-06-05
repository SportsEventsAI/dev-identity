/**
 * @file src/config/getPolicyUrl.ts
 * @version 0.1.1
 * @date 2024-05-31
 * @brief Provides utility to generate policy URLs.
 * @contact Geoff DeFilippi, geoff@sportsevents.ai
 * @github SportsEventsAI/dev-identity
 * @subdirectory react spa
 * @filename src/config/getPolicyUrl.ts
 * @details This module exports a function to generate the URL for a given policy
 * based on the configuration provided in the singleton configuration.
 * @reference https://docs.microsoft.com/en-us/azure/active-directory-b2c/tutorial-create-user-flows
 */

import ConfigSingleton from '.';
import { IConfig } from '../types/IConfig';

/**
 * Generates the URL for a given policy.
 *
 * @param {keyof IConfig['b2c']['policies']} policyName - The name of the policy.
 * @returns {string} The URL of the policy.
 * @throws {Error} If the policy is not found.
 */
export const getPolicyUrl = (policyName: keyof IConfig['b2c']['policies']): string => {
    const config = ConfigSingleton.getInstance().config;
    const policy = config.b2c.policies[policyName];
    if (!policy) {
        throw new Error(`Policy ${policyName} not found`);
    }
    return `https://${config.b2c.tenant.name}.${config.b2c.login.domain}/${config.b2c.tenant.name}.${config.b2c.tenant.domain}/${policy}`;
};
