// src/config/IConfig.ts

export enum B2CDomainTypes {
    Tenant = 'tenant',
    Login = 'login',
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

export interface IB2CConfig {
    login: {
        name: string;
        id: string;
        domain: string;
    };
    tenant: {
        name: string;
        id: string;
        domain: string;
    };
    policies: {
        signUpSignIn: string;
        signIn: string;
        resetPassword: string;
        editProfile: string;
        signUp: string;
        signOut: string;
    };
    scopes: {
        read: string;
        write: string;
    };
}

export interface IConfig {
    app: IAppConfig;
    api: IApiConfig;
    b2c: IB2CConfig;
}

export interface IConfigResult {
    config: IConfig;
    getPolicyUrl: (policyName: keyof IConfig['b2c']['policies']) => string;
    getDomainUrl: (domainType: B2CDomainTypes) => string;
}
