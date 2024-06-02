// src/hooks/useConfig.ts

import { useMemo } from 'react';
import config, { getPolicyUrl, getDomainUrl } from '../config';
import { IConfigResult, B2CDomainTypes } from '../types/IConfig';

/**
 * useConfig hook to access configuration values.
 *
 * @hook
 * @filename src/hooks/useConfig.ts
 */
export const useConfig = (): IConfigResult => {
    return useMemo(
        () => ({
            config,
            getPolicyUrl,
            getDomainUrl,
        }),
        [],
    );
};
