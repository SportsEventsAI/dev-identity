/**
 * @file src/config/b2cConfig.ts
 * @version 0.1.1
 * @date 2024-06-08
 * @summary B2Cconfig
 * @contact geoff@sportsevents.ai
 * @github SportsEventsAI/dev-identity
 * @description This file contains the b2cconfig related logic.
 * @author Geoffrey DeFilippi
 */

import { IB2CConfig } from '../types';

/**
 * Configuration object for B2C settings.
 */
export const b2cConfig: IB2CConfig = {
    /**
     * Login configuration.
     */
    login: {
        /**
         * B2C login domain.
         * Defaults to 'login.example.com' if not provided in environment variables.
         * The AD B2C login domain without any prefix.
         * B2C uses tenant.b2clogin.com for the base login domain.
         * it is later appended with the tenant name and policy.
         */
        domain: import.meta.env.VITE_B2C_LOGIN_DOMAIN || 'login.example.com',
    },
    /**
     * Tenant configuration.
     */
    tenant: {
        /**
         * B2C tenant name.
         * Defaults to 'default-tenant-name' if not provided in environment variables.
         * The AD B2C Tenant Name
         * will later be appended to the tenant domain below.
         */
        name: import.meta.env.VITE_B2C_TENANT_NAME || 'default-tenant-name',
        /**
         * B2C tenant domain.
         * Defaults to 'tenant.domain.com' if not provided in environment variables.
         * The AD B2C tenant domain without any prefix.
         */
        domain: import.meta.env.VITE_B2C_TENANT_DOMAIN || 'tenant.example.com',
    },
    /**
     * B2C policies configuration.
     */
    policies: {
        /**
         * Sign up and sign in policy.
         * Defaults to 'B2C_1_SignUpSignIn' if not provided in environment variables.
         * This policy is used for both sign up and sign in.
         * A default policy that combines both sign up and sign in and is created in
         * the Azure AD B2C portal.
         */
        signUpSignIn: import.meta.env.VITE_B2C_POLICY_SIGNUP_SIGNIN || 'B2C_1_SignUpSignIn',
        /**
         * Sign in policy.
         * Defaults to 'B2C_1_SignIn' if not provided in environment variables.
         * A policy that is created in the Azure AD B2C portal for sign in.
         */
        signIn: import.meta.env.VITE_B2C_POLICY_SIGNIN || 'B2C_1_SignIn',
        /**
         * Reset password policy.
         * Defaults to 'B2C_1_ResetPassword' if not provided in environment variables.
         * A policy that is created in the Azure AD B2C portal for resetting the password.
         */
        resetPassword: import.meta.env.VITE_B2C_POLICY_RESET_PASSWORD || 'B2C_1_ResetPassword',
        /**
         * Edit profile policy.
         * Defaults to 'B2C_1_EditProfile' if not provided in environment variables.
         * A policy that is created in the Azure AD B2C portal for editing the profile.
         */
        editProfile: import.meta.env.VITE_B2C_POLICY_EDIT_PROFILE || 'B2C_1_EditProfile',
        /**
         * Sign up policy.
         * Defaults to 'B2C_1_SignUp' if not provided in environment variables.
         * A policy that is created in the Azure AD B2C portal for signing up.
         */
        signUp: import.meta.env.VITE_B2C_POLICY_SIGNUP || 'B2C_1_SignUp',
        /**
         * Sign out policy.
         * Defaults to 'B2C_1_SignOut' if not provided in environment variables.
         * A policy that is created in the Azure AD B2C portal for signing out.
         */
        signOut: import.meta.env.VITE_B2C_POLICY_SIGNOUT || 'B2C_1_SignOut',
    },
    /**
     * B2C scopes configuration.
     * Add your scopes here. Each scope should return a string that is the uri of the scope.
     * These scopes are used for authorization.
     */
    scopes: {
        /**
         * Read scope.
         * Defaults to 'https://yourdomain.com/read' if not provided in environment variables.
         * The scope for read operations. Also defined in the exposed api in the B2C portal.
         */
        read: import.meta.env.VITE_B2C_SCOPE_READ || 'https://yourdomain.com/read',
        /**
         * Write scope.
         * Defaults to 'https://yourdomain.com/write' if not provided in environment variables.
         */
        write: import.meta.env.VITE_B2C_SCOPE_WRITE || 'https://yourdomain.com/write',
    },
    /**
     * We expect the following functions to be defined external files
     * that will be loaded into the singleton class for configuration.
     * TODO: fix this to be more flexibile and dynamic.
     * TODO: add error handling for missing functions.
     * TODO: this could be like a wordpress hook system.
     */
    /**
     * Function to get MSAL configuration.
     * Returns null.
     * ./getMsalConfig.ts
     */
    getMsalConfig: () => null,
    /**
     * Function to get domain URL.
     * Returns null.
     * ./getDomainUrl.ts
     */
    getDomainUrl: () => null,
    /**
     * Function to get policy authority.
     * Returns null.
     * ./getPolicyAuthority.ts
     */
    getPolicyAuthority: () => null,
};
