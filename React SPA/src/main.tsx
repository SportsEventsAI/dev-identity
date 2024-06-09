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
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './utils/stringExtensions'; // Load Prototype Extensions Early

import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { useConfig } from './hooks/useConfig';
import App from './pages/App';
import { store } from './redux/store';

// Style Sheet
import './main.scss';

// Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Creates a new instance of the PublicClientApplication class.
 * @param {MsalConfiguration} config - The configuration object for MSAL.
 * @returns {PublicClientApplication} - The newly created instance of PublicClientApplication.
 * @filename src/main.tsx
 */
const config = useConfig();
const msalConfig = config.b2c.getMsalConfig();

if (!msalConfig) {
    throw new Error('Msal Configuration not found');
}
const msalInstance = new PublicClientApplication(msalConfig);

// Render the application
const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(
        <Provider store={store}>
            <ErrorBoundary>
                <MsalProvider instance={msalInstance}>
                    <App />
                </MsalProvider>
            </ErrorBoundary>
        </Provider>,
    );
}
