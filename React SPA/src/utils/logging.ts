// src/utils/logging.ts
import { beforeMethod, afterMethod, Wove } from 'aspectjs';

class LoggingAspect {
    @beforeMethod({
        classNamePattern: /Service|Component/, // Adjust pattern to match your needs
        methodNamePattern: /.*/,
    })
    logMethodCall(meta: any) {
        console.log(`Calling ${meta.className}.${meta.methodName} with arguments:`, meta.args);
    }

    @afterMethod({
        classNamePattern: /Service|Component/, // Adjust pattern to match your needs
        methodNamePattern: /.*/,
    })
    logMethodResult(meta: any) {
        console.log(`Called ${meta.className}.${meta.methodName} and returned:`, meta.method.result);
    }
}

export default new LoggingAspect();
