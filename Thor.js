import { Client, Collection } from "discord.js";
import { promisify } from "util";
import fs from "fs";
import Keyv from "keyv";
import Logger from "./helpers/Logger";

import config from "./config.json";

const readdir = promisify(fs.readdir);

export default class Thor extends Client {
  async constructor(config) {
    this.config = config;
    this.logger = new Logger();
    this.commands = new Collection();
    this.aliases = new Collection();

    this.settings = new Keyv("sqlite://data/settings.sqlite");
  }

  loadCommands = async cmdName => {
    try {
      this.logger.log(`Loading Command: ${commandName}`);
      const props = require(`./commands/${commandName}`);

      if (props.init) {
        props.init(this);
      }

      this.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        this.aliases.set(alias, props.help.name);
      });
      return false;
    } catch (e) {
      return `Unable to load command ${commandName}: ${e}`;
    }
  };

  awaitReply = async (msg, question, limit = 60000) => {
    const filter = m => m.author.id === msg.author.id;
    await msg.channel.send(question);
    try {
      const collected = await msg.channel.awaitMessages(filter, {
        max: 1,
        time: limit,
        errors: ["time"]
      });
      return collected.first().content;
    } catch (e) {
      return false;
    }
  };
}
