import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MsalProvider, useIsAuthenticated, useMsal } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './authConfig';
import ItemsPage from './Components/items/ItemsPage';
import { loginRequest } from './authConfig';

// Initialize MSAL instance
const msalInstance = new PublicClientApplication(msalConfig);

const App: React.FC = () => {
    const isAuthenticated = useIsAuthenticated();

    return (
        <MsalProvider instance={msalInstance}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    {isAuthenticated ? (
                        <Route path="/items/*" element={<ItemsPage />} />
                    ) : (
                        <Route path="/login" element={<Login />} />
                    )}
                </Routes>
            </Router>
        </MsalProvider>
    );
};

const Home: React.FC = () => {
    const { instance } = useMsal();
    const isAuthenticated = useIsAuthenticated();

    const handleLogin = () => {
        instance.loginPopup(loginRequest).catch((e) => {
            console.error(e);
        });
    };

    const handleLogout = () => {
        instance.logoutPopup().catch((e) => {
            console.error(e);
        });
    };

    return (
        <div>
            <h1>Welcome to the React App with MSAL</h1>
            {isAuthenticated ? (
                <button onClick={handleLogout}>Logout</button>
            ) : (
                <button onClick={handleLogin}>Login</button>
            )}
        </div>
    );
};

const Login: React.FC = () => {
    const { instance } = useMsal();

    const handleLogin = () => {
        instance.loginPopup(loginRequest).catch((e) => {
            console.error(e);
        });
    };

    return (
        <div>
            <h2>Please log in to access the items page</h2>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default App;

/**
 * Code Haiku
 * 2024-05-24
 * Integrated MSAL authentication and routing logic in App component
 */
