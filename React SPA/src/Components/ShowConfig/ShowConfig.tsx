/**
 * @file src/components/ShowConfig/ShowConfig.tsx
 * @version 0.1.1
 * @date 2024-06-08
 * @summary Showconfigx
 * @contact geoff@sportsevents.ai
 * @github SportsEventsAI/dev-identity
 * @description This file contains the showconfigx related logic.
 * @author Geoffrey DeFilippi
 */
import React, { useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { useConfig } from '../../hooks/useConfig';
import { B2CDomainTypes, B2CPolicyTypes } from '../../types';

/**
 * ShowConfig demonstrates using the useConfig hook to access configuration.
 *
 * @component
 * @filename src/components/ShowConfig.tsx
 */
const ShowConfig = () => {
    const config = useConfig();
    const [open, setOpen] = useState(false);
    return (
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Configuration Values</Accordion.Header>
                <Accordion.Body>
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
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default ShowConfig;
