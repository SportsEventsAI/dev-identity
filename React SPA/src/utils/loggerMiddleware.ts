/**
 * @file src/utils/loggerMiddleware.ts
 * @version 0.1.1
 * @date 2024-06-08
 * @summary Middleware for logging actions and states.
 * @contact Geoff DeFilippi, geoff@sportsevents.ai
 * @github SportsEventsAI/dev-identity
 * @description This middleware logs actions and the resulting state for debugging and monitoring purposes.
 * @notes This middleware should be included in the Redux store configuration.
 * @reference https://redux.js.org/usage/middleware
*/
import { Middleware } from '@reduxjs/toolkit';
import { Logger } from 'tslog';

const log = new Logger({ name: 'ReduxLogger' });

const loggerMiddleware: Middleware = (storeApi) => (next) => (action) => {
    log.info(`Dispatching action:`, action);

    const result = next(action);

    log.debug('Next state:', storeApi.getState());

    return result;
};

export default loggerMiddleware;
