/**
 * @file src/config/getPolicyAuthority.ts
 * @version 0.1.1
 * @date 2024-05-31
 * @brief Provides utility to generate policy URLs.
 * @contact Geoff DeFilippi, geoff@sportsevents.ai
 * @github SportsEventsAI/dev-identity
 * @subdirectory react spa
 * @filename src/config/getPolicyAuthority.ts
 * @details This module exports a function to generate the URL for a given policy
 * based on the configuration provided in the singleton configuration.
 * @reference https://docs.microsoft.com/en-us/azure/active-directory-b2c/tutorial-create-user-flows
 */

import { B2CDomainTypes, B2CPolicyTypes, IConfig } from '../types';
import { useConfig } from '../hooks/useConfig';

/**
 * Generates the URL for a given policy.
 *
 * @param {B2CPolicyTypes} policyName - The name of the policy.
 * @returns {string} The URL of the policy.
 * @throws {Error} If the policy is not found.
 */
export const getPolicyAuthority = (policyName: B2CPolicyTypes): string => {
    const config = useConfig();
    const policy = config.b2c.policies[policyName];
    if (!policy) {
        throw new Error(`Policy ${policyName} not found`);
    }
    /**
     * @reference https://learn.microsoft.com/en-us/entra/msal/dotnet/acquiring-tokens/desktop-mobile/social-identities
     * @reference https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/authority.md
     */

    const policyAuthority = 'https://{login_domain}/{tenant_domain}/{policy}'.formatUnicorn({
        login_domain: config.b2c.getDomainUrl(B2CDomainTypes.Login),
        tenant_domain: config.b2c.getDomainUrl(B2CDomainTypes.Tenant),
        policy: policy,
    });
    return policyAuthority;
};
