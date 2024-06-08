/**
 * @file src/main.tsx
 * @version 0.1.1
 * @date 2024-05-31
 * @brief Main entry point for the React application.
 * @contact Geoff DeFilippi, geoff@sportsevents.ai
 * @github SportsEventsAI/dev-identity
 * @subdirectory react spa
 * @filename src/main.tsx
 * @details This file sets up the main entry point for the React application, initializing necessary providers and configurations.
 * @reference https://reactjs.org/docs/getting-started.html
 */

import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './utils/stringExtensions'; // Load Prototype Extensions Early

import ErrorBoundary from './components/ErrorBoundary';
import { useConfig } from './hooks/useConfig';
import App from './pages/App';
import { store } from './redux/store';
import { logger as log } from './utils/logger';

// Style Sheet
import './main.scss';

// Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css';
import { LoggerProvider } from './context/LoggerContext';

const MainComponent = () => {
    useEffect(() => {
        log.trace('MainComponent did mount');

        const config = useConfig();
        log.trace('Config loaded', config);
        const msalConfig = config.b2c.getMsalConfig();
        log.trace('Msal Config loaded', msalConfig);
        if (!msalConfig) {
            log.error('Msal Configuration not found');
            throw new Error('Msal Configuration not found');
        }

        const msalInstance = new PublicClientApplication(msalConfig);
        log.trace('Msal Instance created', msalInstance);

        createRoot(document.getElementById('root')!).render(
            <LoggerProvider>
                <Provider store={store}>
                    <ErrorBoundary>
                        <MsalProvider instance={msalInstance}>
                            <App />
                        </MsalProvider>
                    </ErrorBoundary>
                </Provider>
            </LoggerProvider>,
        );
    }, [log]);

    return null;
};

// Render the application
// Remove the call to createRoot and directly render the MainComponent
const root = createRoot(document.getElementById('root')!);
root.render(<MainComponent />);
