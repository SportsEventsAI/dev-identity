/// <reference types="vite/client" />

/**
 * Represents the environment variables available in the import.meta.env object.
 */
interface ImportMetaEnv {
    readonly VITE_AD_B2C_API_URI: string;
    readonly VITE_AD_B2C_TENANT: string;
    readonly VITE_AD_B2C_LOGIN_DOMAIN: string;
    readonly VITE_AD_B2C_TENANT_DOMAIN: string;

    readonly VITE_AD_B2C_SUSI_POLICY: string;
    readonly VITE_AD_B2C_PROFILE_POLICY: string;

    readonly VITE_AD_B2C_APPID: string;
    readonly VITE_AD_B2C_APPNAME: string;
    readonly VITE_AD_B2C_APPVERSION: string;
    readonly VITE_AD_B2C_SCOPES: string;

    readonly VITE_AD_B2C_REACT_REDIRECT_URI: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
