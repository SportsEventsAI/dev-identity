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

// Allow both kinds of imports
// Prefer using the default import as this is the only thing this file does
export const config = ConfigSingleton.instance;
export default config;
