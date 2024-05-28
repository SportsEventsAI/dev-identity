/**
 * Represents the configuration options for MSAL (Microsoft Authentication Library).
 */
export interface ImsalConfig {
  /**
   * The application ID.
   */
  appid: string;
  
  /**
   * The name of the application.
   */
  appname: string;
  
  /**
   * The version of the application.
   */
  appversion: string;
  
  /**
   * The B2C login URL.
   */
  b2clogin: string;
  
  /**
   * The B2C tenant.
   */
  b2ctenant: string;
  
  /**
   * The B2C sign-up or sign-in policy.
   */
  b2cSUSIPolicy: string;
  
  /**
   * The authority URL.
   */
  authority: string;
  
  /**
   * The scopes required for authentication.
   */
  scopes: string[];
  
  /**
   * The API URI.
   */
  apiUri: string;
  
  /**
   * The redirect URI.
   */
  redirectUri: string;
}

/**
 * Represents the configuration for MSAL (Microsoft Authentication Library).
 */
class MsalConfig implements ImsalConfig {
  public appid: string;
  public appname: string;
  public appversion: string;
  public b2clogin: string;
  public b2ctenant: string;
  public b2cSUSIPolicy: string;
  public authority: string;
  public scopes: string[];
  public apiUri: string;
  public redirectUri: string;

  private static instance: MsalConfig;

  /**
   * Private constructor to enforce singleton pattern.
   */
  private constructor() {
    this.appid = import.meta.env.VITE_AD_B2C_APPID;
    this.appname = import.meta.env.VITE_AD_B2C_APPNAME;
    this.appversion = import.meta.env.VITE_AD_B2C_APPVERSION;
    this.b2clogin = `${import.meta.env.VITE_AD_B2C_TENANT}${import.meta.env.VITE_AD_B2C_LOGIN_DOMAIN}`;
    this.b2ctenant = `${import.meta.env.VITE_AD_B2C_TENANT}${import.meta.env.VITE_AD_B2C_TENANT_DOMAIN}`;
    this.b2cSUSIPolicy = import.meta.env.VITE_AD_B2C_SUSI_POLICY;
    this.authority = `https://${this.b2clogin}/${this.b2ctenant}/${this.b2cSUSIPolicy}`;
    this.scopes = JSON.parse(import.meta.env.VITE_AD_B2C_SCOPES);
    this.apiUri = import.meta.env.VITE_AD_B2C_API_URI;
    this.redirectUri = import.meta.env.VITE_AD_B2C_REACT_REDIRECT_URI;
  }

  /**
   * Returns the singleton instance of MsalConfig.
   * @returns The singleton instance of MsalConfig.
   */
  public static getInstance(): MsalConfig {
    if (!MsalConfig.instance) {
      MsalConfig.instance = new MsalConfig();
    }
    return MsalConfig.instance;
  }
}

export default MsalConfig;
