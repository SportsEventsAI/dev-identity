import { useLogger } from '../../hooks/useLogger';

export const useLoggingWrapper = () => {
    const log = useLogger();

    const withLogging = <T extends (...args: any[]) => Promise<any>>(fn: T, actionName: string): T => {
        return (async (...args: Parameters<T>): Promise<ReturnType<T>> => {
            log.trace(`Calling ${actionName} with arguments:`, args);
            try {
                const result = await fn(...args);
                log.trace(`${actionName} returned:`, result);
                return result;
            } catch (error) {
                log.error(`${actionName} threw an error:`, error);
                throw error;
            }
        }) as T;
    };

    return { withLogging };
};
