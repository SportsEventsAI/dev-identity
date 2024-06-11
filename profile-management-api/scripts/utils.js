import { spawn } from "child_process";

export class CommandLogger {
  constructor(command, args = [], options = { stdio: "inherit", shell: true }) {
    this.command = command;
    this.args = args;
    this.options = options;
  }

  run() {
    console.log(`Running command: ${this.command} ${this.args.join(" ")}`);
    const process = spawn(this.command, this.args, this.options);

    process.on("close", (code) => {
      if (code === 0) {
        console.log(`${this.command} completed successfully.`);
      } else {
        console.error(`Execution error with code: ${code}`);
      }
    });
  }
}

export const getCurrentDateFormatted = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const hour = now.getHours().toString().padStart(2, "0");
  const minute = now.getMinutes().toString().padStart(2, "0");
  return `${year}-${month}-${day}-${hour}-${minute}`;
};
