import { CommandLogger } from "./utils.js"; // Assuming CommandLogger is in a file named CommandLogger.js

function runCommand(filename, args = []) {
  const nodeCommand = "node";
  const options = [
    "--import tsx",
    "--experimental-specifier-resolution=node",
    "--experimental-json-modules",
    "--experimental-modules",
    ...args,
    filename, // Include filename in the options array
  ];

  // Create a new instance of CommandLogger to run the command
  const logger = new CommandLogger(nodeCommand, options);
  logger.run();
}

// Execute the command and handle the process lifecycle using CommandLogger
runCommand("src/index.ts");
