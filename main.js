import { promisify } from "util";
import fs from "fs";

import config from "./config.js";
import Thor from "./Thor";

const readdir = promisify(fs.readdir);
const thor = new Thor(config);

(async () => {
  const cmdFiles = await readdir("./commands/");
  thor.logger.info(`Loading a total of ${cmdFiles.length} commands.`);

  cmdFiles.forEach(async file => {
    if (!file.endsWith(".js")) {
      return;
    }

    thor.loadCommand(file);
  });

  const evtFiles = await readdir("./events/");
  thor.logger.info(`Loading a total of ${evtFiles.length} events.`);

  evtFiles.forEach(async file => {
    let eventName = file.split(".")[0];
    thor.logger.info(`Loading Event: ${eventName}`);
    const event = require(`./events/${file}`).default;
    thor.on(eventName, event.bind(null, thor));
  });

  thor.login(thor.config.token);
})();

process.on("uncaughtException", err => {
  const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
  thor.logger.error(`Uncaught Exception: ${errorMsg}`);
  console.error(err);
  thor.destroy();

  process.exit(1);
});

process.on("unhandledRejection", err => {
  thor.logger.error(`Unhandled rejection: ${err}`);
  console.error(err);
});

process.on("SIGINT", () => {
  console.log("Captured SIGINT, exiting...");
  thor.destroy();

  process.exit();
});
