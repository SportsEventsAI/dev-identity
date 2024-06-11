import { getCurrentDateFormatted, CommandLogger } from "./utils.js";

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
