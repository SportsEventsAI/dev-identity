// src/pages/App.tsx

import React from 'react';
import AuthButton from '../components/AuthButton';
import ErrorState from '../components/ErrorState';
import ShowConfig from '../components/ShowConfig/ShowConfig';
import useAuth from '../hooks/useAuth';
import HomePage from './HomePage';

/**
 * App component serves as the main entry point of the application.
 *
 * @component
 * @filename src/pages/App.tsx
 */
const App = () => {
    // Get the isAuthenticated state from the useAuth hook
    const { isAuthenticated } = useAuth();

    return (
        <div>
            <header>
                <AuthButton />
                <ErrorState />
            </header>
            <main>
                {isAuthenticated ? (
                    <>
                        <ShowConfig />
                    </>
                ) : (
                    <HomePage />
                )}
            </main>
        </div>
    );
};

export default App;
