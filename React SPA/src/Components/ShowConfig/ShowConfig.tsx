// src/components/ShowConfig.tsx

import React from 'react';
import { useConfig } from '../../hooks/useConfig';
import { B2CDomainTypes, B2CPolicyTypes } from '../../types';

/**
 * ShowConfig demonstrates using the useConfig hook to access configuration.
 *
 * @component
 * @filename src/components/ShowConfig.tsx
 */
const ShowConfig = (): JSX.Element => {
    const config = useConfig();

    return (
        <div>
            <h1>Configuration Values</h1>
            <p>App ID: {config.app.id}</p>
            <p>App Name: {config.app.name}</p>
            <p>App Version: {config.app.version}</p>
            <p>Redirect URI: {config.app.redirectUri}</p>
            <p>API URI: {config.api.uri}</p>
            <p>B2C Login Domain: {config.b2c.login.domain}</p>
            <p>B2C Tenant Name: {config.b2c.tenant.name}</p>
            <p>B2C Tenant Domain: {config.b2c.tenant.domain}</p>
            <p>B2C Policy SignUpSignIn: {config.b2c.policies.signUpSignIn}</p>
            <p>B2C Policy SignIn: {config.b2c.policies.signIn}</p>
            <p>B2C Policy ResetPassword: {config.b2c.policies.resetPassword}</p>
            <p>B2C Policy EditProfile: {config.b2c.policies.editProfile}</p>
            <p>B2C Policy SignUp: {config.b2c.policies.signUp}</p>
            <p>B2C Policy SignOut: {config.b2c.policies.signOut}</p>
            <p>B2C Scope Read: {config.b2c.scopes.read}</p>
            <p>B2C Scope Write: {config.b2c.scopes.write}</p>
            <p>Policy URL: {config.b2c.getPolicyAuthority(B2CPolicyTypes.SignUpSignIn)}</p>
            <p>Tenant Domain URL: {config.b2c.getDomainUrl(B2CDomainTypes.Tenant)}</p>
        </div>
    );
};

export default ShowConfig;
