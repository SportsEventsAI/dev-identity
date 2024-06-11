import express from "express";
import bodyParser from "body-parser";
import {
  getProfile,
  updateProfile,
  getAuthorizedUsers,
  addAuthorizedUser,
} from "./ProfileController";

const app = express();
app.use(bodyParser.json());

app.get("/api/profile", getProfile);
app.post("/api/profile", updateProfile);
app.get("/api/authorized-users", getAuthorizedUsers);
app.post("/api/authorized-users", addAuthorizedUser);

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
