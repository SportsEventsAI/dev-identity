import { CommandLogger } from "./CommandLogger";

const nodeCommand = "node";
const options = [
  "--loader tsx",
  "--experimental-specifier-resolution=node",
  "--experimental-json-modules",
  "--experimental-modules",
  ...args,
  filename, // Include filename in the options array
];

// Create a new instance of CommandLogger to run the command
const logger = new CommandLogger(nodeCommand, options);
logger.run();
