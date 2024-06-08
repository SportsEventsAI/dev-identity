// src/utils/loggingStrategies.ts

// Define an interface for logging strategies
export interface LoggingStrategy {
    log(level: string, message: string, ...args: any[]): void;
}

// Console logging strategy
type ConsoleMethods = 'log' | 'info' | 'warn' | 'error';

export class ConsoleLoggingStrategy implements LoggingStrategy {
    log(level: ConsoleMethods, message: string, ...args: any[]): void {
        console[level](message, ...args);
    }
}

// Placeholder for file logging strategy (implement logic as needed)
export class FileLoggingStrategy implements LoggingStrategy {
    private filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
    }

    log(level: string, message: string, ...args: any[]): void {
        // Implement file logging logic here
    }
}

// Placeholder for cloud logging strategy (implement logic as needed)
export class CloudLoggingStrategy implements LoggingStrategy {
    log(level: string, message: string, ...args: any[]): void {
        // Implement cloud logging logic here (e.g., Azure)
    }
}
