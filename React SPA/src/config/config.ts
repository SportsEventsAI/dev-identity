import { B2CDomainType } from '../types/b2cTypes';

/**
 * Represents the configuration options for MSAL (Microsoft Authentication Library).
 */
export interface IConfig {
    /**
     * Represents the application details.
     */
    app: {
        id: string;
        name: string;
        version: string;
        redirectUri: string;
    };

    /**
     * Represents the API details.
     */
    api: {
        uri: string;
    };

    /**
     * Represents the B2C details.
     */
    b2c: {
        /**
         * The B2C login details.
         */
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
    };
}

/**
 * Represents the configuration settings for the application.
 */
class Config implements IConfig {
    public app: {
        id: string;
        name: string;
        version: string;
        redirectUri: string;
    };

    public api: {
        uri: string;
    };

    public b2c: {
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
    };

    private static instance: Config;

    /**
     * Private constructor to enforce singleton pattern.
     */
    private constructor() {
        this.app = {
            id: import.meta.env.VITE_APP_ID,
            name: import.meta.env.VITE_APP_NAME,
            version: import.meta.env.VITE_APP_VERSION,
            redirectUri: import.meta.env.VITE_APP_REDIRECT_URI,
        };

        this.api = {
            uri: import.meta.env.VITE_API_URI,
        };

        this.b2c = {
            login: {
                name: import.meta.env.VITE_AD_B2C_LOGIN_NAME,
                id: import.meta.env.VITE_AD_B2C_LOGIN_ID,
                domain: import.meta.env.VITE_AD_B2C_LOGIN_DOMAIN,
            },
            tenant: {
                name: import.meta.env.VITE_AD_B2C_TENANT_NAME,
                id: import.meta.env.VITE_AD_B2C_TENANT_ID,
                domain: import.meta.env.VITE_AD_B2C_TENANT_DOMAIN,
            },
            policies: {
                signUpSignIn: import.meta.env.VITE_AD_B2C_POLICY_SUSI,
                resetPassword: import.meta.env.VITE_AD_B2C_POLICY_RESET_PASSWORD,
                editProfile: import.meta.env.VITE_AD_B2C_POLICY_EDIT_PROFILE,
                signIn: import.meta.env.VITE_AD_B2C_POLICY_SIGNIN,
                signUp: import.meta.env.VITE_AD_B2C_POLICY_SIGNUP,
                signOut: import.meta.env.VITE_AD_B2C_POLICY_SIGNOUT,
            },
            scopes: {
                read: import.meta.env.VITE_AD_B2C_SCOPES_READ,
                write: import.meta.env.VITE_AD_B2C_SCOPES_WRITE,
            },
        };
    }

    /**
     * Returns the singleton instance of MsalConfig.
     * @returns The singleton instance of MsalConfig.
     */
    public static getInstance(): Config {
        if (!Config.instance) {
            Config.instance = new Config();
        }
        return Config.instance;
    }

    /**
     * Constructs the authority URL for a given policy.
     * @param policyName The policy name. Defaults to 'signUpSignIn'.
     * @returns The authority URL for the specified policy.
     */
    public getAuthority(policyName: keyof IConfig['b2c']['policies'] = 'signUpSignIn'): string {
        const policy = this.b2c.policies[policyName];
        if (!policy) {
            throw new Error(`Policy ${policyName} not found`);
        }
        return `https://${this.b2c.tenant.name}.${this.b2c.login.domain}/${this.b2c.tenant.name}.${this.b2c.tenant.domain}/${policy}`;
    }

    /**
     * Constructs the full domain URL based on the specified type.
     * @param domainType The type of domain ('tenant' or 'login').
     * @returns The full domain URL.
     */
    public getDomain(domainType: B2CDomainType): string {
        if (domainType === 'tenant') {
            return `${this.b2c.tenant.name}.${this.b2c.tenant.domain}`;
        } else if (domainType === 'login') {
            return `${this.b2c.tenant.name}.${this.b2c.login.domain}`;
        } else {
            throw new Error(`Invalid domain type: ${domainType}`);
        }
    }
}

export default Config;
