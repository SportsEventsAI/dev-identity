/**
 * @file src/components/ErrorState.tsx
 * @version 0.1.1
 * @date 2024-05-31
 * @summary Component to display errors in a collapsible format.
 * @contact Geoff DeFilippi, geoff@sportsevents.ai
 * @github SportsEventsAI/dev-identity
 * @description This component displays errors in a collapsible format, allowing users to navigate through nested error details.
 * @details The component supports depth-first style navigation for nested objects within the error details.
 * @reference https://reactjs.org/docs/error-boundaries.html
 */

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const ErrorState: React.FC = () => {
    const [collapsed, setCollapsed] = useState(true);
    const error = useSelector((state: RootState) => state.auth.error);

    const renderErrorDetails = (error: any) => {
        if (typeof error === 'object' && error !== null) {
            return Object.entries(error).map(([key, value]) => (
                <div key={key} style={{ marginLeft: '20px' }}>
                    <strong>{key}: </strong>
                    {typeof value === 'object' ? (
                        <div>
                            <button onClick={() => setCollapsed(!collapsed)}>
                                {collapsed ? 'Show' : 'Hide'} Details
                            </button>
                            {!collapsed && <div>{renderErrorDetails(value)}</div>}
                        </div>
                    ) : (
                        <span>{value}</span>
                    )}
                </div>
            ));
        }
        return <span>{String(error)}</span>;
    };

    if (!error) {
        return null;
    }

    return (
        <div>
            <h2>Error Occurred</h2>
            {renderErrorDetails(error)}
        </div>
    );
};

export default ErrorState;
