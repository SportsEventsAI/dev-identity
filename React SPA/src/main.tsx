// src/main.tsx
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './store';

import App from './components/App';
import { msalConfig } from './config/authConfig';

// Style Sheet
import './main.scss';

// Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * Creates a new instance of the PublicClientApplication class.
 * @param {MsalConfiguration} config - The configuration object for MSAL.
 * @returns {PublicClientApplication} - The newly created instance of PublicClientApplication.
 */
const msalInstance = new PublicClientApplication(msalConfig);

const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(
        <Provider store={store}>
            <MsalProvider instance={msalInstance}>
                <App />
            </MsalProvider>
        </Provider>,
    );
}
