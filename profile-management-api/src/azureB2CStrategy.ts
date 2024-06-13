/**
 * @file src/azureB2CStrategy.ts
 * @version 0.1.1
 * @date 2024-05-31
 * @contact geoff@sportsevents.ai
 * @details Configure Azure B2C strategy for authentication.
 * @reference https://docs.microsoft.com/en-us/azure/active-directory-b2c/
 */

import passport from "passport";
import { BearerStrategy, IBearerStrategyOption } from "passport-azure-ad";
import config from "./config.json";

const options: IBearerStrategyOption = {
  identityMetadata: `https://${config.credentials.tenantName}.b2clogin.com/${config.credentials.tenantName}.onmicrosoft.com/${config.policies.policyName}/${config.metadata.version}/${config.metadata.discovery}`,
  clientID: config.credentials.clientID as string,
  audience: config.credentials.clientID as string,
  validateIssuer: true,
  loggingLevel: "info",
  isB2C: true,
};

const bearerStrategy = new BearerStrategy(options, (token, done) => {
  try {
    done(null, token);
  } catch (err) {
    done(err, null);
  }
});

passport.use(bearerStrategy);

export default passport;
