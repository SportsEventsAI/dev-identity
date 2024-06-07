// src/config/b2cConfig.ts

import { IB2CConfig } from '../types/IConfig';

export const b2cConfig: IB2CConfig = {
    login: {
        domain: import.meta.env.VITE_B2C_LOGIN_DOMAIN || 'login.domain.com',
    },
    tenant: {
        name: import.meta.env.VITE_B2C_TENANT_NAME || 'default-tenant-name',
        domain: import.meta.env.VITE_B2C_TENANT_DOMAIN || 'tenant.domain.com',
    },
    policies: {
        signUpSignIn: import.meta.env.VITE_B2C_POLICY_SIGNUP_SIGNIN || 'B2C_1_SignUpSignIn',
        signIn: import.meta.env.VITE_B2C_POLICY_SIGNIN || 'B2C_1_SignIn',
        resetPassword: import.meta.env.VITE_B2C_POLICY_RESET_PASSWORD || 'B2C_1_ResetPassword',
        editProfile: import.meta.env.VITE_B2C_POLICY_EDIT_PROFILE || 'B2C_1_EditProfile',
        signUp: import.meta.env.VITE_B2C_POLICY_SIGNUP || 'B2C_1_SignUp',
        signOut: import.meta.env.VITE_B2C_POLICY_SIGNOUT || 'B2C_1_SignOut',
    },
    scopes: {
        read: import.meta.env.VITE_B2C_SCOPE_READ || 'https://yourdomain.com/read',
        write: import.meta.env.VITE_B2C_SCOPE_WRITE || 'https://yourdomain.com/write',
    },
    getMsalConfig: () => null,
    getDomainUrl: () => null,
    getPolicyAuthority: () => null,
};
