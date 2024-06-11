import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const profilesFile = path.join(__dirname, "data/profiles.json");
console.log("directory-name 👉️", __dirname);
console.log("profiles-file 👉️", profilesFile);

// Helper functions to read and write data
const readData = (filePath: string) => {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
};

const writeData = (filePath: string, data: any) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
};

export const getProfile = (req: Request, res: Response) => {
  const userId = req.query.userId as string; // Assuming user ID is passed as a query parameter
  const profiles = readData(profilesFile);
  const profile = profiles[userId];
  if (profile) {
    res.json(profile);
  } else {
    res.status(404).json({ message: "Profile not found" });
  }
};

export const updateProfile = (req: Request, res: Response) => {
  const userId = req.body.userId;
  const profiles = readData(profilesFile);
  profiles[userId] = req.body;
  writeData(profilesFile, profiles);
  res.status(200).send("Profile updated");
};

export const getAuthorizedUsers = (req: Request, res: Response) => {
  const userId = req.query.userId as string;
  const profiles = readData(profilesFile);
  const profile = profiles[userId];
  if (profile && profile.authorizedUsers) {
    res.json(profile.authorizedUsers);
  } else {
    res.status(404).json({ message: "Authorized users not found" });
  }
};

export const addAuthorizedUser = (req: Request, res: Response) => {
  const userId = req.body.userId;
  const profiles = readData(profilesFile);
  if (!profiles[userId]) {
    profiles[userId] = {};
  }
  profiles[userId].authorizedUsers = profiles[userId].authorizedUsers || [];
  profiles[userId].authorizedUsers.push(req.body.authorizedUser);
  writeData(profilesFile, profiles);
  res.status(200).send("Authorized user added");
};
