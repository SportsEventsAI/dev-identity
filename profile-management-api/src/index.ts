import express from "express";
import bodyParser from "body-parser";
import {
  getProfile,
  updateProfile,
  getAuthorizedUsers,
  addAuthorizedUser,
} from "./ProfileController";

import * as dotenv from "dotenv";
import authenticate from "./authMiddleware";
import passport from "passport";
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(passport.initialize());

app.get("/api/profile", authenticate, getProfile);
app.post("/api/profile", authenticate, updateProfile);
app.get("/api/authorized-users", authenticate, getAuthorizedUsers);
app.post("/api/authorized-users", authenticate, addAuthorizedUser);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
