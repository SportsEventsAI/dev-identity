/**
 * @file src/config/getDomainUrl.ts
 * @version 0.1.1
 * @date 2024-05-31
 * @summary Provides utility to generate domain URLs.
 * @contact Geoff DeFilippi, geoff@sportsevents.ai
 * @github SportsEventsAI/dev-identity
 * @description This module exports a function to generate the domain URL based on the type.
 * The configuration is provided in the singleton configuration.
 * @reference https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-reference-oauth-code
 */

import { B2CDomainTypes } from '../types';
import { useConfig } from '../hooks/useConfig';

/**
 * Generates the domain URL based on the type.
 *
 * @param {B2CDomainTypes} domainType - The type of domain (tenant or login).
 * @returns {string} The domain URL.
 * @throws {Error} If the domain type is invalid.
 */
export const getDomainUrl = (domainType: B2CDomainTypes): string => {
    const config = useConfig();
    if (domainType === B2CDomainTypes.Tenant) {
        return '{tenant}.{tenant_domain}'.formatUnicorn({
            tenant: config.b2c.tenant.name,
            tenant_domain: config.b2c.tenant.domain,
        });
    } else if (domainType === B2CDomainTypes.Login) {
        return '{tenant}.{login_domain}'.formatUnicorn({
            tenant: config.b2c.tenant.name,
            login_domain: config.b2c.login.domain,
        });
    } else {
        throw new Error(`Invalid domain type: ${domainType}`);
    }
};
