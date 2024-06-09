/**
 * @file src/components/ErrorBoundary.tsx
 * @version 0.1.1
 * @date 2024-06-08
 * @summary Errorboundaryx
 * @contact Geoff DeFilippi, geoff@sportsevents.ai
 * @github SportsEventsAI/dev-identity
 * @description This file contains the errorboundaryx related logic.
 * @abstract ErrorBoundary component to catch and display errors in the component tree.
 * I don't find this to be of any value in a production environment.
 * TODO: Use in development only.
 */
import React, { Component, ErrorInfo } from 'react';
import styles from './ErrorBoundary.module.scss';

// Define the props interface for the ErrorBoundary component
interface Props {
    children: React.ReactNode;
}

// Define the state interface for the ErrorBoundary component
interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

// ErrorBoundary component to catch and display errors in the component tree
class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    // A static method that is called when an error is thrown in a descendant component
    // It updates the state to indicate that an error has occurred
    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    // A method that is called when an error is caught by the ErrorBoundary component
    // It updates the state with the error and errorInfo and logs the error to the console
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({ error, errorInfo });
        console.error('ErrorBoundary caught an error', error, errorInfo); // Enhanced logging
    }

    // Render method of the ErrorBoundary component
    render() {
        // If an error has occurred, render an error message with details
        if (this.state.hasError) {
            return (
                <div className={styles.container}>
                    <div className={styles.message}>Something went wrong.</div>
                    <details className={styles.details}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.errorInfo?.componentStack}
                    </details>
                </div>
            );
        }

        // If no error has occurred, render the children components
        return this.props.children;
    }
}

export default ErrorBoundary;
