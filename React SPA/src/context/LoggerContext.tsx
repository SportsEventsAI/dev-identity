import React, { ReactNode, createContext, useContext, useState } from 'react';
import { Logger, LoggerSettings } from '../utils/logger';
import { ConsoleLoggingStrategy } from '../utils/logging/loggingStrategies';

const defaultLoggerSettings: LoggerSettings = {
    logLevel: 'error',
    strategies: [new ConsoleLoggingStrategy()],
};

const LoggerContext = createContext<Logger>(new Logger(defaultLoggerSettings));

interface LoggerProviderProps {
    settings?: LoggerSettings;
    children: ReactNode;
}

export const LoggerProvider: React.FC<LoggerProviderProps> = ({ settings, children }) => {
    const [logger] = useState(new Logger(settings || defaultLoggerSettings));

    return <LoggerContext.Provider value={logger}>{children}</LoggerContext.Provider>;
};

export const useLogger = () => {
    return useContext(LoggerContext);
};

export { LoggerContext }; // Explicitly export LoggerContext
