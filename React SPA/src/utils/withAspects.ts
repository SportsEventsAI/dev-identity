/**
 * @file src/utils/withAspects.ts
 * @version 0.1.1
 * @date 2024-06-08
 * @summary Withaspects
 * @contact geoff@sportsevents.ai
 * @github SportsEventsAI/dev-identity
 * @description This file contains the withaspects related logic.
 * @author Geoffrey DeFilippi
 */
import { applyAspect } from 'kaop-ts';
import * as aspects from '../aspects/loggingAspects';

/**
 * Applies aspects to a hook logic object.
 *
 * @param hookLogic - The hook logic function.
 * @param hookName - The name of the hook.
 * @returns A new function that applies aspects to each method in the logic object.
 */
export const withAspects = (hookLogic: () => any) => {
    return () => {
        // Invoking the hook logic function and storing the result in the 'logic' variable
        const logic = hookLogic();

        // Apply aspects to each method in the logic object
        // Iterating over each key in the 'logic' object
        Object.keys(logic).forEach((key) => {
            // Checking if the value associated with the key is a function
            if (typeof logic[key] === 'function') {
                // Iterating over each aspect imported from the 'loggingAspect' module
                Object.values(aspects).forEach((aspect) => {
                    // Applying the aspect to the method by using the 'applyAspect' function
                    logic[key] = applyAspect(aspect)(logic[key]);
                });
            }
        });

        // Returning the modified logic object with applied aspects
        return logic;
    };
};

// Exporting the 'withAspects' function as the default export
export default withAspects;
