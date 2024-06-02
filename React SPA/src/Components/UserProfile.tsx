// src/components/UserProfile.tsx

import { useMsal } from '@azure/msal-react';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

/**
 * UserProfile component displays the user's profile information.
 *
 * @component
 * @filename src/components/UserProfile.tsx
 */
const UserProfile = (): React.ReactNode => {
    const { instance } = useMsal();
    const user = useSelector((state: RootState) => state.auth.user);

    const handleEditProfile = () => {
        const editProfileRequest = {
            authority: 'https://login.microsoftonline.com/your-tenant-id',
            scopes: ['openid'],
        };

        instance.loginPopup(editProfileRequest);
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>User Profile</h2>
            <p>
                <strong>Name:</strong> {user.name}
            </p>
            <p>
                <strong>Email:</strong> {user.email}
            </p>
            <button onClick={handleEditProfile}>Edit Profile</button>
        </div>
    );
};

export default UserProfile;
