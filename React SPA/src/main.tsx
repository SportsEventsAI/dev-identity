// src/main.tsx
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import ErrorBoundary from './components/ErrorBoundary';
import { getMsalConfig } from './config';
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
const msalInstance = new PublicClientApplication(getMsalConfig());


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
