// src/hooks/useConfig.ts

import { useMemo } from 'react';
import config from '../config';
import { IConfigResult } from '../types/IConfig';

/**
 * useConfig hook to access configuration values.
 *
 * @hook
 * @filename src/hooks/useConfig.ts
 */
export const useConfig = (): IConfigResult => {
    // Return the configuration object, memoized so that we don't recalculate it on every render
    return useMemo(
        () => ({
            config,
        }),
        [],
    );
};
