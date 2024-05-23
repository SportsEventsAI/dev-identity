import { LogLevel } from "@azure/msal-browser";

// example: fabrikamb2c.onmicrosoft.com
const _b2login: string = `${import.meta.env.VITE_AD_B2C_TENANT as string}${
  import.meta.env.VITE_AD_B2C_LOGIN_DOMAIN as string
}`;

// example: fabrikamb2c.b2clogin.com
const _b2ctenant: string = `${import.meta.env.VITE_AD_B2C_TENANT as string}${
  import.meta.env.VITE_AD_B2C_LOGIN_DOMAIN as string
}`;

// example: B@C_1_susi_v2
const _b2cSUSIPolicy: string = import.meta.env
  .VITE_AD_B2C_SUSI_POLICY as string;

// example: B2C_1_edit_profile_v3
const _b2cProfilePolicy: string = import.meta.env
  .VITE_AD_B2C_PROFILE_POLICY as string;

export const b2cPolicies = {
  names: {
    signUpSignIn: _b2cSUSIPolicy,
    editProfile: _b2cProfilePolicy,
  },
  authorities: {
    signUpSignIn: {
      authority: `https://${_b2login}/${_b2ctenant}/${_b2cSUSIPolicy}`,
    },
    editProfile: {
      authority: `https://${_b2login}/${_b2ctenant}/${_b2cProfilePolicy}`,
    },
  },
  authorityDomain: import.meta.env.VITE_AD_B2C_TENANT as string,
};

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */

export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_AD_B2C_APPID as string,
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
    redirectUri: "/",
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: number, message: any, containsPii: any) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
  scopes: ["User.Read"],
};

/**
 * Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
