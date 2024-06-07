// src/config/IConfig.ts

import { Configuration } from '@azure/msal-browser';

export enum AuthActionTypes {
    Login = 'Login',
    Logout = 'Logout',
    ResetPassword = 'ResetPassword',
}

export enum AuthActionStatus {
    Success = 'SUCCESS',
    Failure = 'FAILURE',
}

export enum B2CDomainTypes {
    Tenant = 'tenant',
    Login = 'login',
}

export enum B2CPolicyTypes {
    SignUpSignIn = 'signUpSignIn',
    SignIn = 'signIn',
    ResetPassword = 'resetPassword',
    EditProfile = 'editProfile',
    SignUp = 'signUp',
    SignOut = 'signOut',
}
export interface IAppConfig {
    id: string;
    name: string;
    version: string;
    redirectUri: string;
}

export interface IApiConfig {
    uri: string;
}

export interface IB2CLoginConfig {
    domain: string;
}

export interface IB2CTenantConfig {
    name: string;
    domain: string;
}

export interface IB2CPoliciesConfig {
    signUpSignIn: string;
    signIn: string;
    resetPassword: string;
    editProfile: string;
    signUp: string;
    signOut: string;
}

export interface IB2CScopesConfig {
    read: string;
    write: string;
}

export interface IB2CConfig {
    login: IB2CLoginConfig;
    tenant: IB2CTenantConfig;
    policies: IB2CPoliciesConfig;
    scopes: IB2CScopesConfig;
    getMsalConfig: () => Configuration | null;
    getDomainUrl: (domainType: B2CDomainTypes) => string | null;
    getPolicyAuthority: (policy: B2CPolicyTypes) => string | null;
}

export interface IConfig {
    app: IAppConfig;
    api: IApiConfig;
    b2c: IB2CConfig;
}

export interface IConfigResult {
    config: IConfig;
}
