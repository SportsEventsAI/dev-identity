import { CommandLogger } from "./CommandLogger";

const command = "tsc";
const args = ["--project", "tsconfig.json"];
const logger = new CommandLogger(command, args);
logger.run();
