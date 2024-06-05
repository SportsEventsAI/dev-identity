// src/components/AppLayout.tsx

import React, { ReactNode } from 'react';
import AuthButton from './AuthButton';

interface AppLayoutProps {
    children: ReactNode;
}

/**
 * AppLayout component serves as the main layout of the application.
 *
 * @component
 * @filename src/components/AppLayout.tsx
 */
const AppLayout = ({ children }: AppLayoutProps): JSX.Element => {
    return (
        <div>
            <header>
                <AuthButton />
            </header>
            <main>{children}</main>
        </div>
    );
};

export default AppLayout;
