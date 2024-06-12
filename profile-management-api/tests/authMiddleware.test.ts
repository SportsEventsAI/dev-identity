import request from "supertest";
import express from "express";
import authenticate from "./../src/authMiddleware";
import jwt from "jsonwebtoken";

const app = express();
app.use(authenticate);

app.get("/test", (req, res) => {
  res.send("Authenticated");
});

describe("Authentication Middleware", () => {
  it("should return 401 if no token is provided", async () => {
    await request(app).get("/test").expect(401);
  });

  it("should return 401 if token is invalid", async () => {
    await request(app)
      .get("/test")
      .set("Authorization", "Bearer invalidtoken")
      .expect(401);
  });

  it("should pass with valid token", async () => {
    const validToken = jwt.sign(
      { user: "test" },
      process.env.JWT_SECRET as string
    );
    await request(app)
      .get("/test")
      .set("Authorization", `Bearer ${validToken}`)
      .expect(200);
  });
});
