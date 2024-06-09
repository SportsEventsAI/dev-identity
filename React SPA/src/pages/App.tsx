/**
 * @file src/pages/App.tsx
 * @version 0.1.1
 * @date 2024-06-08
 * @summary Appx
 * @contact geoff@sportsevents.ai
 * @github SportsEventsAI/dev-identity
 * @description This file contains the appx related logic.
 * @author Geoffrey DeFilippi
 */
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
