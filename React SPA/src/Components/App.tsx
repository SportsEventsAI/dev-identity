// src/components/App.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Login from './Login';

const App: React.FC = () => {
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

    return (
        <div>
            {isAuthenticated ? (
                <div>
                    <h1>Welcome, {user.name}</h1>
                    {/* Add more authenticated content here */}
                </div>
            ) : (
                <Login />
            )}
        </div>
    );
};

export default App;
