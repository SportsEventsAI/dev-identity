// src/components/ErrorBoundary.tsx

import React, { Component, ReactNode } from 'react';
import { ConnectedProps, connect } from 'react-redux';
import { logError } from '../redux/errorSlice';
import { RootState } from '../redux/store';

interface ErrorBoundaryProps extends PropsFromRedux {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
        this.props.logError({ error, errorInfo }); // Dispatch action to log error
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = {
    logError,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ErrorBoundary);
