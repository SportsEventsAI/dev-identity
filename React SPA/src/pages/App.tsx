// src/pages/App.tsx

import React from 'react';
import AppLayout from '../components/AppLayout';
import { HomePage } from './HomePage';

/**
 * App component serves as the main entry point of the application.
 *
 * @component
 * @filename src/pages/App.tsx
 */
const App = () => {
    return (
        <AppLayout>
            <HomePage />
        </AppLayout>
    );
};

export default App;