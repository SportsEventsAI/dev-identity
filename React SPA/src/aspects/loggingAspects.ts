import { beforeMethod, afterMethod, onException, beforeInstance, afterInstance } from 'kaop-ts';
import { Logger } from 'tslog';

const log = new Logger({ name: 'AppLogger' });

// ref: https://github.com/k1r0s/kaop-ts/blob/master/docs/api.md#how-do-i-define-an-advice
export const onClassCreation = beforeInstance((meta) => {
    log.trace(`Creating instance of ${meta.target.constructor.name}`);
});
export const onClassClosure = afterInstance((meta) => {
    log.trace(`Closing instance of ${meta.target.constructor.name}`);
});
export const onMethodCall = beforeMethod((meta) => {
    log.trace(`Calling method ${meta.key} with args:`, meta.args);
});

export const onMethodResult = afterMethod((meta) => {
    log.trace(`Method ${meta.key} returned:`, meta.result);
});

export const onMethodError = onException((meta) => {
    log.error(`Error in method ${meta.key}:`, meta.exception);
});
/**
 * https://github.com/k1r0s/kaop-ts/blob/master/docs/api.md#how-do-i-define-an-advice
@beforeInstance(function(meta) {
  meta.args // Arguments to be received by decorated method
  meta.key // Name of the decorated method as string
  meta.scope // Instance or the context of the call stack
  meta.method // Original method
  meta.target // Class definition
  meta.result // The returned value by the method
  meta.prevented // The main method was not executed, prevent() was called
  meta.exception // current exception (if any). The exception should be handled
  // using `meta.handle()` to avoid error to be thrown.

  meta.commit() // triggers the next advice or method in the
  // call stack (mandatory if your advice contains async operations)
  // if arguments are provided then it will be pushed to meta.args as kaop/issues/12

  meta.skip() // prevent execution of following advices until method execution

  meta.handle() // returns the exception (if any) and prevents to be thrown.

  meta.prevent() // prevents the main method to be executed (GUESS WHY).
})
 */
