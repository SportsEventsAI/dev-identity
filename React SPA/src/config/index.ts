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

import { ConfigSingleton } from './ConfigSingleton';

export const config = ConfigSingleton.instance;
