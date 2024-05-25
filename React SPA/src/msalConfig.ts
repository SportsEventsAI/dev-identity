export interface ImsalConfig {
  appid: string;
  appname: string;
  appversion: string;
  b2clogin: string;
  b2ctenant: string;
  b2cSUSIPolicy: string;
  authority: string;
  scopes: string[];
  apiUri: string;
  redirectUri: string;
}

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

  public static getInstance(): MsalConfig {
    if (!MsalConfig.instance) {
      MsalConfig.instance = new MsalConfig();
    }
    return MsalConfig.instance;
  }
}

export default MsalConfig;
