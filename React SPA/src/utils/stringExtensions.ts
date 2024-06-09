/**
 * @file src/utils/stringExtensions.ts
 * @version 0.1.1
 * @date 2024-06-06
 * @summary Extends the String prototype with the formatUnicorn method.
 * @contact Geoff DeFilippi, geoff@sportsevents.ai
 * @github SportsEventsAI/dev-identity
 * @details This method allows for string formatting similar to printf in other languages.
 * @reference https://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
 */

/**
 * Adds the formatUnicorn method to the String prototype if it doesn't already exist.
 * The method allows for string formatting with named placeholders.
 *
 * @example
 * // returns "Hello, John Doe!"
 * "Hello, {name}!".formatUnicorn({ name: "John Doe" });
 */
// Declare a global interface to extend the String prototype
declare global {
    interface String {
        formatUnicorn(...args: any[]): string;
    }
}

// Define the formatUnicorn method on the String prototype if it doesn't already exist
String.prototype.formatUnicorn =
    String.prototype.formatUnicorn ||
    function (this: string): string {
        'use strict';
        let str = this.toString();

        // Check if arguments are provided
        if (arguments.length) {
            const t = typeof arguments[0];
            const args = 'string' === t || 'number' === t ? Array.prototype.slice.call(arguments) : arguments[0];

            // Iterate over the arguments object
            for (const key in args) {
                if (args.hasOwnProperty(key)) {
                    // Replace placeholders in the string with corresponding values
                    str = str.replace(new RegExp('\\{' + key + '\\}', 'gi'), args[key]);
                }
            }
        }

        // Return the formatted string
        return str;
    };

// Export an empty object to make the file a module
export {};
