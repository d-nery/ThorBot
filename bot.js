import { Client } from "discord.js";
import { promisify } from "util";
import fs from "fs";
import Enmap from "enmap";
import Logger from "./helpers/Logger";

import config from "./config.json";

const readdir = promisify(fs.readdir);
const client = new Client();

client.config = config;
client.logger = new Logger();
client.commands = new Enmap();
client.aliases = new Enmap();
require("./helpers/client_functions").default(client);

(async () => {
  const cmdFiles = await readdir("./commands/");
  client.logger.log(`Loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach(file => {
    if (!file.endsWith(".js")) {
      return;
    }

    try {
      client.logger.log(`Loading command ${file}`);
      const props = require(`./commands/${file}`);

      if (props.init) {
        props.init(client);
      }

      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
    } catch (e) {
      client.logger.log(`Unable to load command ${props.help.name}: ${e}`);
    }
  });

  const evtFiles = await readdir("./events/");
  client.logger.log(`Loading a total of ${evtFiles.length} events.`);

  evtFiles.forEach(file => {
    let eventName = file.split(".")[0];
    client.logger.log(`Loading Event: ${eventName}`);
    const event = require(`./events/${file}`).default;
    client.on(eventName, event.bind(null, client));
  });

  client.login(client.config.token);
})();
