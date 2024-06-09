/**
 * @file src/types/index.ts
 * @version 0.1.1
 * @date 2024-06-08
 * @summary Type DeFinitions for this project.
 * @contact Geoff DeFilippi, geoff@sportsevents.ai
 * @github SportsEventsAI/dev-identity
 * @description This is the main file of types for this project.
 */

import { Configuration } from '@azure/msal-browser';

// Enum defining different authentication action types
export enum AuthActionTypes {
    Login = 'Login',
    Logout = 'Logout',
    ResetPassword = 'ResetPassword',
}

// Enum defining different authentication action statuses
export enum AuthActionStatus {
    Success = 'SUCCESS',
    Failure = 'FAILURE',
}

// Enum defining different B2C domain types
export enum B2CDomainTypes {
    Tenant = 'tenant',
    Login = 'login',
}

// Enum defining different B2C policy types
export enum B2CPolicyTypes {
    SignUpSignIn = 'signUpSignIn',
    SignIn = 'signIn',
    ResetPassword = 'resetPassword',
    EditProfile = 'editProfile',
    SignUp = 'signUp',
    SignOut = 'signOut',
}

// Interface defining the configuration for the app
interface IAppConfig {
    id: string;
    name: string;
    version: string;
    redirectUri: string;
}

// Interface defining the configuration for the API
interface IApiConfig {
    uri: string;
}

// Interface defining the login configuration for B2C
interface IB2CLoginConfig {
    domain: string;
}

// Interface defining the tenant configuration for B2C
interface IB2CTenantConfig {
    name: string;
    domain: string;
}

// Interface defining the policies configuration for B2C
interface IB2CPoliciesConfig {
    signUpSignIn: string;
    signIn: string;
    resetPassword: string;
    editProfile: string;
    signUp: string;
    signOut: string;
}

// Interface defining the scopes configuration for B2C
interface IB2CScopesConfig {
    read: string;
    write: string;
}

// Interface defining the overall B2C configuration
export interface IB2CConfig {
    login: IB2CLoginConfig;
    tenant: IB2CTenantConfig;
    policies: IB2CPoliciesConfig;
    scopes: IB2CScopesConfig;
    // I'm not sure how this really works below, but my logic
    // is that since when we create the ConfigSingleton instance and that is where
    // we assign the getMsalConfig, getDomainUrl, and getPolicyAuthority methods
    // these need to be the return type or null as they are not assigned until
    // the ConfigSingleton is created.
    getMsalConfig: () => Configuration | null;
    getDomainUrl: (domainType: B2CDomainTypes) => string | null;
    getPolicyAuthority: (policy: B2CPolicyTypes) => string | null;
}

// Interface defining the overall configuration for the project
export interface IConfig {
    app: IAppConfig;
    api: IApiConfig;
    b2c: IB2CConfig;
}
