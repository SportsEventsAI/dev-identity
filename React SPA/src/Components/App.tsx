// src/components/App.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Login from './Login';

const App: React.FC = () => {
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

    const name = user?.name ?? 'Unknown';

    return (
        <div>
            {isAuthenticated ? (
                <div>
                    <h1>Welcome, {name}</h1>
                    {/* Add more authenticated content here */}
                </div>
            ) : (
                <Login />
            )}
        </div>
    );
};

export default App;
