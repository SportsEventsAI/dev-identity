// src/components/ResetPassword.tsx

import React, { useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { InteractionRequiredAuthError } from '@azure/msal-browser';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../redux/authSlice';

/**
 * ResetPassword component handles the reset password user flow using MSAL.
 *
 * @component
 * @filename src/components/ResetPassword.tsx
 */
const ResetPassword = (): React.ReactNode => {
    const { instance } = useMsal();
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const resetPasswordRequest = {
                authority: 'https://login.microsoftonline.com/your-tenant-id',
                scopes: ['openid'],
                loginHint: email,
            };

            await instance.loginPopup(resetPasswordRequest);
            dispatch(resetPassword());
        } catch (error: any) {
            if (error instanceof InteractionRequiredAuthError) {
                instance.loginPopup(resetPasswordRequest);
            } else {
                setError(error.message);
            }
        }
    };

    return (
        <form onSubmit={handleResetPassword}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <button type="submit">Reset Password</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default ResetPassword;
