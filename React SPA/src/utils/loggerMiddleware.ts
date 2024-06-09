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
