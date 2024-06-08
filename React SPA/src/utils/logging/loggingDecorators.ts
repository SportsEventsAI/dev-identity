// src/utils/loggingDecorators.ts
import { Logger } from './logger';
import { ConsoleLoggingStrategy } from './loggingStrategies';

// Customize logger settings here
const logger = new Logger({
    logLevel: 'trace',
    strategies: [new ConsoleLoggingStrategy()], // Add other strategies as needed
});

export function LogMethod(): MethodDecorator {
    return function (target, propertyKey, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            logger.trace(`Calling ${String(propertyKey)} with arguments:`, args);
            try {
                const result = originalMethod.apply(this, args);
                logger.trace(`Called ${String(propertyKey)} and returned:`, result);
                return result;
            } catch (error) {
                logger.error(`Exception in ${String(propertyKey)}:`, error);
                throw error;
            }
        };

        return descriptor;
    };
}
