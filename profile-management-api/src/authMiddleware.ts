import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send("Unauthorized");
  }
  const jwtSecret: string = process.env.JWT_SECRET || "testing_secret";
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).send("Unauthorized");
    }
    req.user = decoded; // TypeScript now recognizes `user` as a valid property of [`req`](command:_github.copilot.openSymbolFromReferences?%5B%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22c%3A%5C%5CUsers%5C%5CGeoffreyDeFilippi%5C%5Csource%5C%5Crepos%5C%5CSportsEventsAI%5C%5Cdev-identity%5C%5Cprofile-management-api%5C%5Csrc%5C%5CauthMiddleware.ts%22%2C%22_sep%22%3A1%2C%22external%22%3A%22file%3A%2F%2F%2Fc%253A%2FUsers%2FGeoffreyDeFilippi%2Fsource%2Frepos%2FSportsEventsAI%2Fdev-identity%2Fprofile-management-api%2Fsrc%2FauthMiddleware.ts%22%2C%22path%22%3A%22%2Fc%3A%2FUsers%2FGeoffreyDeFilippi%2Fsource%2Frepos%2FSportsEventsAI%2Fdev-identity%2Fprofile-management-api%2Fsrc%2FauthMiddleware.ts%22%2C%22scheme%22%3A%22file%22%7D%2C%7B%22line%22%3A4%2C%22character%22%3A2%7D%5D "src/authMiddleware.ts")
    next();
  });
};
