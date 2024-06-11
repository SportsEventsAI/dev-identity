import { CommandLogger } from "./CommandLogger"; // Assuming CommandLogger is in a file named CommandLogger.js
import { getCurrentDateFormatted } from "../src/utils/date";

const generateZipCommandArgs = (path, filename) => {
  const currentDateFormatted = getCurrentDateFormatted();
  return [
    "node-zip-cli",
    "zip",
    "-o",
    `${path}/${currentDateFormatted}-${filename}.zip`,
    "-y",
  ];
};

const path = "zips";
const filename = "mock-profile.api";
const args = generateZipCommandArgs(path, filename);

new CommandLogger("npx", args).run();
