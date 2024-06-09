// src/components/ErrorState.tsx

/**
 * @file src/components/ErrorState.tsx
 * @version 0.1.1
 * @date 2024-06-08
 * @summary Errorstatex
 * @contact Geoff DeFilippi, geoff@sportsevents.ai
 * @github SportsEventsAI/dev-identity
 * @description This file contains the errorstatex related logic.
 */
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // Adjust the import according to your store setup

const ErrorState: React.FC = () => {
    const error = useSelector((state: RootState) => state.error.error);
    const [isCollapsed, setIsCollapsed] = React.useState(true);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div>
            {error ? (
                <div>
                    <button onClick={toggleCollapse}>
                        {isCollapsed ? 'Show Error Details' : 'Hide Error Details'}
                    </button>
                    <div style={{ display: isCollapsed ? 'none' : 'block' }}>
                        <pre>{JSON.stringify(error, null, 2)}</pre>
                    </div>
                </div>
            ) : (
                <div style={{ color: 'green' }}>No error</div>
            )}
        </div>
    );
};

export default ErrorState;
