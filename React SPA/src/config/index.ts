/**
 * @file src/config/index.ts
 * @version 0.1.1
 * @date 2024-05-31
 * @brief Entry point for configuration-related exports.
 * @contact Geoff DeFilippi, geoff@sportsevents.ai
 * @github SportsEventsAI/dev-identity
 * @subdirectory react spa
 * @filename src/config/index.ts
 * @details This module exports the configuration singleton and utility functions.
 */

import ConfigSingleton from './ConfigSingleton';
import { getMsalConfig } from './getMsalConfig';
import { getPolicyUrl } from './getPolicyUrl';
import { getDomainUrl } from './getDomainUrl';

const config = ConfigSingleton.getInstance();

export { config, getMsalConfig, getPolicyUrl, getDomainUrl };
