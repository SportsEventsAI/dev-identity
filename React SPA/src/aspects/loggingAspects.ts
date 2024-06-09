import { beforeMethod, afterMethod, onException, beforeInstance, afterInstance } from 'kaop-ts';
import { Logger } from 'tslog';

/**
 * @file src/aspects/loggingAspects.ts
 * @version 0.1.1
 * @date 2024-06-08
 * @summary Logging aspects
 * @contact geoff@sportsevents.ai
 * @github SportsEventsAI/dev-identity
 * @description This file contains the logging aspects related logic.
 * @author Geoffrey DeFilippi
 */


const log = new Logger({ name: 'AppLogger' });

// This advice is triggered before an instance of a class is created
export const onClassCreation = beforeInstance((meta) => {
    log.trace(`Creating instance of ${meta.target.constructor.name}`);
});

// This advice is triggered after an instance of a class is closed
export const onClassClosure = afterInstance((meta) => {
    log.trace(`Closing instance of ${meta.target.constructor.name}`);
});

// This advice is triggered before a method is called
export const onMethodCall = beforeMethod((meta) => {
    log.trace(`Calling method ${meta.key} with args:`, meta.args);
});

// This advice is triggered after a method is called and returns a result
export const onMethodResult = afterMethod((meta) => {
    log.trace(`Method ${meta.key} returned:`, meta.result);
});

// This advice is triggered when an exception occurs in a method
export const onMethodError = onException((meta) => {
    log.error(`Error in method ${meta.key}:`, meta.exception);
});

/**
 * The code above defines several advice functions using the kaop-ts library.
 * These advice functions are used to intercept and log various events in the code execution.
 * Each advice function takes a "meta" object as a parameter, which contains information about the intercepted event.
 * The "log" object is an instance of the "Logger" class from the "tslog" library, used for logging.
 * The advice functions are exported and can be used to decorate classes and methods.
 */
