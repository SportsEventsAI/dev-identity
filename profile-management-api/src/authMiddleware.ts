/**
 * @file src/authMiddleware.ts
 * @version 0.1.1
 * @date 2024-05-31
 * @contact geoff@sportsevents.ai
 * @details Middleware to authenticate requests using Azure B2C.
 * @reference https://docs.microsoft.com/en-us/azure/active-directory-b2c/
 */

import { Request, Response, NextFunction } from "express";
import passport from "./azureB2CStrategy";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "oauth-bearer",
    { session: false },
    (err: Error, user: any, info: any) => {
      if (err) {
        return res.status(401).send({ error: "Unauthorized" });
      }
      if (!user) {
        return res.status(401).send({ error: "No user found" });
      }
      req.user = user;
      next();
    }
  )(req, res, next);
};

export default authenticate;
