// Importing the applyAspect function from the 'kaop-ts' library
import { applyAspect } from 'kaop-ts';

// Importing all aspects from the '../aspects/loggingAspect' module
import * as aspects from '../aspects/loggingAspects';

/**
 * Applies aspects to a hook logic object.
 *
 * @param hookLogic - The hook logic function.
 * @param hookName - The name of the hook.
 * @returns A new function that applies aspects to each method in the logic object.
 */
const withAspects = (hookLogic: () => any, hookName: string) => {
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
