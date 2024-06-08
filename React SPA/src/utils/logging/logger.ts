import { LoggingStrategy, ConsoleLoggingStrategy } from './loggingStrategies';

export interface LoggerSettings {
    logLevel: 'trace' | 'debug' | 'info' | 'warn' | 'error';
    strategies: LoggingStrategy[];
}

export class Logger {
    private settings: LoggerSettings;
    private instanceLogLevel: 'trace' | 'debug' | 'info' | 'warn' | 'error';

    constructor(settings: LoggerSettings, instanceLogLevel?: 'trace' | 'debug' | 'info' | 'warn' | 'error') {
        this.settings = settings;
        this.instanceLogLevel = instanceLogLevel || settings.logLevel;
    }

    private shouldLog(level: string): boolean {
        const levels = ['trace', 'debug', 'info', 'warn', 'error'];
        return levels.indexOf(level) >= levels.indexOf(this.instanceLogLevel);
    }

    private log(level: string, message: string, ...args: any[]) {
        if (this.shouldLog(level)) {
            this.settings.strategies.forEach((strategy) => strategy.log(level, message, ...args));
        }
    }

    trace(message: string, ...args: any[]) {
        this.log('trace', message, ...args);
    }

    debug(message: string, ...args: any[]) {
        this.log('debug', message, ...args);
    }

    info(message: string, ...args: any[]) {
        this.log('info', message, ...args);
    }

    warn(message: string, ...args: any[]) {
        this.log('warn', message, ...args);
    }

    error(message: string, ...args: any[]) {
        this.log('error', message, ...args);
    }

    setInstanceLogLevel(level: 'trace' | 'debug' | 'info' | 'warn' | 'error') {
        this.instanceLogLevel = level;
    }
}
