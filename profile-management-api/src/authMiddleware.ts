/**
 * @file src/authMiddleware.ts
 * @version 0.1.1
 * @date 2024-05-31
 * @contact geoff@sportsevents.ai
 * @details Middleware to authenticate requests.
 * @reference https://a.usefulsite.example.com/a-useful-page
 */

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


// Middleware function to authenticate requests
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).send({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send({ error: "Invalid token" });
  }
};

export default authenticate;
