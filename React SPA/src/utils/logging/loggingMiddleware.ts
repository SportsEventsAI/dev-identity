import { Middleware } from '@reduxjs/toolkit';
import { Logger } from './logger';
import { ConsoleLoggingStrategy } from './loggingStrategies';

// Customize logger settings here
const logger = new Logger({
    logLevel: 'trace',
    strategies: [new ConsoleLoggingStrategy()], // Add other strategies as needed
});

export const loggerMiddleware: Middleware = (store) => (next) => (action) => {
    logger.trace('Dispatching action:', action);
    const result = next(action);
    logger.trace('Next state:', store.getState());
    return result;
};
