/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_AD_B2C_TENANT: string;
  readonly VITE_AD_B2C_SIGN_IN_POLICY: string;
  readonly VITE_AD_B2C_APPLICATION_ID: string;
  readonly VITE_AD_B2C_REACT_REDIRECT_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
