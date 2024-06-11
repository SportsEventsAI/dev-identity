import { CommandLogger } from "./utils.js";

const command = "tsc";
const args = ["--project", "tsconfig.json"];
const logger = new CommandLogger(command, args);
logger.run();
